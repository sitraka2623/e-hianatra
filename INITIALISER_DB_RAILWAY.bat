@echo off
echo ========================================
echo   INITIALISATION BASE DE DONNEES
echo   Railway - e-Hianatra
echo ========================================
echo.

echo Ce script va initialiser votre base de donnees Railway
echo avec toutes les tables necessaires.
echo.

echo Vous aurez besoin des informations de connexion Railway:
echo - MYSQLHOST
echo - MYSQLUSER
echo - MYSQLPASSWORD
echo - MYSQLDATABASE
echo - MYSQLPORT
echo.

pause

echo.
echo Installation de mysql2 (si necessaire)...
cd backend
call npm install mysql2
echo.

echo Execution du script d'initialisation...
node scripts/initDatabaseRailway.js

echo.
echo ========================================
pause
