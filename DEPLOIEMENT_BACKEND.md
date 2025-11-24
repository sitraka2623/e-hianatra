# 🚀 Déploiement Backend - e-Hianatra

## Option 1: Render.com (Recommandé - Gratuit)

### Étape 1: Créer un compte Render
1. Allez sur **https://render.com**
2. Cliquez sur "Get Started"
3. Connectez-vous avec GitHub

### Étape 2: Créer un Web Service
1. Cliquez sur "New +" → "Web Service"
2. Connectez votre repository GitHub: `e-hianatra`
3. Configurez le service:

```
Name: e-hianatra-api
Region: Frankfurt (EU Central) ou Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

### Étape 3: Configurer les Variables d'Environnement

Cliquez sur "Advanced" puis ajoutez ces variables:

```
NODE_ENV = production
PORT = 10000
JWT_SECRET = votre_secret_jwt_super_securise_123456
FRONTEND_URL = https://e-hianatra.vercel.app

# Base de données (à configurer après avoir créé la DB)
DB_HOST = 
DB_USER = 
DB_PASSWORD = 
DB_NAME = 
DB_PORT = 3306
```

### Étape 4: Choisir le Plan
- Sélectionnez **"Free"** (gratuit)
- Limitations: 750 heures/mois, se met en veille après 15 min d'inactivité

### Étape 5: Créer le Service
- Cliquez sur "Create Web Service"
- Attendez 5-10 minutes pour le déploiement
- Votre API sera disponible sur: `https://e-hianatra-api.onrender.com`

---

## Option 2: Railway.app (Gratuit avec limites)

### Étape 1: Créer un compte Railway
1. Allez sur **https://railway.app**
2. Connectez-vous avec GitHub

### Étape 2: Créer un nouveau projet
1. Cliquez sur "New Project"
2. Sélectionnez "Deploy from GitHub repo"
3. Choisissez `e-hianatra`

### Étape 3: Configurer le service
1. Cliquez sur le service créé
2. Allez dans "Settings"
3. Configurez:
```
Root Directory: backend
Start Command: node server.js
```

### Étape 4: Variables d'environnement
Dans l'onglet "Variables", ajoutez:
```
NODE_ENV = production
JWT_SECRET = votre_secret_jwt_super_securise_123456
FRONTEND_URL = https://e-hianatra.vercel.app
```

### Étape 5: Obtenir l'URL
- Railway génère automatiquement une URL
- Format: `https://e-hianatra-api.up.railway.app`

---

## Option 3: Vercel (Serverless)

⚠️ **Limitation**: Vercel ne supporte pas les connexions MySQL persistantes facilement.

### Configuration
1. Créez un nouveau projet Vercel pour le backend
2. Root Directory: `backend`
3. Framework Preset: Other
4. Build Command: (laissez vide)
5. Output Directory: (laissez vide)

Le fichier `backend/vercel.json` est déjà configuré.

---

## 🗄️ Déploiement Base de Données MySQL

### Option A: Railway.app (Recommandé)

1. Dans votre projet Railway, cliquez sur "New"
2. Sélectionnez "Database" → "Add MySQL"
3. Railway créera automatiquement la base de données
4. Copiez les informations de connexion:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

5. Ajoutez ces variables dans votre Web Service Railway ou Render

6. **Initialiser la base de données:**
   - Téléchargez un client MySQL (MySQL Workbench, DBeaver, etc.)
   - Connectez-vous avec les informations Railway
   - Exécutez le fichier `backend/database.sql`

### Option B: PlanetScale (Gratuit)

1. Allez sur **https://planetscale.com**
2. Créez un compte
3. Créez une nouvelle base de données
4. Obtenez la chaîne de connexion
5. **Note**: PlanetScale utilise un format de connexion différent

### Option C: Aiven (Gratuit)

1. Allez sur **https://aiven.io**
2. Créez un compte
3. Créez un service MySQL gratuit
4. Copiez les informations de connexion

---

## 📝 Après le déploiement

### 1. Tester l'API
Visitez: `https://votre-api-url.com/api/health`

Vous devriez voir:
```json
{
  "status": "OK",
  "message": "e-Hianatra API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Mettre à jour le Frontend
1. Allez sur Vercel Dashboard
2. Sélectionnez votre projet `e-hianatra`
3. Allez dans "Settings" → "Environment Variables"
4. Modifiez `VITE_API_URL`:
```
VITE_API_URL = https://votre-api-url.com/api
```
5. Redéployez (automatique)

### 3. Initialiser la base de données

**Méthode 1: Via client MySQL**
```bash
# Connectez-vous à votre base de données distante
mysql -h votre-db-host -u votre-user -p

# Exécutez le script
source backend/database.sql
```

**Méthode 2: Via interface web**
- Railway: Utilisez l'onglet "Data" pour exécuter des requêtes
- PlanetScale: Utilisez la console web
- Aiven: Utilisez phpMyAdmin ou la console

**Méthode 3: Copier-coller**
- Ouvrez `backend/database.sql`
- Copiez tout le contenu
- Collez dans l'interface de votre hébergeur de base de données
- Exécutez

---

## 🔧 Configuration CORS

Le fichier `backend/server.js` est déjà configuré pour accepter:
- `http://localhost:5173` (développement)
- `https://e-hianatra.vercel.app` (production)
- Tous les sous-domaines `.vercel.app`

Si vous utilisez un autre domaine, ajoutez-le dans `server.js`:
```javascript
app.use(cors({
  origin: [
    'https://votre-domaine.com',
    'https://e-hianatra.vercel.app',
    /\.vercel\.app$/
  ],
  credentials: true
}))
```

---

## 🎯 Architecture Complète

```
Frontend (Vercel)
https://e-hianatra.vercel.app
         ↓
Backend (Render/Railway)
https://e-hianatra-api.onrender.com
         ↓
Base de données MySQL (Railway/PlanetScale)
mysql://user:pass@host:3306/database
```

---

## 🚨 Problèmes Courants

### Erreur: "Cannot connect to database"
- Vérifiez les variables d'environnement
- Vérifiez que la base de données accepte les connexions externes
- Vérifiez l'IP whitelist (Railway/PlanetScale)

### Erreur: "CORS policy"
- Ajoutez votre domaine frontend dans `server.js`
- Redéployez le backend

### Erreur: "Service unavailable" (Render)
- Le service gratuit se met en veille après 15 min
- La première requête peut prendre 30-60 secondes

### Base de données vide
- Exécutez le script `backend/database.sql`
- Vérifiez que toutes les tables sont créées

---

## 💰 Coûts

### Gratuit (Recommandé pour débuter)
- **Frontend**: Vercel (gratuit, illimité)
- **Backend**: Render.com (gratuit, 750h/mois)
- **Base de données**: Railway (gratuit, 500h/mois)

### Payant (Pour production)
- **Render**: $7/mois (pas de veille)
- **Railway**: $5/mois (500h) à $20/mois (illimité)
- **PlanetScale**: $29/mois (production)

---

## ✅ Checklist Déploiement Backend

- [ ] Backend déployé sur Render/Railway
- [ ] Variables d'environnement configurées
- [ ] Base de données MySQL créée
- [ ] Script `database.sql` exécuté
- [ ] API accessible (test `/api/health`)
- [ ] CORS configuré
- [ ] URL backend mise à jour dans Vercel
- [ ] Frontend redéployé
- [ ] Test complet de l'application

---

## 🎉 Félicitations!

Votre plateforme e-Hianatra est maintenant complètement déployée et accessible en ligne! 🌍
