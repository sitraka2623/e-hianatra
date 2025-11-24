# 🚀 Déploiement sur Vercel - e-Hianatra

## Méthode 1: Déploiement via l'interface Vercel (Recommandé)

### Étape 1: Préparer votre projet
```bash
# Assurez-vous que tout est commité dans Git
git add .
git commit -m "Prêt pour le déploiement Vercel"
git push
```

### Étape 2: Créer un compte Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up"
3. Connectez-vous avec GitHub, GitLab ou Bitbucket

### Étape 3: Importer votre projet
1. Cliquez sur "Add New..." → "Project"
2. Importez votre repository Git
3. Vercel détectera automatiquement que c'est un projet Vite

### Étape 4: Configuration du projet
Vercel devrait détecter automatiquement:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Étape 5: Variables d'environnement
Ajoutez ces variables dans les paramètres Vercel:
```
VITE_API_URL=https://votre-backend-url.com/api
```

### Étape 6: Déployer
1. Cliquez sur "Deploy"
2. Attendez quelques minutes
3. Votre site sera disponible sur une URL comme: `https://e-hianatra.vercel.app`

---

## Méthode 2: Déploiement via CLI Vercel

### Installation de Vercel CLI
```bash
npm install -g vercel
```

### Connexion à Vercel
```bash
vercel login
```

### Déploiement
```bash
# Premier déploiement (mode test)
vercel

# Déploiement en production
vercel --prod
```

---

## ⚙️ Configuration Backend

**IMPORTANT**: Le backend Node.js/Express ne peut pas être déployé directement sur Vercel avec le frontend.

### Options pour le backend:

#### Option 1: Déployer le backend séparément sur Vercel
1. Créez un nouveau projet Vercel pour le dossier `backend`
2. Ajoutez un fichier `vercel.json` dans le dossier backend:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

#### Option 2: Utiliser un autre service pour le backend
- **Render.com** (Gratuit, recommandé)
- **Railway.app** (Gratuit avec limites)
- **Heroku** (Payant)
- **DigitalOcean App Platform**

#### Option 3: Backend sur Render.com (Recommandé)
1. Allez sur https://render.com
2. Créez un "Web Service"
3. Connectez votre repository
4. Configurez:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Ajoutez les variables d'environnement depuis `.env`

---

## 🗄️ Configuration Base de Données

### Option 1: MySQL sur PlanetScale (Gratuit)
1. Créez un compte sur https://planetscale.com
2. Créez une nouvelle base de données
3. Copiez la chaîne de connexion
4. Ajoutez-la dans les variables d'environnement Vercel/Render

### Option 2: MySQL sur Railway.app
1. Créez un compte sur https://railway.app
2. Créez un nouveau projet MySQL
3. Copiez les informations de connexion
4. Configurez dans vos variables d'environnement

### Option 3: PostgreSQL sur Supabase (Alternative)
1. Créez un compte sur https://supabase.com
2. Créez un nouveau projet
3. Utilisez PostgreSQL au lieu de MySQL (nécessite adaptation du code)

---

## 📝 Checklist avant déploiement

### Frontend (Vercel)
- [ ] Fichier `vercel.json` créé
- [ ] Variables d'environnement configurées
- [ ] URL du backend mise à jour dans `VITE_API_URL`
- [ ] Build local réussi (`npm run build`)
- [ ] Code commité et pushé sur Git

### Backend (Render/autre)
- [ ] Variables d'environnement configurées
- [ ] Base de données MySQL accessible en ligne
- [ ] CORS configuré pour accepter le domaine Vercel
- [ ] Script d'initialisation de la base de données exécuté

### Base de données
- [ ] Base de données créée en ligne
- [ ] Tables créées (exécuter `database.sql`)
- [ ] Données de test ajoutées si nécessaire
- [ ] Connexion testée depuis le backend

---

## 🔧 Mise à jour du code pour la production

### 1. Mettre à jour l'URL de l'API
Dans `src/services/api.js`, l'URL sera automatiquement prise depuis les variables d'environnement:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
```

### 2. Configurer CORS dans le backend
Dans `backend/server.js`, ajoutez votre domaine Vercel:
```javascript
app.use(cors({
  origin: ['https://e-hianatra.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
```

---

## 🎯 Déploiement Complet - Résumé

### Architecture recommandée:
```
Frontend (Vercel)
    ↓
Backend (Render.com)
    ↓
Base de données (PlanetScale/Railway)
```

### URLs finales:
- **Frontend**: `https://e-hianatra.vercel.app`
- **Backend**: `https://e-hianatra-api.onrender.com`
- **Base de données**: Connexion via chaîne de connexion

---

## 🚨 Problèmes courants

### Erreur: "Cannot find module"
```bash
# Assurez-vous que toutes les dépendances sont installées
npm install
```

### Erreur: "Build failed"
```bash
# Testez le build localement
npm run build
```

### Erreur: "API not responding"
- Vérifiez que l'URL du backend est correcte dans les variables d'environnement
- Vérifiez que le backend est bien déployé et accessible
- Vérifiez la configuration CORS

### Erreur: "Database connection failed"
- Vérifiez les informations de connexion à la base de données
- Assurez-vous que la base de données accepte les connexions externes
- Vérifiez que les tables sont créées

---

## 📞 Support

Si vous rencontrez des problèmes:
1. Consultez les logs Vercel: https://vercel.com/dashboard
2. Consultez les logs du backend sur votre plateforme d'hébergement
3. Vérifiez la console du navigateur pour les erreurs frontend

---

## 🎉 Après le déploiement

Une fois déployé avec succès:
1. Testez toutes les fonctionnalités
2. Créez un compte de test
3. Vérifiez que l'authentification fonctionne
4. Testez la création de cours, chapitres, quiz et devoirs
5. Partagez l'URL avec vos utilisateurs!

**Votre plateforme e-Hianatra est maintenant en ligne! 🚀**
