@echo off
echo ========================================
echo   AJOUT DE DONNEES DE DEMONSTRATION
echo   e-Hianatra
echo ========================================
echo.

echo Ce script va ajouter:
echo - 1 compte enseignant (prof@ehianatra.mg)
echo - 5 cours de demonstration
echo.

pause

cd backend
node scripts/addDemoData.js

echo.
pause
