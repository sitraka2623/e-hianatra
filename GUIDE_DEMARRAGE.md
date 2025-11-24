# 🚀 Guide de Démarrage Complet - e-Hianatra

## ✅ Compatibilité Frontend ↔ Backend

Le frontend React et le backend Express sont **100% compatibles** et prêts à fonctionner ensemble !

## 📋 Prérequis

- Node.js (v16+)
- MySQL (ou XAMPP/WAMP)
- npm ou yarn

## 🗄️ Étape 1 : Configurer la Base de Données

### Option A : Avec le script automatique (Recommandé)

```bash
cd backend
npm install
npm run init-db
```

### Option B : Avec phpMyAdmin (XAMPP)

1. Démarrez XAMPP et lancez MySQL
2. Ouvrez http://localhost/phpmyadmin
3. Créez une base de données nommée `e_hianatra`
4. Importez le fichier `backend/database.sql`

### Option C : Ligne de commande MySQL

```bash
mysql -u root -p < backend/database.sql
```

## 🔧 Étape 2 : Configurer le Backend

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Vérifier le fichier .env

Le fichier `backend/.env` est déjà configuré :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=e_hianatra
DB_PORT=3306

JWT_SECRET=votre_secret_jwt_tres_securise_changez_moi
PORT=8080
```

**⚠️ Important :** Si vous avez un mot de passe MySQL, ajoutez-le dans `DB_PASSWORD`

### 3. Lancer le serveur backend

```bash
npm run dev
```

Vous devriez voir :
```
✅ Connexion à la base de données MySQL réussie
🚀 Serveur e-Hianatra démarré sur le port 8080
```

**Testez l'API :** http://localhost:8080/api/health

## 🎨 Étape 3 : Configurer le Frontend

### 1. Installer les dépendances

```bash
# Depuis la racine du projet
npm install
```

### 2. Le frontend est déjà configuré !

Le fichier `src/services/api.js` est maintenant configuré pour utiliser le backend réel :

```javascript
const DEMO_MODE = false  // ✅ Backend réel activé
```

### 3. Lancer le frontend

```bash
npm run dev
```

Le frontend sera sur : **http://localhost:3000**

## 🎉 Étape 4 : Tester l'Application

### Comptes de Test

Après l'initialisation de la base de données, utilisez :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| **Étudiant** | student@demo.mg | password123 |
| **Enseignant** | teacher@demo.mg | password123 |
| **Admin** | admin@demo.mg | password123 |

### Parcours de Test

1. **Page d'accueil** : http://localhost:3000
2. **Connexion** : Utilisez un des comptes ci-dessus
3. **Dashboard** : Vous serez redirigé selon votre rôle
4. **Cours** : Cliquez sur "Cours" dans le menu
5. **Détails** : Cliquez sur un cours pour voir les chapitres, quiz, devoirs

## 📊 Structure des Données

### Cours Disponibles (après init-db)

1. **Introduction à la Programmation Python**
   - 3 chapitres
   - 1 quiz avec 2 questions
   - 1 devoir

2. **Développement Web avec React**
   - Cours vide (à compléter)

3. **Design UI/UX avec Figma**
   - Cours vide (à compléter)

## 🔗 Routes API Disponibles

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Cours
- `GET /api/courses` - Liste des cours
- `GET /api/courses/:id` - Détails d'un cours
- `POST /api/courses/:id/enroll` - S'inscrire à un cours
- `GET /api/courses/:id/chapters` - Chapitres
- `GET /api/courses/:id/quizzes` - Quiz
- `GET /api/courses/:id/assignments` - Devoirs

### Chapitres
- `GET /api/chapters/:id` - Détails d'un chapitre
- `GET /api/chapters/:id/contents` - Contenus

### Quiz
- `GET /api/quiz/:id` - Détails d'un quiz
- `GET /api/quiz/:id/questions` - Questions
- `POST /api/quiz/:id/submit` - Soumettre

### Devoirs
- `GET /api/assignments/:id` - Détails
- `POST /api/assignments/:id/submit` - Soumettre

### Messages
- `GET /api/messages/conversations` - Conversations
- `GET /api/messages/:userId` - Messages
- `POST /api/messages` - Envoyer

### Profil
- `GET /api/profile` - Profil utilisateur
- `PUT /api/profile` - Mettre à jour

### Dashboards
- `GET /api/student/dashboard` - Dashboard étudiant
- `GET /api/teacher/dashboard` - Dashboard enseignant
- `GET /api/admin/dashboard` - Dashboard admin

## 🐛 Dépannage

### Erreur de connexion MySQL

**Problème :** `ER_ACCESS_DENIED_ERROR`

**Solution :**
1. Vérifiez le mot de passe MySQL dans `backend/.env`
2. Testez la connexion : `mysql -u root -p`

### Port déjà utilisé

**Backend (8080) :**
```env
# Dans backend/.env
PORT=8081
```

**Frontend (3000) :**
```javascript
// Dans vite.config.js
server: { port: 3001 }
```

### CORS Error

Le backend est déjà configuré pour accepter les requêtes depuis `http://localhost:3000`

Si vous changez le port du frontend, modifiez dans `backend/.env` :
```env
FRONTEND_URL=http://localhost:3001
```

### Les données ne s'affichent pas

1. Vérifiez que le backend est lancé : http://localhost:8080/api/health
2. Vérifiez que `DEMO_MODE = false` dans `src/services/api.js`
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

## 🎯 Fonctionnalités Testées

✅ Authentification JWT
✅ Inscription/Connexion
✅ Dashboards par rôle
✅ Liste des cours
✅ Détails des cours
✅ Chapitres avec contenus
✅ Quiz interactifs
✅ Soumission de devoirs
✅ Messagerie
✅ Profil utilisateur
✅ Multilingue (FR, MG, EN)
✅ Design responsive

## 📝 Prochaines Étapes

1. **Ajouter plus de cours** via l'interface enseignant
2. **Créer des chapitres** avec vidéos et documents
3. **Créer des quiz** avec questions
4. **Assigner des devoirs** aux étudiants
5. **Personnaliser** les couleurs et le logo

## 🌐 Déploiement (Production)

### Backend
- Hébergement : Heroku, DigitalOcean, AWS
- Base de données : MySQL distant

### Frontend
- Hébergement : Vercel, Netlify, GitHub Pages
- Modifier `baseURL` dans `src/services/api.js`

---

**Développé pour e-Hianatra - Plateforme E-Learning Madagascar** 🇲🇬

**Besoin d'aide ?** Consultez les fichiers README dans `/backend` et à la racine.
