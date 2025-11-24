# ✅ Vérifier la Connexion Frontend ↔ Backend

## 🔍 Checklist de Vérification

### 1️⃣ Backend est Lancé

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```

**✅ Vous devez voir :**
```
✅ Connexion à la base de données MySQL réussie
🚀 Serveur e-Hianatra démarré sur le port 8080
📚 API disponible sur http://localhost:8080/api
```

**❌ Si erreur :**
- Vérifiez que MySQL est démarré (XAMPP)
- Vérifiez `backend/.env` (mot de passe MySQL)
- Lancez `npm run init-db` pour créer la base

---

### 2️⃣ API Répond

**Ouvrez dans votre navigateur :**
http://localhost:8080/api/health

**✅ Vous devez voir :**
```json
{
  "status": "OK",
  "message": "e-Hianatra API is running",
  "timestamp": "2024-11-24T..."
}
```

**❌ Si "Cannot GET" ou erreur :**
- Le backend n'est pas lancé
- Mauvais port (vérifiez `backend/.env`)

---

### 3️⃣ Mode Démo Désactivé

**Vérifiez `src/services/api.js` :**
```javascript
const DEMO_MODE = false  // ✅ Doit être false
```

**Si c'est `true` :**
- Le frontend utilise des données fictives
- Changez à `false` pour utiliser le backend

---

### 4️⃣ Frontend Lancé

**Terminal 2 - Frontend :**
```bash
npm run dev
```

**✅ Vous devez voir :**
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

---

### 5️⃣ Test de Connexion

**1. Ouvrez :** http://localhost:3000

**2. Ouvrez la Console du Navigateur (F12)**

**3. Allez sur l'onglet "Network" (Réseau)**

**4. Cliquez sur "Connexion" ou "S'inscrire"**

**5. Regardez les requêtes :**

**✅ Vous devez voir :**
- Requête vers `http://localhost:8080/api/auth/login`
- Status: 200 (succès) ou 401 (identifiants incorrects)

**❌ Si vous voyez :**
- Status: Failed (CORS error)
- ERR_CONNECTION_REFUSED
- → Le backend n'est pas lancé

---

### 6️⃣ Test de Connexion Réelle

**Utilisez les comptes de test :**

| Email | Mot de passe | Rôle |
|-------|--------------|------|
| student@demo.mg | password123 | Étudiant |
| teacher@demo.mg | password123 | Enseignant |
| admin@demo.mg | password123 | Admin |

**✅ Si ça fonctionne :**
- Vous êtes redirigé vers le dashboard
- Vous voyez les cours de la base de données

**❌ Si "Email ou mot de passe incorrect" :**
- La base de données n'est pas initialisée
- Lancez `npm run init-db` dans `/backend`

---

### 7️⃣ Vérifier les Cours

**1. Connectez-vous**

**2. Cliquez sur "Cours" dans le menu**

**✅ Vous devez voir :**
- 3 cours (Python, React, Figma)
- Venant de la base de données MySQL

**❌ Si "Aucun cours trouvé" :**
- Ouvrez la console (F12)
- Regardez les erreurs
- Vérifiez que le backend répond

---

## 🐛 Dépannage Rapide

### Erreur CORS

**Symptôme :** 
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution :**
Le backend est déjà configuré pour CORS. Vérifiez que :
- Backend sur port 8080
- Frontend sur port 3000
- Si vous avez changé les ports, modifiez `backend/.env` :
```env
FRONTEND_URL=http://localhost:VOTRE_PORT
```

### Erreur 404 sur /api/...

**Symptôme :**
```
GET http://localhost:8080/api/courses 404 (Not Found)
```

**Solution :**
- Le backend n'est pas lancé
- Vérifiez http://localhost:8080/api/health

### Base de données vide

**Symptôme :**
- Connexion réussie
- Mais "Aucun cours trouvé"

**Solution :**
```bash
cd backend
npm run init-db
```

---

## 📊 État Actuel

**Mode :** Backend Réel (MySQL)

**Configuration :**
- `DEMO_MODE = false` ✅
- Backend sur port 8080
- Frontend sur port 3000
- Base de données : e_hianatra

**Comptes disponibles :**
- student@demo.mg / password123
- teacher@demo.mg / password123
- admin@demo.mg / password123

---

## 🔄 Revenir au Mode Démo

Si vous voulez revenir aux données fictives (sans backend) :

Dans `src/services/api.js` :
```javascript
const DEMO_MODE = true
```

Rechargez la page.

---

**Tout fonctionne ?** Vous êtes prêt à développer ! 🎉
