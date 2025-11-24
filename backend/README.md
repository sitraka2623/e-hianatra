# e-Hianatra Backend API

Backend Express.js pour la plateforme e-learning e-Hianatra.

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd backend
npm install
```

### 2. Configuration

Créez un fichier `.env` à partir de `.env.example` :

```bash
cp .env.example .env
```

Modifiez les variables dans `.env` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=e_hianatra
DB_PORT=3306

JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRES_IN=7d

PORT=8080
NODE_ENV=development

FRONTEND_URL=http://localhost:3000
```

### 3. Initialiser la base de données

```bash
npm run init-db
```

Cette commande va :
- Créer la base de données `e_hianatra`
- Créer toutes les tables
- Insérer des données de test

### 4. Lancer le serveur

**Mode développement (avec auto-reload) :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

Le serveur sera accessible sur `http://localhost:8080`

## 📚 API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Cours

- `GET /api/courses` - Liste des cours
- `GET /api/courses/:id` - Détails d'un cours
- `POST /api/courses` - Créer un cours (enseignant)
- `POST /api/courses/:id/enroll` - S'inscrire à un cours
- `GET /api/courses/:id/chapters` - Chapitres d'un cours
- `GET /api/courses/:id/quizzes` - Quiz d'un cours
- `GET /api/courses/:id/assignments` - Devoirs d'un cours

### Chapitres

- `GET /api/chapters/:id` - Détails d'un chapitre
- `GET /api/chapters/:id/contents` - Contenus d'un chapitre

### Quiz

- `GET /api/quiz/:id` - Détails d'un quiz
- `GET /api/quiz/:id/questions` - Questions d'un quiz
- `POST /api/quiz/:id/submit` - Soumettre un quiz

### Devoirs

- `GET /api/assignments/:id` - Détails d'un devoir
- `GET /api/assignments/:id/submission` - Soumission d'un étudiant
- `POST /api/assignments/:id/submit` - Soumettre un devoir

### Messages

- `GET /api/messages/conversations` - Liste des conversations
- `GET /api/messages/:userId` - Messages avec un utilisateur
- `POST /api/messages` - Envoyer un message

### Utilisateur

- `GET /api/profile` - Profil de l'utilisateur
- `PUT /api/profile` - Mettre à jour le profil

### Dashboards

- `GET /api/student/dashboard` - Dashboard étudiant
- `GET /api/teacher/dashboard` - Dashboard enseignant
- `GET /api/admin/dashboard` - Dashboard admin

## 🔐 Authentification

L'API utilise JWT (JSON Web Tokens). Incluez le token dans le header :

```
Authorization: Bearer <votre_token>
```

## 👥 Comptes de Test

Après l'initialisation de la base de données :

- **Étudiant:** student@demo.mg / password123
- **Enseignant:** teacher@demo.mg / password123
- **Admin:** admin@demo.mg / password123

## 🗄️ Structure de la Base de Données

- `utilisateur` - Utilisateurs (étudiants, enseignants, admins)
- `cours` - Cours
- `chapitre` - Chapitres des cours
- `contenu` - Contenus (vidéos, PDF, texte)
- `quiz` - Quiz
- `question` - Questions des quiz
- `option_question` - Options de réponse
- `devoir` - Devoirs
- `soumission` - Soumissions des devoirs
- `messagerie` - Messages entre utilisateurs
- `inscription` - Inscriptions aux cours

## 🛠️ Technologies

- **Express.js** - Framework web
- **MySQL** - Base de données
- **JWT** - Authentification
- **bcryptjs** - Hashage des mots de passe
- **express-validator** - Validation des données

## 📝 Notes

- Le serveur utilise CORS pour accepter les requêtes depuis le frontend
- Les mots de passe sont hashés avec bcrypt
- Les tokens JWT expirent après 7 jours par défaut

## 🔧 Dépannage

### Erreur de connexion MySQL

Vérifiez que :
- MySQL est démarré
- Les identifiants dans `.env` sont corrects
- Le port MySQL est bien 3306

### Port déjà utilisé

Changez le port dans `.env` :
```env
PORT=8081
```

---

**Développé pour e-Hianatra - Plateforme E-Learning Madagascar** 🇲🇬
