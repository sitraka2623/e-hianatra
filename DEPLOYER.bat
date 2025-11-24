@echo off
echo ========================================
echo   DEPLOIEMENT e-Hianatra sur Vercel
echo ========================================
echo.

echo Etape 1: Verification de Git...
git status
if errorlevel 1 (
    echo.
    echo [ERREUR] Git n'est pas initialise!
    echo Initialisation de Git...
    git init
    git add .
    git commit -m "Initial commit"
    echo.
    echo [INFO] Creez un repository sur GitHub et executez:
    echo git remote add origin https://github.com/votre-username/e-hianatra.git
    echo git push -u origin main
    pause
    exit /b
)

echo.
echo Etape 2: Ajout des fichiers modifies...
git add .

echo.
echo Etape 3: Commit des changements...
set /p commit_msg="Message de commit (ou appuyez sur Entree pour 'Update'): "
if "%commit_msg%"=="" set commit_msg=Update

git commit -m "%commit_msg%"

echo.
echo Etape 4: Push vers GitHub...
git push

echo.
echo ========================================
echo   INSTRUCTIONS POUR VERCEL
echo ========================================
echo.
echo 1. Allez sur https://vercel.com
echo 2. Connectez-vous avec votre compte GitHub
echo 3. Cliquez sur "Add New..." puis "Project"
echo 4. Selectionnez votre repository e-Hianatra
echo 5. Vercel detectera automatiquement Vite
echo 6. Ajoutez la variable d'environnement:
echo    VITE_API_URL = https://votre-backend-url.com/api
echo 7. Cliquez sur "Deploy"
echo.
echo OU utilisez Vercel CLI:
echo.
echo npm install -g vercel
echo vercel login
echo vercel --prod
echo.
echo ========================================
echo Consultez DEPLOIEMENT_VERCEL.md pour plus de details
echo ========================================
pause
