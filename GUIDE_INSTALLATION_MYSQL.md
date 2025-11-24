# 🗄️ Guide d'Installation MySQL - e-Hianatra

## 📋 Prérequis

- Windows 10/11
- Node.js installé
- MySQL (via XAMPP ou standalone)

---

## 🚀 Installation Automatique (Recommandé)

### Méthode Simple :

**1. Double-cliquez sur :** `INSTALLER_MYSQL.bat`

Ce script va :
- ✅ Installer les dépendances backend
- ✅ Créer la base de données MySQL
- ✅ Insérer les données de test
- ✅ Démarrer le backend
- ✅ Installer les dépendances frontend

**2. Suivez les instructions à l'écran**

**3. Pour démarrer ensuite :** Double-cliquez sur `DEMARRER.bat`

---

## 🔧 Installation Manuelle

### Étape 1 : Installer MySQL

**Option A - XAMPP (Recommandé) :**

1. Téléchargez XAMPP : https://www.apachefriends.org/
2. Installez avec les options par défaut
3. Lancez XAMPP Control Panel
4. Cliquez sur "Start" pour MySQL (doit devenir vert)

**Option B - MySQL Standalone :**

1. Téléchargez : https://dev.mysql.com/downloads/installer/
2. Installez MySQL Server
3. Notez le mot de passe root que vous définissez

---

### Étape 2 : Configurer le Backend

**1. Ouvrez un terminal dans le dossier `backend` :**

```bash
cd backend
```

**2. Installez les dépendances :**

```bash
npm install
```

**3. Vérifiez le fichier `.env` :**

Le fichier `backend/.env` doit contenir :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=e_hianatra
DB_PORT=3306

JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi
PORT=8080
```

**⚠️ Important :**
- Si vous avez un mot de passe MySQL, ajoutez-le dans `DB_PASSWORD`
- Si vous utilisez un autre port MySQL, changez `DB_PORT`

**4. Créez la base de données :**

```bash
npm run init-db
```

**Résultat attendu :**
```
📦 Création de la base de données...
✅ Base de données créée
📋 Création des tables...
✅ Tables créées
📝 Insertion des données de test...
✅ Données de test insérées

🎉 Base de données initialisée avec succès!

📧 Comptes de test créés:
   Étudiant: student@demo.mg / password123
   Enseignant: teacher@demo.mg / password123
   Admin: admin@demo.mg / password123
```

**5. Lancez le backend :**

```bash
npm run dev
```

**Résultat attendu :**
```
✅ Connexion à la base de données MySQL réussie
🚀 Serveur e-Hianatra démarré sur le port 8080
📚 API disponible sur http://localhost:8080/api
🏥 Health check: http://localhost:8080/api/health
```

---

### Étape 3 : Vérifier que MySQL Fonctionne

**1. Testez l'API :**

Ouvrez dans votre navigateur : **http://localhost:8080/api/health**

**Vous devez voir :**
```json
{
  "status": "OK",
  "message": "e-Hianatra API is running",
  "timestamp": "2024-11-24T..."
}
```

**2. Testez les cours :**

Ouvrez : **http://localhost:8080/api/courses**

**Vous devez voir :**
```json
[
  {
    "id_cours": 1,
    "titre": "Introduction à la Programmation Python",
    "description": "Apprenez les bases de Python...",
    "categorie": "Programmation",
    ...
  },
  ...
]
```

---

### Étape 4 : Configurer le Frontend

**1. Retournez à la racine du projet :**

```bash
cd ..
```

**2. Installez les dépendances :**

```bash
npm install
```

**3. Vérifiez que le mode démo est désactivé :**

Le fichier `src/services/api.js` doit avoir :

```javascript
const DEMO_MODE = false  // Backend réel activé
```

**4. Lancez le frontend :**

```bash
npm run dev
```

**5. Ouvrez :** http://localhost:3000

---

### Étape 5 : Tester la Connexion

**1. Connectez-vous avec :**
- Email : `student@demo.mg`
- Mot de passe : `password123`

**2. Ouvrez la console du navigateur (F12)**

**3. Vous devez voir :**
```
✅ Données du backend: /auth/login
✅ Données du backend: /student/dashboard
✅ Données du backend: /courses
```

**4. Cliquez sur "Cours" dans le menu**

**5. Vous devez voir 3 cours :**
- Introduction à la Programmation Python
- Développement Web avec React
- Design UI/UX avec Figma

---

## ✅ Vérification Finale

### Checklist :

- [ ] MySQL est démarré (XAMPP ou service)
- [ ] Backend lancé sur port 8080
- [ ] API répond sur http://localhost:8080/api/health
- [ ] Frontend lancé sur port 3000
- [ ] Connexion réussie avec student@demo.mg
- [ ] 3 cours affichés (pas 6)
- [ ] Console affiche "✅ Données du backend"

---

## 🐛 Dépannage

### Erreur "ER_ACCESS_DENIED_ERROR"

**Problème :** Mot de passe MySQL incorrect

**Solution :**
1. Ouvrez `backend/.env`
2. Ajoutez votre mot de passe MySQL :
```env
DB_PASSWORD=votre_mot_de_passe
```

### Erreur "ECONNREFUSED"

**Problème :** MySQL n'est pas démarré

**Solution :**
1. Ouvrez XAMPP Control Panel
2. Cliquez sur "Start" pour MySQL
3. Relancez `npm run init-db`

### Erreur "Database already exists"

**Problème :** La base existe déjà

**Solution :**
C'est normal ! Le script détecte la base existante.
Lancez simplement `npm run dev`

### Port 8080 déjà utilisé

**Solution :**
1. Ouvrez `backend/.env`
2. Changez le port :
```env
PORT=8081
```
3. Modifiez aussi `src/services/api.js` :
```javascript
baseURL: 'http://localhost:8081/api'
```

### "Aucun cours trouvé"

**Causes possibles :**
1. Backend pas lancé → Lancez `npm run dev` dans `/backend`
2. Base de données vide → Lancez `npm run init-db`
3. Mode démo activé → Vérifiez `DEMO_MODE = false`

**Vérification :**
- Ouvrez la console (F12)
- Regardez les messages
- Vous devez voir "✅ Données du backend"

---

## 📊 Structure de la Base de Données

La base `e_hianatra` contient **10 tables** :

1. **utilisateur** - Comptes (étudiants, enseignants, admins)
2. **cours** - Cours disponibles
3. **chapitre** - Chapitres des cours
4. **contenu** - Contenus (vidéos, PDF, texte)
5. **quiz** - Quiz d'évaluation
6. **question** - Questions des quiz
7. **option_question** - Réponses possibles
8. **devoir** - Devoirs à rendre
9. **soumission** - Soumissions des étudiants
10. **messagerie** - Messages entre utilisateurs
11. **inscription** - Inscriptions aux cours

---

## 🎯 Données Initiales

Après `npm run init-db`, vous avez :

### Utilisateurs (3) :
- student@demo.mg (Étudiant)
- teacher@demo.mg (Enseignant)
- admin@demo.mg (Admin)

### Cours (3) :
1. Introduction à la Programmation Python
   - 3 chapitres
   - 1 quiz (2 questions)
   - 1 devoir

2. Développement Web avec React
   - Vide (à compléter)

3. Design UI/UX avec Figma
   - Vide (à compléter)

---

## 🚀 Prochaines Étapes

Une fois MySQL configuré :

1. **Créez plus de cours** via l'interface enseignant
2. **Ajoutez des chapitres** avec vidéos et documents
3. **Créez des quiz** pour évaluer les étudiants
4. **Assignez des devoirs**
5. **Testez la messagerie**

---

## 📞 Support

**Problème persistant ?**

1. Vérifiez les logs du backend (terminal)
2. Vérifiez la console du navigateur (F12)
3. Consultez `TEST_BACKEND_REEL.md`
4. Consultez `VERIFIER_CONNEXION.md`

---

**Développé pour e-Hianatra - Plateforme E-Learning Madagascar** 🇲🇬
