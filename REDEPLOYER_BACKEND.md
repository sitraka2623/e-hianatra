# Guide de Redéploiement Backend sur Render

## ⚠️ Problème actuel
Le backend déployé sur Render n'a pas les dernières modifications:
- Route PUT `/api/courses/:id` pour modifier un cours
- Corrections des noms de tables (inscriptions, questions_quiz, reponses_quiz)
- Correction des colonnes (id_user au lieu de id_etudiant)

## 🚀 Étapes de redéploiement

### Option 1: Redéploiement automatique (Recommandé)

1. **Commit et push des changements**
   ```bash
   git add .
   git commit -m "Fix: Correction des routes et noms de tables pour Railway"
   git push origin main
   ```

2. **Render détectera automatiquement les changements**
   - Allez sur https://dashboard.render.com
   - Sélectionnez votre service backend
   - Le déploiement devrait démarrer automatiquement
   - Attendez que le statut passe à "Live" (environ 2-3 minutes)

### Option 2: Redéploiement manuel

1. **Allez sur Render Dashboard**
   - https://dashboard.render.com
   - Sélectionnez votre service backend "e-hianatra-backend"

2. **Déclenchez un redéploiement manuel**
   - Cliquez sur "Manual Deploy"
   - Sélectionnez "Deploy latest commit"
   - Attendez la fin du déploiement

### Option 3: Redéploiement via CLI

```bash
# Installer Render CLI si nécessaire
npm install -g @render/cli

# Se connecter
render login

# Redéployer
render deploy
```

## ✅ Vérification après déploiement

### 1. Tester la route health
```bash
curl https://votre-backend.onrender.com/api/health
```

Réponse attendue:
```json
{
  "status": "OK",
  "message": "e-Hianatra API is running",
  "timestamp": "2024-..."
}
```

### 2. Tester la route GET courses
```bash
curl -H "Authorization: Bearer VOTRE_TOKEN" \
  https://votre-backend.onrender.com/api/courses
```

### 3. Tester la route PUT (modification de cours)
```bash
curl -X PUT \
  -H "Authorization: Bearer VOTRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"titre":"Test","description":"Test","categorie":"Test"}' \
  https://votre-backend.onrender.com/api/courses/1
```

## 🔧 Variables d'environnement à vérifier sur Render

Assurez-vous que ces variables sont configurées:

```env
# Base de données Railway
MYSQLHOST=containers-us-west-xxx.railway.app
MYSQLUSER=root
MYSQLPASSWORD=votre_password
MYSQLDATABASE=railway
MYSQLPORT=6379

# JWT
JWT_SECRET=votre_secret_jwt

# Frontend
FRONTEND_URL=https://e-hianatra.vercel.app

# Port
PORT=10000
```

## 📝 Logs de déploiement

Pour voir les logs en temps réel:
1. Allez sur Render Dashboard
2. Sélectionnez votre service
3. Cliquez sur "Logs"
4. Vérifiez qu'il n'y a pas d'erreurs

Messages attendus:
```
🚀 Serveur e-Hianatra démarré sur le port 10000
📚 API disponible sur http://localhost:10000/api
🏥 Health check: http://localhost:10000/api/health
```

## 🐛 Dépannage

### Erreur: "Table doesn't exist"
- Vérifiez que les tables Railway sont créées
- Exécutez `CREER_TABLES_RAILWAY.bat` si nécessaire

### Erreur: "Cannot connect to database"
- Vérifiez les variables d'environnement Railway
- Testez la connexion depuis Railway Dashboard

### Erreur 404 sur les routes
- Vérifiez que le déploiement est terminé
- Videz le cache du navigateur (Ctrl+Shift+R)
- Vérifiez l'URL de l'API dans le frontend

## 🔄 Après le redéploiement

1. **Redéployez le frontend Vercel** (si nécessaire)
   ```bash
   vercel --prod
   ```

2. **Testez les fonctionnalités**
   - ✅ Connexion
   - ✅ Liste des cours
   - ✅ Création de cours
   - ✅ **Modification de cours** (nouvelle fonctionnalité)
   - ✅ Suppression de cours

3. **Vérifiez les logs**
   - Pas d'erreurs de table
   - Pas d'erreurs 404
   - Requêtes réussies

## 📊 Temps estimé
- Commit et push: 1 minute
- Déploiement Render: 2-3 minutes
- Tests: 2 minutes
- **Total: ~5-6 minutes**

## 🎯 Résultat attendu
Après le redéploiement, toutes les fonctionnalités devraient fonctionner:
- ✅ Modification de cours sans erreur 404
- ✅ Suppression de cours avec cascade
- ✅ Inscription aux cours
- ✅ Création de quiz et devoirs
