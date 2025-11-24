@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   TEST API e-Hianatra
echo ========================================
echo.

set /p API_URL="Entrez l'URL de votre API (ex: https://votre-backend.onrender.com): "

echo.
echo 🔍 Test 1: Health Check...
curl -s %API_URL%/api/health
echo.
echo.

echo 🔍 Test 2: Vérification des routes disponibles...
echo GET  %API_URL%/api/health
echo POST %API_URL%/api/auth/login
echo POST %API_URL%/api/auth/register
echo GET  %API_URL%/api/courses
echo POST %API_URL%/api/courses
echo GET  %API_URL%/api/courses/:id
echo PUT  %API_URL%/api/courses/:id
echo DELETE %API_URL%/api/courses/:id
echo.

echo.
echo ✅ Si vous voyez un JSON avec "status": "OK", l'API fonctionne!
echo.
echo 📝 Pour tester les routes protégées:
echo    1. Connectez-vous sur le site
echo    2. Ouvrez la console du navigateur (F12)
echo    3. Tapez: localStorage.getItem('token')
echo    4. Copiez le token
echo    5. Utilisez: curl -H "Authorization: Bearer VOTRE_TOKEN" %API_URL%/api/courses
echo.

pause
