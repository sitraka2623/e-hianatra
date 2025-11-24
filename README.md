# e-Hianatra - Plateforme E-Learning

Plateforme d'apprentissage en ligne pour Madagascar développée avec React.js et Tailwind CSS.

## 🚀 Technologies

- **Frontend**: React.js 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios
- **Authentication**: JWT
- **Build Tool**: Vite

## 📋 Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

## 🛠️ Installation

1. Cloner le repository
```bash
git clone <repository-url>
cd e-hianatra-frontend
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer l'API
Modifier l'URL de l'API dans `src/services/api.js` si nécessaire (par défaut: http://localhost:8080/api)

4. Lancer le serveur de développement
```bash
npm run dev
```

L'application sera accessible sur http://localhost:3000

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Navbar.jsx
│   ├── CourseCard.jsx
│   └── PrivateRoute.jsx
├── context/            # Context API (Auth)
│   └── AuthContext.jsx
├── pages/              # Pages de l'application
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CourseList.jsx
│   ├── CourseDetail.jsx
│   ├── ChapterView.jsx
│   ├── QuizView.jsx
│   ├── AssignmentView.jsx
│   ├── Messages.jsx
│   ├── Profile.jsx
│   ├── student/
│   │   └── Dashboard.jsx
│   ├── teacher/
│   │   └── Dashboard.jsx
│   └── admin/
│       └── Dashboard.jsx
├── services/           # Services API
│   └── api.js
├── App.jsx            # Composant principal
├── main.jsx           # Point d'entrée
└── index.css          # Styles globaux
```

## 🎯 Fonctionnalités

### Pour les Étudiants
- ✅ Inscription et connexion
- ✅ Consultation des cours
- ✅ Lecture de vidéos et documents
- ✅ Passage de quiz
- ✅ Soumission de devoirs
- ✅ Messagerie avec enseignants
- ✅ Suivi de progression

### Pour les Enseignants
- ✅ Création et gestion de cours
- ✅ Upload de contenus (vidéos, PDF)
- ✅ Création de quiz
- ✅ Correction de devoirs
- ✅ Communication avec étudiants

### Pour les Administrateurs
- ✅ Gestion des utilisateurs
- ✅ Gestion des cours
- ✅ Statistiques globales
- ✅ Modération des contenus

## 🔐 Authentification

L'application utilise JWT pour l'authentification. Le token est stocké dans le localStorage et automatiquement ajouté aux requêtes API.

## 🎨 Personnalisation

Les couleurs principales peuvent être modifiées dans `tailwind.config.js`:

```javascript
colors: {
  primary: '#2563eb',    // Bleu
  secondary: '#7c3aed',  // Violet
}
```

## 📦 Build pour production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

## 🔗 API Backend

Cette application nécessite un backend Spring Boot. Assurez-vous que l'API est accessible à l'URL configurée dans `src/services/api.js`.

## 📝 License

MIT

## 👥 Auteurs

Développé pour e-Hianatra - Plateforme E-Learning Madagascar
