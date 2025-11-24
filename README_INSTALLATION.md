# Guide d'Installation - e-Hianatra Frontend

## 🚀 Installation Rapide

### Étape 1: Résoudre le problème PowerShell

Ouvrez PowerShell **en tant qu'administrateur** et exécutez :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Tapez `O` (Oui) pour confirmer.

### Étape 2: Installer les dépendances

Dans votre terminal (PowerShell ou CMD), naviguez vers le dossier du projet :

```bash
cd D:\e-hianatra
npm install
```

### Étape 3: Lancer l'application

```bash
npm run dev
```

L'application sera accessible sur **http://localhost:3000**

## ✨ Fonctionnalités

### 🌍 Multilingue
- **Français** 🇫🇷
- **Malagasy** 🇲🇬  
- **English** 🇬🇧

Changez de langue via le sélecteur en haut à droite (icône globe 🌐)

### 🎨 Design Moderne
- Interface moderne avec dégradés et animations
- Effets de survol et transitions fluides
- Design responsive (mobile, tablette, desktop)
- Thème cohérent avec Tailwind CSS
- Typographie Inter pour une meilleure lisibilité

### 📱 Pages Disponibles
- **Accueil** : Page d'atterrissage avec présentation
- **Connexion / Inscription** : Authentification sécurisée
- **Dashboards** : 3 types (Étudiant, Enseignant, Admin)
- **Cours** : Catalogue, détails, chapitres
- **Quiz** : Évaluations interactives
- **Devoirs** : Soumission de fichiers
- **Messagerie** : Communication en temps réel
- **Profil** : Gestion du compte utilisateur

## 🔧 Configuration

### Modifier l'URL de l'API Backend

Éditez `src/services/api.js` :

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Changez cette URL
  ...
})
```

### Personnaliser les couleurs

Éditez `tailwind.config.js` pour modifier le thème :

```javascript
colors: {
  primary: {
    DEFAULT: '#2563eb', // Bleu principal
    ...
  },
  secondary: {
    DEFAULT: '#7c3aed', // Violet secondaire
    ...
  }
}
```

## 📦 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Navbar.jsx      # Barre de navigation
│   ├── CourseCard.jsx  # Carte de cours
│   ├── LanguageSwitcher.jsx  # Sélecteur de langue
│   └── PrivateRoute.jsx
├── context/            # Gestion d'état global
│   ├── AuthContext.jsx      # Authentification
│   └── LanguageContext.jsx  # Multilingue
├── i18n/              # Traductions
│   └── translations.js
├── pages/             # Pages de l'application
├── services/          # Services API
└── App.jsx           # Composant racine
```

## 🌐 Ajouter une Nouvelle Langue

1. Ouvrez `src/i18n/translations.js`
2. Ajoutez votre langue :

```javascript
export const translations = {
  fr: { ... },
  mg: { ... },
  en: { ... },
  es: {  // Nouvelle langue (Espagnol)
    nav: {
      courses: 'Cursos',
      messages: 'Mensajes',
      ...
    },
    ...
  }
}
```

3. Ajoutez le drapeau dans `src/components/LanguageSwitcher.jsx` :

```javascript
const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'mg', name: 'Malagasy', flag: '🇲🇬' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }  // Nouveau
]
```

## 🐛 Dépannage

### Erreur "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 déjà utilisé
Modifiez le port dans `vite.config.js` :
```javascript
server: {
  port: 3001  // Changez le port
}
```

### Problème de CORS avec l'API
Assurez-vous que votre backend Spring Boot autorise les requêtes depuis `http://localhost:3000`

## 📞 Support

Pour toute question ou problème, consultez la documentation ou créez une issue sur le repository.

---

**Bon développement ! 🚀**
