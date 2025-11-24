@echo off
echo ========================================
echo Installation e-Hianatra avec MySQL
echo ========================================
echo.

echo [1/5] Installation des dependances backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERREUR: Installation des dependances backend echouee
    pause
    exit /b 1
)
echo ✓ Dependances backend installees
echo.

echo [2/5] Verification de MySQL...
echo Assurez-vous que MySQL est demarre (XAMPP ou service MySQL)
pause

echo [3/5] Creation de la base de donnees...
call npm run init-db
if %errorlevel% neq 0 (
    echo ERREUR: Creation de la base de donnees echouee
    echo Verifiez que MySQL est demarre et que les identifiants dans .env sont corrects
    pause
    exit /b 1
)
echo ✓ Base de donnees creee et initialisee
echo.

echo [4/5] Demarrage du backend...
start "e-Hianatra Backend" cmd /k "npm run dev"
echo ✓ Backend demarre sur http://localhost:8080
echo.

echo [5/5] Installation frontend...
cd ..
call npm install
if %errorlevel% neq 0 (
    echo ERREUR: Installation des dependances frontend echouee
    pause
    exit /b 1
)
echo ✓ Dependances frontend installees
echo.

echo ========================================
echo Installation terminee !
echo ========================================
echo.
echo Backend: http://localhost:8080/api/health
echo Frontend: Lancez 'npm run dev' dans un autre terminal
echo.
echo Comptes de test:
echo - student@demo.mg / password123
echo - teacher@demo.mg / password123
echo - admin@demo.mg / password123
echo.
pause
