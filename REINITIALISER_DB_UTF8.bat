@echo off
echo ========================================
echo   REINITIALISATION BASE DE DONNEES
echo   Avec encodage UTF-8 correct
echo ========================================
echo.

echo ATTENTION: Cela va SUPPRIMER toutes les donnees existantes!
echo.
pause

echo.
echo Execution du script de reinitialisation...
cd backend
node scripts/reinitDatabaseUTF8.js

echo.
echo ========================================
pause
