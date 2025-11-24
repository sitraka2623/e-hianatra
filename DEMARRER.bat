@echo off
echo ========================================
echo Demarrage e-Hianatra
echo ========================================
echo.

echo Demarrage du backend...
start "e-Hianatra Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul

echo Demarrage du frontend...
start "e-Hianatra Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo e-Hianatra demarre !
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Appuyez sur une touche pour fermer cette fenetre...
pause > nul
