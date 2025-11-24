-- Base de données e-Hianatra
-- Créer la base de données
CREATE DATABASE IF NOT EXISTS e_hianatra;
USE e_hianatra;

-- Table utilisateur
CREATE TABLE IF NOT EXISTS utilisateur (
  id_user INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mot_de_passe VARCHAR(255) NOT NULL,
  role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table cours
CREATE TABLE IF NOT EXISTS cours (
  id_cours INT PRIMARY KEY AUTO_INCREMENT,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  categorie VARCHAR(100),
  id_enseignant INT,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_enseignant) REFERENCES utilisateur(id_user) ON DELETE SET NULL
);

-- Table chapitre
CREATE TABLE IF NOT EXISTS chapitre (
  id_chapitre INT PRIMARY KEY AUTO_INCREMENT,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  id_cours INT,
  ordre INT DEFAULT 0,
  FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
);

-- Table contenu
CREATE TABLE IF NOT EXISTS contenu (
  id_contenu INT PRIMARY KEY AUTO_INCREMENT,
  type ENUM('VIDEO', 'PDF', 'TEXT', 'GUIDE') NOT NULL,
  titre VARCHAR(255),
  url TEXT,
  logiciels JSON,
  etapes JSON,
  id_chapitre INT,
  FOREIGN KEY (id_chapitre) REFERENCES chapitre(id_chapitre) ON DELETE CASCADE
);

-- Table quiz
CREATE TABLE IF NOT EXISTS quiz (
  id_quiz INT PRIMARY KEY AUTO_INCREMENT,
  titre VARCHAR(255) NOT NULL,
  id_cours INT,
  FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
);

-- Table question
CREATE TABLE IF NOT EXISTS question (
  id_question INT PRIMARY KEY AUTO_INCREMENT,
  libelle TEXT NOT NULL,
  id_quiz INT,
  FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz) ON DELETE CASCADE
);

-- Table option_question
CREATE TABLE IF NOT EXISTS option_question (
  id_option INT PRIMARY KEY AUTO_INCREMENT,
  libelle VARCHAR(255) NOT NULL,
  est_correct BOOLEAN DEFAULT FALSE,
  id_question INT,
  FOREIGN KEY (id_question) REFERENCES question(id_question) ON DELETE CASCADE
);

-- Table devoir
CREATE TABLE IF NOT EXISTS devoir (
  id_devoir INT PRIMARY KEY AUTO_INCREMENT,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  date_limite DATETIME,
  id_cours INT,
  FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
);

-- Table soumission
CREATE TABLE IF NOT EXISTS soumission (
  id_soumission INT PRIMARY KEY AUTO_INCREMENT,
  fichier VARCHAR(255),
  note DECIMAL(5,2),
  date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_devoir INT,
  id_etudiant INT,
  FOREIGN KEY (id_devoir) REFERENCES devoir(id_devoir) ON DELETE CASCADE,
  FOREIGN KEY (id_etudiant) REFERENCES utilisateur(id_user) ON DELETE CASCADE
);

-- Table messagerie
CREATE TABLE IF NOT EXISTS messagerie (
  id_message INT PRIMARY KEY AUTO_INCREMENT,
  contenu TEXT NOT NULL,
  date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  id_expediteur INT,
  id_destinataire INT,
  FOREIGN KEY (id_expediteur) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
  FOREIGN KEY (id_destinataire) REFERENCES utilisateur(id_user) ON DELETE CASCADE
);

-- Table inscription
CREATE TABLE IF NOT EXISTS inscription (
  id_inscription INT PRIMARY KEY AUTO_INCREMENT,
  id_cours INT,
  id_etudiant INT,
  date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE,
  FOREIGN KEY (id_etudiant) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
  UNIQUE KEY unique_inscription (id_cours, id_etudiant)
);

-- Données de test (les mots de passe sont hashés avec bcrypt)
-- Mot de passe pour tous: password123

INSERT INTO utilisateur (id_user, nom, prenom, email, mot_de_passe, role) VALUES
(1, 'Rakoto', 'Jean', 'student@demo.mg', '$2a$10$rZ5qH8qF9YxK5qH8qF9YxOqH8qF9YxK5qH8qF9YxK5qH8qF9YxK5q', 'STUDENT'),
(2, 'Rabe', 'Marie', 'teacher@demo.mg', '$2a$10$rZ5qH8qF9YxK5qH8qF9YxOqH8qF9YxK5qH8qF9YxK5qH8qF9YxK5q', 'TEACHER'),
(3, 'Randria', 'Paul', 'admin@demo.mg', '$2a$10$rZ5qH8qF9YxK5qH8qF9YxOqH8qF9YxK5qH8qF9YxK5qH8qF9YxK5q', 'ADMIN');

INSERT INTO cours (id_cours, titre, description, categorie, id_enseignant) VALUES
(1, 'Introduction à la Programmation Python', 'Apprenez les bases de Python, un langage de programmation puissant et facile à apprendre.', 'Programmation', 2),
(2, 'Développement Web avec React', 'Maîtrisez React.js et créez des applications web modernes et interactives.', 'Développement Web', 2),
(3, 'Design UI/UX avec Figma', 'Créez des interfaces utilisateur attrayantes et intuitives.', 'Design', 2);

INSERT INTO chapitre (id_chapitre, titre, description, id_cours, ordre) VALUES
(1, 'Introduction et Installation', 'Découvrez Python et installez votre environnement', 1, 1),
(2, 'Variables et Types de Données', 'Apprenez à manipuler les variables', 1, 2),
(3, 'Structures de Contrôle', 'Conditions, boucles et logique', 1, 3);

INSERT INTO contenu (id_contenu, type, titre, logiciels, etapes, id_chapitre) VALUES
(1, 'GUIDE', 'Introduction à Python - Qu\'est-ce que Python ?', 
 '[]',
 '[
   {"numero": 1, "titre": "Qu\'est-ce que Python ?", "description": "Python est un langage de programmation créé en 1991 par Guido van Rossum. C\'est un langage interprété, ce qui signifie que le code est exécuté ligne par ligne.", "details": "🎯 Pourquoi Python est populaire ?\\n• Facile à apprendre : syntaxe claire et lisible\\n• Polyvalent : web, data science, IA, automatisation\\n• Grande communauté : des millions de développeurs\\n• Bibliothèques riches : des outils pour tout\\n\\n📊 Utilisé par : Google, Netflix, Instagram, NASA, Spotify\\n\\n💰 Salaire moyen développeur Python : 45 000 - 80 000 € /an"},
   {"numero": 2, "titre": "Les Avantages de Python", "description": "Python se distingue par sa simplicité et sa puissance. Contrairement à d\'autres langages, Python utilise l\'indentation pour structurer le code, ce qui le rend très lisible.", "details": "✅ Points forts :\\n• Syntaxe simple : ressemble à l\'anglais\\n• Pas de point-virgule : moins de symboles\\n• Typage dynamique : pas besoin de déclarer les types\\n• Multi-paradigme : orienté objet, fonctionnel, procédural\\n\\n💡 Exemple de simplicité :\\nPython : print(\\"Hello\\")\\nJava : System.out.println(\\"Hello\\");\\nC++ : std::cout << \\"Hello\\" << std::endl;"},
   {"numero": 3, "titre": "Domaines d\'Application", "description": "Python est utilisé dans de nombreux domaines professionnels. Voici les principaux secteurs où Python excelle.", "details": "🌐 Développement Web : Django, Flask\\n📊 Data Science : Pandas, NumPy, Matplotlib\\n🤖 Intelligence Artificielle : TensorFlow, PyTorch\\n⚙️ Automatisation : Scripts, bots, web scraping\\n🎮 Jeux Vidéo : Pygame\\n🔬 Recherche Scientifique : SciPy\\n💼 Finance : Analyse de données, trading\\n\\n📈 Croissance : +27% de demande en 2023"},
   {"numero": 4, "titre": "Votre Premier Code Python", "description": "Même sans installer Python, vous pouvez comprendre ce code simple. C\'est un programme qui affiche un message.", "details": "📝 Code exemple :\\n\\n# Ceci est un commentaire\\nnom = \\"Jean\\"\\nage = 25\\nprint(f\\"Bonjour {nom}, vous avez {age} ans\\")\\n\\n🔍 Explication :\\n• # : commentaire (ignoré par Python)\\n• nom = \\"Jean\\" : crée une variable\\n• print() : affiche du texte\\n• f\\"...\\" : format string (insère des variables)\\n\\n✨ Résultat : Bonjour Jean, vous avez 25 ans"},
   {"numero": 5, "titre": "Comparaison avec d\'autres Langages", "description": "Pour mieux comprendre Python, comparons-le avec d\'autres langages populaires.", "details": "📊 Python vs JavaScript :\\n• Python : backend, data science, IA\\n• JavaScript : frontend, backend (Node.js)\\n\\n📊 Python vs Java :\\n• Python : plus simple, moins verbeux\\n• Java : plus rapide, typage statique\\n\\n📊 Python vs C++ :\\n• Python : plus lent mais plus facile\\n• C++ : très rapide, plus complexe\\n\\n🎯 Conclusion : Python = meilleur choix pour débuter !"}
 ]', 1),
(2, 'GUIDE', 'Installation Complète de Python',
 '["Python 3.11+", "VS Code", "Git"]',
 '[
   {"numero": 1, "titre": "Télécharger Python", "description": "Rendez-vous sur python.org et téléchargez la dernière version stable de Python (actuellement 3.11 ou 3.12).", "details": "🌐 Lien : https://www.python.org/downloads/\\n\\n⚠️ IMPORTANT sur Windows :\\n• Cochez \\"Add Python to PATH\\" !\\n• Sinon Python ne sera pas reconnu dans le terminal\\n\\n📦 Taille du téléchargement : ~30 MB\\n⏱️ Temps de téléchargement : 1-5 minutes\\n\\n💡 Astuce : Téléchargez la version \\"Windows installer (64-bit)\\" pour Windows 10/11"},
   {"numero": 2, "titre": "Installer Python sur Windows", "description": "Double-cliquez sur le fichier téléchargé (python-3.11.x-amd64.exe) et suivez l\'assistant d\'installation.", "details": "✅ Étapes détaillées :\\n\\n1️⃣ Cochez \\"Add Python 3.11 to PATH\\" (EN BAS !)\\n2️⃣ Cliquez sur \\"Install Now\\"\\n3️⃣ Acceptez les permissions administrateur\\n4️⃣ Attendez 2-5 minutes\\n5️⃣ Cliquez sur \\"Close\\" quand c\'est terminé\\n\\n📁 Emplacement par défaut :\\nC:\\\\Users\\\\VotreNom\\\\AppData\\\\Local\\\\Programs\\\\Python\\\\Python311\\n\\n💾 Espace disque requis : ~100 MB"},
   {"numero": 3, "titre": "Vérifier l\'Installation", "description": "Ouvrez l\'Invite de commandes (CMD) ou PowerShell et tapez : python --version", "details": "🖥️ Comment ouvrir le terminal :\\n• Windows : Touche Windows + R, tapez \\"cmd\\", Entrée\\n• Ou : Recherchez \\"Invite de commandes\\"\\n\\n⌨️ Commandes à tester :\\n\\n1. python --version\\n   ✅ Résultat attendu : Python 3.11.x\\n\\n2. python\\n   ✅ Ouvre l\'interpréteur Python (>>>)\\n   ✅ Tapez exit() pour quitter\\n\\n3. pip --version\\n   ✅ Vérifie que pip est installé\\n\\n❌ Si \\"python n\'est pas reconnu\\" :\\n→ Redémarrez votre ordinateur\\n→ Réinstallez en cochant \\"Add to PATH\\""},
   {"numero": 4, "titre": "Installer Visual Studio Code", "description": "VS Code est l\'éditeur de code le plus populaire. Téléchargez-le depuis code.visualstudio.com", "details": "🌐 Lien : https://code.visualstudio.com/\\n\\n📥 Installation :\\n1️⃣ Téléchargez \\"User Installer\\" (70 MB)\\n2️⃣ Lancez l\'installateur\\n3️⃣ Acceptez les conditions\\n4️⃣ Cochez toutes les options :\\n   ✅ Ajouter au PATH\\n   ✅ Créer une icône sur le bureau\\n   ✅ Ajouter au menu contextuel\\n5️⃣ Cliquez sur \\"Installer\\"\\n\\n⏱️ Temps d\'installation : 2-3 minutes\\n\\n🎨 Pourquoi VS Code ?\\n• Gratuit et open source\\n• Extensions puissantes\\n• Débogueur intégré\\n• Terminal intégré\\n• Autocomplétion intelligente"},
   {"numero": 5, "titre": "Configurer VS Code pour Python", "description": "Installez l\'extension Python officielle de Microsoft pour bénéficier de toutes les fonctionnalités.", "details": "🔌 Installation de l\'extension :\\n\\n1️⃣ Ouvrez VS Code\\n2️⃣ Cliquez sur l\'icône Extensions (carré avec 4 carrés)\\n   Ou : Ctrl + Shift + X\\n3️⃣ Recherchez \\"Python\\"\\n4️⃣ Cliquez sur \\"Python\\" par Microsoft\\n5️⃣ Cliquez sur \\"Install\\"\\n\\n✨ Fonctionnalités ajoutées :\\n• Coloration syntaxique\\n• Autocomplétion (IntelliSense)\\n• Débogage pas à pas\\n• Linting (détection d\'erreurs)\\n• Formatage automatique\\n• Exécution de code\\n\\n🎯 Extensions bonus recommandées :\\n• Pylance : meilleure autocomplétion\\n• Python Indent : indentation automatique\\n• autoDocstring : génère la documentation"},
   {"numero": 6, "titre": "Créer votre Premier Fichier Python", "description": "Créez un dossier pour vos projets Python et votre premier fichier .py", "details": "📁 Organisation recommandée :\\n\\nC:\\\\Users\\\\VotreNom\\\\Documents\\\\Python\\n├── projet1\\n│   └── hello.py\\n├── projet2\\n└── exercices\\n\\n🔨 Créer un fichier :\\n\\n1️⃣ Dans VS Code : File > Open Folder\\n2️⃣ Créez un dossier \\"MesProjets Python\\"\\n3️⃣ File > New File\\n4️⃣ Sauvegardez : Ctrl + S\\n5️⃣ Nommez : hello.py\\n\\n💡 L\'extension .py indique un fichier Python\\n\\n✍️ Tapez ce code :\\n\\nprint(\\"Bonjour, je programme en Python !\\")\\nnom = input(\\"Quel est votre nom ? \\")\\nprint(f\\"Enchanté {nom} !\\")\\n\\n▶️ Exécuter : Clic droit > Run Python File"}
 ]', 1),
(3, 'GUIDE', 'Les Variables en Python - Guide Complet',
 '["Python 3.11+", "VS Code"]',
 '[
   {"numero": 1, "titre": "Qu\'est-ce qu\'une Variable ?", "description": "Une variable est comme une boîte qui stocke une valeur. Vous pouvez y mettre des nombres, du texte, etc.", "details": "📦 Analogie de la boîte :\\n\\nImaginez une boîte avec une étiquette :\\n• L\'étiquette = nom de la variable\\n• Le contenu = valeur de la variable\\n\\n💡 Exemple concret :\\n\\nage = 25\\n\\n🔍 Explication :\\n• \\"age\\" : nom de la variable (l\'étiquette)\\n• \\"=\\" : opérateur d\'affectation (on met dans la boîte)\\n• \\"25\\" : valeur stockée (le contenu)\\n\\n✨ Avantage : On peut réutiliser \\"age\\" partout !\\n\\nprint(age)        # Affiche : 25\\nprint(age + 5)    # Affiche : 30\\nprint(age * 2)    # Affiche : 50"},
   {"numero": 2, "titre": "Les Règles de Nommage", "description": "En Python, il y a des règles strictes pour nommer les variables. Respectez-les pour éviter les erreurs !", "details": "✅ AUTORISÉ :\\n• Lettres : a-z, A-Z\\n• Chiffres : 0-9 (mais pas au début !)\\n• Underscore : _\\n\\nExemples valides :\\nnom\\nprenom\\nage_utilisateur\\nnombre1\\n_variable_privee\\n\\n❌ INTERDIT :\\n• Commencer par un chiffre : 1nom ❌\\n• Espaces : mon nom ❌\\n• Caractères spéciaux : nom@user ❌\\n• Mots réservés : if, for, while ❌\\n\\n🎯 Conventions (bonnes pratiques) :\\n• snake_case : mon_age_actuel ✅\\n• Descriptif : age (pas x) ✅\\n• Minuscules : age (pas AGE) ✅\\n• Anglais : age (pas âge) ✅"},
   {"numero": 3, "titre": "Les Types de Données", "description": "Python a plusieurs types de données. Chaque type a ses propres caractéristiques et utilisations.", "details": "📊 Les 4 types principaux :\\n\\n1️⃣ INTEGER (int) - Nombres entiers\\nage = 25\\nannee = 2024\\ntemperature = -5\\n\\n2️⃣ FLOAT - Nombres décimaux\\nprix = 19.99\\ntaille = 1.75\\npi = 3.14159\\n\\n3️⃣ STRING (str) - Texte\\nnom = \\"Jean\\"\\nville = \'Antananarivo\'\\nmessage = \\"\\"\\"Texte\\nsur plusieurs\\nlignes\\"\\"\\"\\n\\n4️⃣ BOOLEAN (bool) - Vrai/Faux\\nest_majeur = True\\nest_connecte = False\\n\\n🔍 Vérifier le type :\\nprint(type(age))      # <class \'int\'>\\nprint(type(prix))     # <class \'float\'>\\nprint(type(nom))      # <class \'str\'>\\nprint(type(est_majeur)) # <class \'bool\'>"},
   {"numero": 4, "titre": "Exemples Pratiques avec Variables", "description": "Voyons des exemples concrets d\'utilisation des variables dans des situations réelles.", "details": "💼 Exemple 1 : Calculer un âge\\n\\nannee_naissance = 1998\\nannee_actuelle = 2024\\nage = annee_actuelle - annee_naissance\\nprint(f\\"Vous avez {age} ans\\")\\n# Résultat : Vous avez 26 ans\\n\\n💰 Exemple 2 : Calculer un prix TTC\\n\\nprix_ht = 100\\ntva = 0.20  # 20%\\nprix_ttc = prix_ht * (1 + tva)\\nprint(f\\"Prix TTC : {prix_ttc}€\\")\\n# Résultat : Prix TTC : 120.0€\\n\\n📏 Exemple 3 : Convertir des unités\\n\\nkilometres = 5\\nmetres = kilometres * 1000\\nprint(f\\"{kilometres}km = {metres}m\\")\\n# Résultat : 5km = 5000m\\n\\n👤 Exemple 4 : Informations utilisateur\\n\\nprenom = \\"Marie\\"\\nnom = \\"Rakoto\\"\\nnom_complet = prenom + \\" \\" + nom\\nprint(f\\"Bienvenue {nom_complet} !\\")\\n# Résultat : Bienvenue Marie Rakoto !"},
   {"numero": 5, "titre": "Modifier et Réutiliser les Variables", "description": "Les variables peuvent changer de valeur. C\'est tout l\'intérêt ! Voyons comment les manipuler.", "details": "🔄 Modifier une variable :\\n\\ncompteur = 0\\nprint(compteur)  # 0\\n\\ncompteur = 5\\nprint(compteur)  # 5\\n\\ncompteur = compteur + 1\\nprint(compteur)  # 6\\n\\n✨ Raccourcis pratiques :\\n\\ncompteur += 1   # Ajoute 1\\ncompteur -= 2   # Soustrait 2\\ncompteur *= 3   # Multiplie par 3\\ncompteur /= 2   # Divise par 2\\n\\n🎯 Exemple concret : Panier d\'achat\\n\\ntotal = 0\\nprint(f\\"Total : {total}€\\")\\n\\n# Ajouter un article\\ntotal += 15.99\\nprint(f\\"Total : {total}€\\")  # 15.99€\\n\\n# Ajouter un autre article\\ntotal += 29.99\\nprint(f\\"Total : {total}€\\")  # 45.98€\\n\\n# Appliquer une réduction de 10%\\ntotal *= 0.9\\nprint(f\\"Total après réduction : {total}€\\")  # 41.38€"},
   {"numero": 6, "titre": "Exercices Pratiques", "description": "Testez vos connaissances avec ces exercices. Essayez de les faire avant de regarder les solutions !", "details": "📝 Exercice 1 : Calculer une moyenne\\n\\nCréez 3 variables pour 3 notes, calculez la moyenne.\\n\\n💡 Solution :\\nnote1 = 15\\nnote2 = 12\\nnote3 = 18\\nmoyenne = (note1 + note2 + note3) / 3\\nprint(f\\"Moyenne : {moyenne}\\")\\n\\n📝 Exercice 2 : Échanger deux variables\\n\\nÉchangez les valeurs de a et b.\\n\\n💡 Solution :\\na = 5\\nb = 10\\nprint(f\\"Avant : a={a}, b={b}\\")\\n\\n# Méthode Python (élégante)\\na, b = b, a\\nprint(f\\"Après : a={a}, b={b}\\")\\n\\n📝 Exercice 3 : Calculer l\'IMC\\n\\nIMC = poids / (taille²)\\n\\n💡 Solution :\\npoids = 70  # kg\\ntaille = 1.75  # m\\nimc = poids / (taille ** 2)\\nprint(f\\"Votre IMC : {imc:.2f}\\")\\n# .2f = 2 chiffres après la virgule"}
 ]', 2);

INSERT INTO quiz (id_quiz, titre, id_cours) VALUES
(1, 'Quiz - Bases de Python', 1);

INSERT INTO question (id_question, libelle, id_quiz) VALUES
(1, 'Quel est le type de données pour stocker du texte en Python ?', 1),
(2, 'Comment afficher "Hello World" en Python ?', 1);

INSERT INTO option_question (id_option, libelle, est_correct, id_question) VALUES
(1, 'int', FALSE, 1),
(2, 'str', TRUE, 1),
(3, 'float', FALSE, 1),
(4, 'bool', FALSE, 1),
(5, 'echo("Hello World")', FALSE, 2),
(6, 'print("Hello World")', TRUE, 2),
(7, 'console.log("Hello World")', FALSE, 2),
(8, 'printf("Hello World")', FALSE, 2);

INSERT INTO devoir (id_devoir, titre, description, date_limite, id_cours) VALUES
(1, 'Projet - Calculatrice Python', 'Créez une calculatrice simple en Python', '2024-12-31 23:59:59', 1);

INSERT INTO inscription (id_cours, id_etudiant) VALUES
(1, 1),
(2, 1);
