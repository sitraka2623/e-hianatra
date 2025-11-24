# 🧪 Tester si les Données sont Réelles

## 🔍 Méthode 1 : Console du Navigateur

### Étapes :

1. **Ouvrez votre application** : http://localhost:3000

2. **Ouvrez la console (F12)**

3. **Connectez-vous** avec `student@demo.mg` / `password123`

4. **Regardez les messages dans la console :**

**✅ Si BACKEND RÉEL :**
```
✅ Données du backend: /student/dashboard
✅ Données du backend: /courses
```

**❌ Si MODE DÉMO (fallback) :**
```
❌ Erreur backend: Network Error
💡 Vérifiez que le backend est lancé sur http://localhost:8080
🎮 Mode démo - Données mock pour: /student/dashboard
```

---

## 🔍 Méthode 2 : Onglet Network

### Étapes :

1. **Ouvrez la console (F12)**

2. **Allez dans l'onglet "Network" (Réseau)**

3. **Rechargez la page**

4. **Regardez les requêtes vers `localhost:8080` :**

**✅ Si BACKEND RÉEL :**
- Requêtes avec status **200** (vert)
- Réponse contient les données de MySQL

**❌ Si BACKEND PAS LANCÉ :**
- Requêtes avec status **Failed** (rouge)
- Erreur : `ERR_CONNECTION_REFUSED`

---

## 🔍 Méthode 3 : Modifier les Données

### Test Définitif :

**1. Connectez-vous en tant qu'enseignant :**
- Email : `teacher@demo.mg`
- Mot de passe : `password123`

**2. Créez un nouveau cours** (si l'interface le permet)

**3. Déconnectez-vous et reconnectez-vous**

**✅ Si BACKEND RÉEL :**
- Le nouveau cours apparaît toujours
- Les données sont persistantes dans MySQL

**❌ Si MODE DÉMO :**
- Le nouveau cours disparaît après rechargement
- Les données sont en mémoire uniquement

---

## 🔍 Méthode 4 : Vérifier la Base de Données

### Avec phpMyAdmin (XAMPP) :

1. **Ouvrez** : http://localhost/phpmyadmin

2. **Sélectionnez la base** : `e_hianatra`

3. **Cliquez sur la table** : `cours`

4. **Regardez les données :**

**✅ Si BACKEND RÉEL :**
- Vous voyez 3 cours (Python, React, Figma)
- Les cours affichés dans l'app correspondent à ceux de la base

**❌ Si MODE DÉMO :**
- La base peut être vide ou différente
- L'app affiche 6 cours (données mock)

---

## 🔍 Méthode 5 : Comparer les Données

### Données BACKEND RÉEL (MySQL) :

Après `npm run init-db`, vous avez **3 cours** :
1. Introduction à la Programmation Python
2. Développement Web avec React
3. Design UI/UX avec Figma

### Données MODE DÉMO (Mock) :

Le mode démo affiche **6 cours** :
1. Introduction à la Programmation Python
2. Développement Web avec React
3. Design UI/UX avec Figma
4. Marketing Digital
5. Base de Données MySQL
6. Intelligence Artificielle

**✅ Si vous voyez 3 cours → BACKEND RÉEL**

**❌ Si vous voyez 6 cours → MODE DÉMO**

---

## 🎯 Configuration Actuelle

**Fichier :** `src/services/api.js`

```javascript
const DEMO_MODE = false  // Backend réel activé
```

**Comportement :**
- Essaie de se connecter au backend sur `http://localhost:8080`
- Si le backend ne répond pas → Affiche une erreur dans la console
- Les logs vous indiquent clairement la source des données

---

## ✅ Pour Garantir le Backend Réel

### 1. Vérifiez que le backend est lancé :

```bash
cd backend
npm run dev
```

**Vous devez voir :**
```
✅ Connexion à la base de données MySQL réussie
🚀 Serveur e-Hianatra démarré sur le port 8080
```

### 2. Testez l'API directement :

**Ouvrez :** http://localhost:8080/api/health

**Vous devez voir :**
```json
{
  "status": "OK",
  "message": "e-Hianatra API is running"
}
```

### 3. Testez les cours :

**Ouvrez :** http://localhost:8080/api/courses

**Vous devez voir :**
```json
[
  {
    "id_cours": 1,
    "titre": "Introduction à la Programmation Python",
    ...
  },
  ...
]
```

### 4. Vérifiez les logs dans la console :

**Vous devez voir :**
```
✅ Données du backend: /courses
✅ Données du backend: /student/dashboard
```

---

## 🔄 Basculer entre les Modes

### Activer le Backend Réel :

Dans `src/services/api.js` :
```javascript
const DEMO_MODE = false
```

**Avantages :**
- Données persistantes
- Authentification réelle
- Modifications sauvegardées

**Prérequis :**
- MySQL installé et démarré
- Backend lancé (`npm run dev`)
- Base de données initialisée (`npm run init-db`)

### Activer le Mode Démo :

Dans `src/services/api.js` :
```javascript
const DEMO_MODE = true
```

**Avantages :**
- Pas besoin de MySQL
- Pas besoin de backend
- Données de test prêtes

**Inconvénients :**
- Données non persistantes
- Modifications perdues au rechargement

---

## 📊 Résumé

| Indicateur | Backend Réel | Mode Démo |
|------------|--------------|-----------|
| Nombre de cours | 3 | 6 |
| Console logs | ✅ Données du backend | 🎮 Mode démo |
| Network status | 200 OK | Failed |
| Persistance | ✅ Oui | ❌ Non |
| MySQL requis | ✅ Oui | ❌ Non |

---

**Actuellement configuré pour : BACKEND RÉEL** 🔌

Vérifiez les logs de la console pour confirmer !
