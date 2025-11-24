# ⚡ Démarrage Rapide - Données MySQL

## 🎯 Objectif

Faire en sorte que **toutes les données viennent de MySQL** (pas de mode démo).

---

## 🚀 Solution en 3 Étapes

### Étape 1 : Installer MySQL (Si pas encore fait)

**Option Simple - XAMPP :**
1. Téléchargez : https://www.apachefriends.org/
2. Installez
3. Lancez XAMPP Control Panel
4. Cliquez "Start" pour MySQL

---

### Étape 2 : Initialiser la Base de Données

**Ouvrez un terminal dans le dossier du projet :**

```bash
cd backend
npm install
npm run init-db
```

**Résultat attendu :**
```
✅ Base de données créée
✅ Tables créées
✅ Données de test insérées

Comptes créés:
- student@demo.mg / password123
- teacher@demo.mg / password123
- admin@demo.mg / password123
```

---

### Étape 3 : Lancer Backend + Frontend

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```

**Vous devez voir :**
```
✅ Connexion à la base de données MySQL réussie
🚀 Serveur démarré sur le port 8080
```

**Terminal 2 - Frontend :**
```bash
npm run dev
```

**Ouvrez :** http://localhost:3000

---

## ✅ Vérification

### 1. Testez l'API Backend

**Ouvrez :** http://localhost:8080/api/health

**Vous devez voir :**
```json
{
  "status": "OK",
  "message": "e-Hianatra API is running"
}
```

### 2. Connectez-vous

- Email : `student@demo.mg`
- Mot de passe : `password123`

### 3. Vérifiez la Console (F12)

**Vous devez voir :**
```
✅ Données du backend: /auth/login
✅ Données du backend: /student/dashboard
✅ Données du backend: /courses
```

### 4. Vérifiez les Cours

**Cliquez sur "Cours"**

**Vous devez voir 3 cours (pas 6) :**
- Introduction à la Programmation Python
- Développement Web avec React
- Design UI/UX avec Figma

**✅ Si vous voyez 3 cours → Données MySQL**
**❌ Si vous voyez 6 cours → Mode démo (backend pas lancé)**

---

## 🔧 Configuration Actuelle

Le frontend est déjà configuré pour utiliser MySQL :

**Fichier :** `src/services/api.js`
```javascript
const DEMO_MODE = false  // ✅ Backend réel activé
```

**Fichier :** `backend/.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=e_hianatra
```

---

## 🐛 Problèmes Courants

### "Aucun cours trouvé"

**Cause :** Backend pas lancé

**Solution :**
```bash
cd backend
npm run dev
```

### Erreur MySQL

**Cause :** MySQL pas démarré

**Solution :**
1. Ouvrez XAMPP
2. Démarrez MySQL
3. Relancez `npm run init-db`

### Mot de passe MySQL

**Si vous avez un mot de passe MySQL :**

Modifiez `backend/.env` :
```env
DB_PASSWORD=votre_mot_de_passe
```

---

## 📊 Données Disponibles

Après `npm run init-db` :

### Comptes (3) :
- student@demo.mg / password123
- teacher@demo.mg / password123
- admin@demo.mg / password123

### Cours (3) :
1. **Python** - 3 chapitres, 1 quiz, 1 devoir
2. **React** - Vide
3. **Figma** - Vide

### Tables MySQL (10) :
- utilisateur
- cours
- chapitre
- contenu
- quiz
- question
- option_question
- devoir
- soumission
- messagerie
- inscription

---

## 🎯 C'est Tout !

Une fois ces 3 étapes faites, **toutes les données viennent de MySQL**.

**Pour vérifier :**
- Ouvrez la console (F12)
- Vous devez voir : `✅ Données du backend`
- Pas de : `🎮 Mode démo`

---

## 🚀 Scripts Automatiques

**Pour installer automatiquement :**
```bash
INSTALLER_MYSQL.bat
```

**Pour démarrer ensuite :**
```bash
DEMARRER.bat
```

---

**Besoin d'aide ?** Consultez `GUIDE_INSTALLATION_MYSQL.md`
