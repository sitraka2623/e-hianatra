# 🚀 Instructions Rapides - e-Hianatra

## 🎮 Mode Actuel : DÉMO

Le frontend utilise actuellement des **données de démonstration** (pas de backend requis).

### ✅ Pour Tester Immédiatement

1. **Lancez le frontend :**
```bash
npm run dev
```

2. **Ouvrez :** http://localhost:3000

3. **Connectez-vous avec n'importe quel email**
   - Exemple : `test@email.com` / n'importe quel mot de passe

4. **Explorez :**
   - 6 cours disponibles
   - Chapitres, quiz, devoirs
   - Messagerie, profil

---

## 🗄️ Pour Utiliser le Backend Réel (MySQL)

### Étape 1 : Installer MySQL

**Option A - XAMPP (Recommandé pour Windows) :**
1. Téléchargez : https://www.apachefriends.org/
2. Installez et lancez XAMPP
3. Démarrez MySQL (bouton "Start")

**Option B - MySQL Standalone :**
1. Téléchargez : https://dev.mysql.com/downloads/installer/
2. Installez avec les paramètres par défaut

### Étape 2 : Créer la Base de Données

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

📧 Comptes créés:
   Étudiant: student@demo.mg / password123
   Enseignant: teacher@demo.mg / password123
   Admin: admin@demo.mg / password123
```

### Étape 3 : Lancer le Backend

```bash
npm run dev
```

**Résultat attendu :**
```
✅ Connexion à la base de données MySQL réussie
🚀 Serveur e-Hianatra démarré sur le port 8080
```

**Testez :** http://localhost:8080/api/health

### Étape 4 : Connecter le Frontend

Dans `src/services/api.js`, changez :
```javascript
const DEMO_MODE = false  // Active le backend réel
```

Relancez le frontend :
```bash
npm run dev
```

---

## 🐛 Problèmes Courants

### "Aucun cours trouvé"

**Cause :** Le backend n'est pas lancé ou la base de données n'existe pas

**Solution :**
1. Vérifiez que MySQL est démarré
2. Lancez `npm run init-db` dans `/backend`
3. Lancez `npm run dev` dans `/backend`
4. Vérifiez http://localhost:8080/api/health

**OU** réactivez le mode démo dans `src/services/api.js` :
```javascript
const DEMO_MODE = true
```

### Erreur "ER_ACCESS_DENIED_ERROR"

**Cause :** Mot de passe MySQL incorrect

**Solution :**
Modifiez `backend/.env` :
```env
DB_PASSWORD=votre_mot_de_passe_mysql
```

### Port 8080 déjà utilisé

**Solution :**
Dans `backend/.env` :
```env
PORT=8081
```

Puis dans `src/services/api.js` :
```javascript
baseURL: 'http://localhost:8081/api'
```

---

## 📊 Données Disponibles

### Mode Démo (Actuel)
- 6 cours variés
- Chapitres avec contenus
- Quiz avec questions
- Devoirs
- Messages
- Statistiques

### Mode Backend (MySQL)
- 3 cours initiaux
- Possibilité d'en créer plus
- Données persistantes
- Authentification réelle

---

## 🎯 Recommandation

**Pour tester rapidement :** Gardez le mode démo activé

**Pour développer sérieusement :** Configurez MySQL et le backend

---

**Besoin d'aide ?** Consultez `GUIDE_DEMARRAGE.md` pour plus de détails.
