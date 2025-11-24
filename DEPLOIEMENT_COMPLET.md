# 🚀 Déploiement Complet - e-Hianatra

Guide complet pour déployer l'application complète (Frontend + Backend + Base de données)

---

## 📋 Vue d'ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    ARCHITECTURE                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  👤 Utilisateurs                                         │
│       ↓                                                  │
│  🌐 Frontend (Vercel)                                    │
│       https://e-hianatra.vercel.app                      │
│       ↓                                                  │
│  ⚙️  Backend API (Render.com)                            │
│       https://e-hianatra-api.onrender.com                │
│       ↓                                                  │
│  🗄️  Base de données MySQL (Railway)                     │
│       mysql://railway.app:3306/railway                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Déploiement en 3 Parties

### PARTIE 1: Frontend (Vercel) ✅ PRÊT

**Temps estimé**: 5 minutes

1. Allez sur **https://vercel.com**
2. Connectez-vous avec GitHub
3. Cliquez sur "Add New..." → "Project"
4. Sélectionnez `e-hianatra`
5. Ajoutez la variable:
   ```
   VITE_API_URL = http://localhost:3000/api
   ```
   *(Vous la changerez après avoir déployé le backend)*
6. Cliquez sur "Deploy"

**Résultat**: `https://e-hianatra.vercel.app`

---

### PARTIE 2: Base de Données (Railway)

**Temps estimé**: 10 minutes

#### Étape 1: Créer la base de données
1. Allez sur **https://railway.app**
2. Connectez-vous avec GitHub
3. Cliquez sur "New Project"
4. Sélectionnez "Provision MySQL"
5. Railway crée automatiquement la base de données

#### Étape 2: Obtenir les informations de connexion
1. Cliquez sur votre base MySQL
2. Allez dans l'onglet "Variables"
3. Notez ces informations:
   ```
   MYSQLHOST = xxxxx.railway.app
   MYSQLUSER = root
   MYSQLPASSWORD = xxxxx
   MYSQLDATABASE = railway
   MYSQLPORT = 3306
   ```

#### Étape 3: Initialiser la base de données

**Option A: Via MySQL Workbench (Recommandé)**
1. Téléchargez MySQL Workbench: https://dev.mysql.com/downloads/workbench/
2. Créez une nouvelle connexion avec les infos Railway
3. Ouvrez le fichier `backend/database.sql`
4. Exécutez le script (Ctrl+Shift+Enter)

**Option B: Via Railway Console**
1. Dans Railway, cliquez sur votre base MySQL
2. Allez dans l'onglet "Data"
3. Cliquez sur "Query"
4. Copiez-collez le contenu de `backend/database.sql`
5. Exécutez

**Résultat**: Base de données prête avec toutes les tables

---

### PARTIE 3: Backend API (Render.com)

**Temps estimé**: 15 minutes

#### Étape 1: Créer le Web Service
1. Allez sur **https://render.com**
2. Connectez-vous avec GitHub
3. Cliquez sur "New +" → "Web Service"
4. Sélectionnez votre repository `e-hianatra`

#### Étape 2: Configuration
```
Name: e-hianatra-api
Region: Frankfurt (EU Central)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: node server.js
Instance Type: Free
```

#### Étape 3: Variables d'environnement
Cliquez sur "Advanced" et ajoutez:

```
NODE_ENV = production
PORT = 10000
JWT_SECRET = e-hianatra-secret-key-2024-super-securise

# Informations de la base de données Railway
DB_HOST = xxxxx.railway.app
DB_USER = root
DB_PASSWORD = xxxxx
DB_NAME = railway
DB_PORT = 3306

# URL du frontend Vercel
FRONTEND_URL = https://e-hianatra.vercel.app
```

#### Étape 4: Déployer
1. Cliquez sur "Create Web Service"
2. Attendez 5-10 minutes
3. Notez l'URL: `https://e-hianatra-api.onrender.com`

#### Étape 5: Tester l'API
Visitez: `https://e-hianatra-api.onrender.com/api/health`

Vous devriez voir:
```json
{
  "status": "OK",
  "message": "e-Hianatra API is running"
}
```

**Résultat**: Backend API fonctionnel

---

## 🔗 Connecter Frontend et Backend

### Étape 1: Mettre à jour Vercel
1. Retournez sur **Vercel Dashboard**
2. Sélectionnez votre projet `e-hianatra`
3. Allez dans "Settings" → "Environment Variables"
4. Modifiez `VITE_API_URL`:
   ```
   VITE_API_URL = https://e-hianatra-api.onrender.com/api
   ```
5. Sauvegardez

### Étape 2: Redéployer
1. Allez dans l'onglet "Deployments"
2. Cliquez sur les 3 points du dernier déploiement
3. Cliquez sur "Redeploy"

**OU** Vercel redéploiera automatiquement

---

## ✅ Vérification Complète

### 1. Tester le Frontend
- Visitez: `https://e-hianatra.vercel.app`
- La page d'accueil doit s'afficher
- Le changement de langue doit fonctionner

### 2. Tester le Backend
- Visitez: `https://e-hianatra-api.onrender.com/api/health`
- Doit retourner `{"status": "OK"}`

### 3. Tester la Connexion Complète
1. Sur votre site Vercel, cliquez sur "S'inscrire"
2. Créez un compte de test
3. Si l'inscription fonctionne → ✅ Tout est connecté!

### 4. Tester les Fonctionnalités
- ✅ Inscription/Connexion
- ✅ Création de cours (compte enseignant)
- ✅ Ajout de chapitres
- ✅ Création de quiz
- ✅ Création de devoirs

---

## 🎓 Créer les Comptes de Test

Une fois tout déployé, créez ces comptes:

### Compte Enseignant
```
Email: prof@ehianatra.com
Mot de passe: Prof123!
Rôle: TEACHER
```

### Compte Étudiant
```
Email: etudiant@ehianatra.com
Mot de passe: Etudiant123!
Rôle: STUDENT
```

### Compte Admin
```
Email: admin@ehianatra.com
Mot de passe: Admin123!
Rôle: ADMIN
```

---

## 📊 Monitoring

### Render.com
- Dashboard: https://dashboard.render.com
- Logs en temps réel disponibles
- Alertes par email

### Vercel
- Dashboard: https://vercel.com/dashboard
- Analytics disponibles
- Logs de déploiement

### Railway
- Dashboard: https://railway.app/dashboard
- Métriques de la base de données
- Utilisation des ressources

---

## 💰 Coûts (Gratuit)

| Service | Plan | Limitations |
|---------|------|-------------|
| Vercel | Free | Illimité pour projets personnels |
| Render | Free | 750h/mois, veille après 15min |
| Railway | Free | 500h/mois, $5 de crédit |

**Total: 0€/mois** pour commencer!

---

## 🚨 Limitations du Plan Gratuit

### Render.com (Backend)
- ⏰ Se met en veille après 15 minutes d'inactivité
- 🐌 Première requête après veille: 30-60 secondes
- 💡 Solution: Passer au plan payant ($7/mois) pour éviter la veille

### Railway (Base de données)
- ⏱️ 500 heures/mois
- 💾 1GB de stockage
- 💡 Solution: Passer au plan payant ($5/mois) pour plus d'heures

---

## 🔄 Mises à Jour Futures

### Pour mettre à jour le code:

```bash
# 1. Modifiez votre code localement
# 2. Commitez et pushez
git add .
git commit -m "Nouvelle fonctionnalité"
git push

# 3. Vercel et Render redéploieront automatiquement!
```

---

## 🎉 Félicitations!

Votre plateforme e-Hianatra est maintenant:
- ✅ Déployée en ligne
- ✅ Accessible depuis n'importe où
- ✅ Avec une vraie base de données
- ✅ Prête à accueillir des utilisateurs

**URLs de votre application:**
- Frontend: `https://e-hianatra.vercel.app`
- Backend: `https://e-hianatra-api.onrender.com`

---

## 📚 Guides Détaillés

- **DEPLOIEMENT_RAPIDE.md** - Guide frontend uniquement
- **DEPLOIEMENT_BACKEND.md** - Guide backend détaillé
- **DEPLOIEMENT_VERCEL.md** - Guide Vercel complet

---

## 🆘 Besoin d'Aide?

Si quelque chose ne fonctionne pas:
1. Vérifiez les logs sur Render/Vercel
2. Vérifiez que toutes les variables d'environnement sont correctes
3. Testez chaque partie séparément (Frontend, Backend, DB)
4. Consultez les guides détaillés

**Bonne chance avec votre plateforme e-learning! 🚀📚**
