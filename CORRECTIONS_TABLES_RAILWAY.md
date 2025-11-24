# Corrections des Tables Railway

## Problème résolu
Le backend utilisait des noms de tables au singulier alors que Railway a créé les tables au pluriel.

## Tables corrigées

### 1. Table `inscriptions`
**Avant:** `inscription` (singulier)
**Après:** `inscriptions` (pluriel)

**Colonnes corrigées:**
- `id_etudiant` → `id_user` (pour correspondre à la structure Railway)

**Fichiers modifiés:**
- `backend/routes/courses.js` - Toutes les requêtes d'inscription
- `backend/routes/dashboard.js` - Déjà correct

### 2. Tables Quiz
**Avant:** `question`, `option_question`, `reponse_quiz`, `question_quiz`
**Après:** `questions_quiz`, `reponses_quiz`

**Fichiers modifiés:**
- `backend/routes/quiz.js` - Requêtes de questions et réponses
- `backend/routes/courses.js` - Suppression en cascade

### 3. Structure des questions
Les options sont maintenant stockées en JSON dans la colonne `options` de `questions_quiz` au lieu d'une table séparée.

## Changements appliqués

### backend/routes/courses.js
```javascript
// ✅ Correction 1: Table inscriptions avec id_user
LEFT JOIN inscriptions i ON c.id_cours = i.id_cours
COUNT(DISTINCT i.id_user) as studentCount

// ✅ Correction 2: Vérification inscription
SELECT * FROM inscriptions WHERE id_cours = ? AND id_user = ?

// ✅ Correction 3: Insertion inscription
INSERT INTO inscriptions (id_cours, id_user, date_inscription) VALUES (?, ?, NOW())

// ✅ Correction 4: Suppression en cascade
DELETE FROM inscriptions WHERE id_cours = ?
DELETE FROM reponses_quiz WHERE id_quiz IN (...)
DELETE FROM questions_quiz WHERE id_quiz IN (...)
```

### backend/routes/quiz.js
```javascript
// ✅ Correction 1: Table questions_quiz
SELECT * FROM questions_quiz WHERE id_quiz = ?

// ✅ Correction 2: Soumission avec reponses_quiz
INSERT INTO reponses_quiz (id_question, id_user, reponse, est_correcte) VALUES (?, ?, ?, ?)
```

## Statut
✅ Toutes les corrections ont été appliquées
✅ Le backend est maintenant compatible avec la structure Railway
✅ Les tables utilisent les noms pluriels cohérents

## Prochaines étapes
1. Redéployer le backend sur Render
2. Tester les fonctionnalités:
   - Création de cours
   - Inscription aux cours
   - Création de quiz
   - Soumission de quiz

## Notes importantes
- La table `inscriptions` utilise `id_user` (pas `id_etudiant`)
- Les options de quiz sont en JSON (pas de table séparée)
- Toutes les tables utilisent le charset `utf8mb4_unicode_ci`
