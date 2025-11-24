// Données de démonstration pour tester l'interface sans backend

export const mockCourses = [
  {
    id_cours: 1,
    titre: 'Introduction à la Programmation Python',
    description: 'Apprenez les bases de Python, un langage de programmation puissant et facile à apprendre. Parfait pour les débutants.',
    categorie: 'Programmation',
    id_enseignant: 1,
    progress: 45,
    studentCount: 156
  },
  {
    id_cours: 2,
    titre: 'Développement Web avec React',
    description: 'Maîtrisez React.js et créez des applications web modernes et interactives. Inclut des projets pratiques.',
    categorie: 'Développement Web',
    id_enseignant: 1,
    progress: 30,
    studentCount: 203
  },
  {
    id_cours: 3,
    titre: 'Design UI/UX avec Figma',
    description: 'Créez des interfaces utilisateur attrayantes et intuitives. Apprenez les principes du design moderne.',
    categorie: 'Design',
    id_enseignant: 2,
    progress: 60,
    studentCount: 89
  },
  {
    id_cours: 4,
    titre: 'Marketing Digital',
    description: 'Stratégies de marketing en ligne, SEO, réseaux sociaux et publicité digitale pour développer votre business.',
    categorie: 'Marketing',
    id_enseignant: 2,
    progress: 15,
    studentCount: 134
  },
  {
    id_cours: 5,
    titre: 'Base de Données MySQL',
    description: 'Apprenez à concevoir, créer et gérer des bases de données relationnelles avec MySQL.',
    categorie: 'Base de Données',
    id_enseignant: 1,
    progress: 0,
    studentCount: 78
  },
  {
    id_cours: 6,
    titre: 'Intelligence Artificielle',
    description: 'Introduction au Machine Learning et à l\'IA. Créez vos premiers modèles prédictifs.',
    categorie: 'IA & Data Science',
    id_enseignant: 3,
    progress: 0,
    studentCount: 245
  }
]

export const mockChapters = [
  {
    id_chapitre: 1,
    titre: 'Introduction et Installation',
    description: 'Découvrez Python et installez votre environnement de développement',
    id_cours: 1
  },
  {
    id_chapitre: 2,
    titre: 'Variables et Types de Données',
    description: 'Apprenez à manipuler les variables, nombres, chaînes de caractères',
    id_cours: 1
  },
  {
    id_chapitre: 3,
    titre: 'Structures de Contrôle',
    description: 'Conditions, boucles et logique de programmation',
    id_cours: 1
  },
  {
    id_chapitre: 4,
    titre: 'Fonctions et Modules',
    description: 'Créez des fonctions réutilisables et organisez votre code',
    id_cours: 1
  }
]

export const mockContents = [
  {
    id_contenu: 1,
    type: 'GUIDE',
    titre: 'Introduction à Python - Qu\'est-ce que Python ?',
    logiciels: [],
    etapes: [
      {
        numero: 1,
        titre: 'Qu\'est-ce que Python ?',
        description: 'Python est un langage de programmation créé en 1991 par Guido van Rossum. C\'est un langage interprété, ce qui signifie que le code est exécuté ligne par ligne.',
        details: '🎯 Pourquoi Python est populaire ?\n• Facile à apprendre : syntaxe claire et lisible\n• Polyvalent : web, data science, IA, automatisation\n• Grande communauté : des millions de développeurs\n• Bibliothèques riches : des outils pour tout\n\n📊 Utilisé par : Google, Netflix, Instagram, NASA, Spotify'
      },
      {
        numero: 2,
        titre: 'Les Avantages de Python',
        description: 'Python se distingue par sa simplicité et sa puissance. Contrairement à d\'autres langages, Python utilise l\'indentation pour structurer le code, ce qui le rend très lisible.',
        details: '✅ Points forts :\n• Syntaxe simple : ressemble à l\'anglais\n• Pas de point-virgule : moins de symboles\n• Typage dynamique : pas besoin de déclarer les types\n• Multi-paradigme : orienté objet, fonctionnel, procédural\n\n💡 Exemple de simplicité :\nPython : print("Hello")\nJava : System.out.println("Hello");'
      },
      {
        numero: 3,
        titre: 'Domaines d\'Application',
        description: 'Python est utilisé dans de nombreux domaines professionnels. Voici les principaux secteurs où Python excelle.',
        details: '🌐 Développement Web : Django, Flask\n📊 Data Science : Pandas, NumPy, Matplotlib\n🤖 Intelligence Artificielle : TensorFlow, PyTorch\n⚙️ Automatisation : Scripts, bots, web scraping\n🎮 Jeux Vidéo : Pygame\n🔬 Recherche Scientifique : SciPy\n💼 Finance : Analyse de données, trading\n\n💰 Salaire moyen d\'un développeur Python : 45 000 - 80 000 € /an'
      },
      {
        numero: 4,
        titre: 'Votre Premier Code Python',
        description: 'Même sans installer Python, vous pouvez comprendre ce code simple. C\'est un programme qui affiche un message.',
        details: '📝 Code exemple :\n\n# Ceci est un commentaire\nnom = "Jean"\nage = 25\nprint(f"Bonjour {nom}, vous avez {age} ans")\n\n🔍 Explication :\n• # : commentaire (ignoré par Python)\n• nom = "Jean" : crée une variable\n• print() : affiche du texte\n• f"..." : format string (insère des variables)\n\n✨ Résultat : Bonjour Jean, vous avez 25 ans'
      },
      {
        numero: 5,
        titre: 'Comparaison avec d\'autres Langages',
        description: 'Pour mieux comprendre Python, comparons-le avec d\'autres langages populaires.',
        details: '📊 Python vs JavaScript :\n• Python : backend, data science, IA\n• JavaScript : frontend, backend (Node.js)\n\n📊 Python vs Java :\n• Python : plus simple, moins verbeux\n• Java : plus rapide, typage statique\n\n📊 Python vs C++ :\n• Python : plus lent mais plus facile\n• C++ : très rapide, plus complexe\n\n🎯 Conclusion : Python = meilleur choix pour débuter !'
      }
    ],
    id_chapitre: 1
  },
  {
    id_contenu: 2,
    type: 'GUIDE',
    titre: 'Installation Complète de Python',
    logiciels: ['Python 3.11+', 'VS Code', 'Git'],
    etapes: [
      {
        numero: 1,
        titre: 'Télécharger Python',
        description: 'Rendez-vous sur python.org et téléchargez la dernière version stable de Python (actuellement 3.11 ou 3.12).',
        details: '🌐 Lien : https://www.python.org/downloads/\n\n⚠️ IMPORTANT sur Windows :\n• Cochez "Add Python to PATH" !\n• Sinon Python ne sera pas reconnu dans le terminal\n\n📦 Taille du téléchargement : ~30 MB\n⏱️ Temps de téléchargement : 1-5 minutes\n\n💡 Astuce : Téléchargez la version "Windows installer (64-bit)" pour Windows 10/11'
      },
      {
        numero: 2,
        titre: 'Installer Python sur Windows',
        description: 'Double-cliquez sur le fichier téléchargé (python-3.11.x-amd64.exe) et suivez l\'assistant d\'installation.',
        details: '✅ Étapes détaillées :\n\n1️⃣ Cochez "Add Python 3.11 to PATH" (EN BAS !)\n2️⃣ Cliquez sur "Install Now"\n3️⃣ Acceptez les permissions administrateur\n4️⃣ Attendez 2-5 minutes\n5️⃣ Cliquez sur "Close" quand c\'est terminé\n\n📁 Emplacement par défaut :\nC:\\Users\\VotreNom\\AppData\\Local\\Programs\\Python\\Python311\n\n💾 Espace disque requis : ~100 MB'
      },
      {
        numero: 3,
        titre: 'Vérifier l\'Installation',
        description: 'Ouvrez l\'Invite de commandes (CMD) ou PowerShell et tapez : python --version',
        details: '🖥️ Comment ouvrir le terminal :\n• Windows : Touche Windows + R, tapez "cmd", Entrée\n• Ou : Recherchez "Invite de commandes"\n\n⌨️ Commandes à tester :\n\n1. python --version\n   ✅ Résultat attendu : Python 3.11.x\n\n2. python\n   ✅ Ouvre l\'interpréteur Python (>>>)\n   ✅ Tapez exit() pour quitter\n\n3. pip --version\n   ✅ Vérifie que pip est installé\n\n❌ Si "python n\'est pas reconnu" :\n→ Redémarrez votre ordinateur\n→ Réinstallez en cochant "Add to PATH"'
      },
      {
        numero: 4,
        titre: 'Installer Visual Studio Code',
        description: 'VS Code est l\'éditeur de code le plus populaire. Téléchargez-le depuis code.visualstudio.com',
        details: '🌐 Lien : https://code.visualstudio.com/\n\n📥 Installation :\n1️⃣ Téléchargez "User Installer" (70 MB)\n2️⃣ Lancez l\'installateur\n3️⃣ Acceptez les conditions\n4️⃣ Cochez toutes les options :\n   ✅ Ajouter au PATH\n   ✅ Créer une icône sur le bureau\n   ✅ Ajouter au menu contextuel\n5️⃣ Cliquez sur "Installer"\n\n⏱️ Temps d\'installation : 2-3 minutes\n\n🎨 Pourquoi VS Code ?\n• Gratuit et open source\n• Extensions puissantes\n• Débogueur intégré\n• Terminal intégré\n• Autocomplétion intelligente'
      },
      {
        numero: 5,
        titre: 'Configurer VS Code pour Python',
        description: 'Installez l\'extension Python officielle de Microsoft pour bénéficier de toutes les fonctionnalités.',
        details: '🔌 Installation de l\'extension :\n\n1️⃣ Ouvrez VS Code\n2️⃣ Cliquez sur l\'icône Extensions (carré avec 4 carrés)\n   Ou : Ctrl + Shift + X\n3️⃣ Recherchez "Python"\n4️⃣ Cliquez sur "Python" par Microsoft\n5️⃣ Cliquez sur "Install"\n\n✨ Fonctionnalités ajoutées :\n• Coloration syntaxique\n• Autocomplétion (IntelliSense)\n• Débogage pas à pas\n• Linting (détection d\'erreurs)\n• Formatage automatique\n• Exécution de code\n\n🎯 Extensions bonus recommandées :\n• Pylance : meilleure autocomplétion\n• Python Indent : indentation automatique\n• autoDocstring : génère la documentation'
      },
      {
        numero: 6,
        titre: 'Créer votre Premier Fichier Python',
        description: 'Créez un dossier pour vos projets Python et votre premier fichier .py',
        details: '📁 Organisation recommandée :\n\nC:\\Users\\VotreNom\\Documents\\Python\n├── projet1\n│   └── hello.py\n├── projet2\n└── exercices\n\n🔨 Créer un fichier :\n\n1️⃣ Dans VS Code : File > Open Folder\n2️⃣ Créez un dossier "MesProjets Python"\n3️⃣ File > New File\n4️⃣ Sauvegardez : Ctrl + S\n5️⃣ Nommez : hello.py\n\n💡 L\'extension .py indique un fichier Python\n\n✍️ Tapez ce code :\n\nprint("Bonjour, je programme en Python !")\nnom = input("Quel est votre nom ? ")\nprint(f"Enchanté {nom} !")\n\n▶️ Exécuter : Clic droit > Run Python File'
      }
    ],
    id_chapitre: 1
  },
  {
    id_contenu: 3,
    type: 'GUIDE',
    titre: 'Les Variables en Python - Guide Complet',
    logiciels: ['Python 3.11+', 'VS Code'],
    etapes: [
      {
        numero: 1,
        titre: 'Qu\'est-ce qu\'une Variable ?',
        description: 'Une variable est comme une boîte qui stocke une valeur. Vous pouvez y mettre des nombres, du texte, etc.',
        details: '📦 Analogie de la boîte :\n\nImaginez une boîte avec une étiquette :\n• L\'étiquette = nom de la variable\n• Le contenu = valeur de la variable\n\n💡 Exemple concret :\n\nage = 25\n\n🔍 Explication :\n• "age" : nom de la variable (l\'étiquette)\n• "=" : opérateur d\'affectation (on met dans la boîte)\n• "25" : valeur stockée (le contenu)\n\n✨ Avantage : On peut réutiliser "age" partout !\n\nprint(age)        # Affiche : 25\nprint(age + 5)    # Affiche : 30\nprint(age * 2)    # Affiche : 50'
      },
      {
        numero: 2,
        titre: 'Les Règles de Nommage',
        description: 'En Python, il y a des règles strictes pour nommer les variables. Respectez-les pour éviter les erreurs !',
        details: '✅ AUTORISÉ :\n• Lettres : a-z, A-Z\n• Chiffres : 0-9 (mais pas au début !)\n• Underscore : _\n\nExemples valides :\nnom\nprenom\nage_utilisateur\nnombre1\n_variable_privee\nNOM (mais évitez les majuscules)\n\n❌ INTERDIT :\n• Commencer par un chiffre : 1nom ❌\n• Espaces : mon nom ❌\n• Caractères spéciaux : nom@user ❌\n• Mots réservés : if, for, while ❌\n\n🎯 Conventions (bonnes pratiques) :\n• snake_case : mon_age_actuel ✅\n• Descriptif : age (pas x) ✅\n• Minuscules : age (pas AGE) ✅\n• Anglais : age (pas âge) ✅'
      },
      {
        numero: 3,
        titre: 'Les Types de Données',
        description: 'Python a plusieurs types de données. Chaque type a ses propres caractéristiques et utilisations.',
        details: '📊 Les 4 types principaux :\n\n1️⃣ INTEGER (int) - Nombres entiers\nage = 25\nannee = 2024\ntemperature = -5\n\n2️⃣ FLOAT - Nombres décimaux\nprix = 19.99\ntaille = 1.75\npi = 3.14159\n\n3️⃣ STRING (str) - Texte\nnom = "Jean"\nville = \'Antananarivo\'\nmessage = """Texte\nsur plusieurs\nlignes"""\n\n4️⃣ BOOLEAN (bool) - Vrai/Faux\nest_majeur = True\nest_connecte = False\n\n🔍 Vérifier le type :\nprint(type(age))      # <class \'int\'>\nprint(type(prix))     # <class \'float\'>\nprint(type(nom))      # <class \'str\'>\nprint(type(est_majeur)) # <class \'bool\'>'
      },
      {
        numero: 4,
        titre: 'Exemples Pratiques avec Variables',
        description: 'Voyons des exemples concrets d\'utilisation des variables dans des situations réelles.',
        details: '💼 Exemple 1 : Calculer un âge\n\nannee_naissance = 1998\nannee_actuelle = 2024\nage = annee_actuelle - annee_naissance\nprint(f"Vous avez {age} ans")\n# Résultat : Vous avez 26 ans\n\n💰 Exemple 2 : Calculer un prix TTC\n\nprix_ht = 100\ntva = 0.20  # 20%\nprix_ttc = prix_ht * (1 + tva)\nprint(f"Prix TTC : {prix_ttc}€")\n# Résultat : Prix TTC : 120.0€\n\n📏 Exemple 3 : Convertir des unités\n\nkilometres = 5\nmetres = kilometres * 1000\nprint(f"{kilometres}km = {metres}m")\n# Résultat : 5km = 5000m\n\n👤 Exemple 4 : Informations utilisateur\n\nprenom = "Marie"\nnom = "Rakoto"\nnom_complet = prenom + " " + nom\nprint(f"Bienvenue {nom_complet} !")\n# Résultat : Bienvenue Marie Rakoto !'
      },
      {
        numero: 5,
        titre: 'Modifier et Réutiliser les Variables',
        description: 'Les variables peuvent changer de valeur. C\'est tout l\'intérêt ! Voyons comment les manipuler.',
        details: '🔄 Modifier une variable :\n\ncompteur = 0\nprint(compteur)  # 0\n\ncompteur = 5\nprint(compteur)  # 5\n\ncompteur = compteur + 1\nprint(compteur)  # 6\n\n✨ Raccourcis pratiques :\n\ncompteur += 1   # Ajoute 1 (équivalent à compteur = compteur + 1)\ncompteur -= 2   # Soustrait 2\ncompteur *= 3   # Multiplie par 3\ncompteur /= 2   # Divise par 2\n\n🎯 Exemple concret : Panier d\'achat\n\ntotal = 0\nprint(f"Total : {total}€")\n\n# Ajouter un article\ntotal += 15.99\nprint(f"Total : {total}€")  # 15.99€\n\n# Ajouter un autre article\ntotal += 29.99\nprint(f"Total : {total}€")  # 45.98€\n\n# Appliquer une réduction de 10%\ntotal *= 0.9\nprint(f"Total après réduction : {total}€")  # 41.38€'
      },
      {
        numero: 6,
        titre: 'Exercices Pratiques',
        description: 'Testez vos connaissances avec ces exercices. Essayez de les faire avant de regarder les solutions !',
        details: '📝 Exercice 1 : Calculer une moyenne\n\nCréez 3 variables pour 3 notes, calculez la moyenne.\n\n💡 Solution :\nnote1 = 15\nnote2 = 12\nnote3 = 18\nmoyenne = (note1 + note2 + note3) / 3\nprint(f"Moyenne : {moyenne}")\n\n📝 Exercice 2 : Échanger deux variables\n\nÉchangez les valeurs de a et b.\n\n💡 Solution :\na = 5\nb = 10\nprint(f"Avant : a={a}, b={b}")\n\n# Méthode Python (élégante)\na, b = b, a\nprint(f"Après : a={a}, b={b}")\n\n📝 Exercice 3 : Calculer l\'IMC\n\nIMC = poids / (taille²)\n\n💡 Solution :\npoids = 70  # kg\ntaille = 1.75  # m\nimc = poids / (taille ** 2)\nprint(f"Votre IMC : {imc:.2f}")\n# .2f = 2 chiffres après la virgule'
      }
    ],
    id_chapitre: 2
  }
]

export const mockQuizzes = [
  {
    id_quiz: 1,
    titre: 'Quiz - Bases de Python',
    id_cours: 1
  },
  {
    id_quiz: 2,
    titre: 'Quiz - Variables et Types',
    id_cours: 1
  }
]

export const mockQuestions = [
  {
    id_question: 1,
    libelle: 'Quel est le type de données pour stocker du texte en Python ?',
    id_quiz: 1,
    options: [
      { id_option: 1, libelle: 'int', est_correct: false },
      { id_option: 2, libelle: 'str', est_correct: true },
      { id_option: 3, libelle: 'float', est_correct: false },
      { id_option: 4, libelle: 'bool', est_correct: false }
    ]
  },
  {
    id_question: 2,
    libelle: 'Comment afficher "Hello World" en Python ?',
    id_quiz: 1,
    options: [
      { id_option: 5, libelle: 'echo("Hello World")', est_correct: false },
      { id_option: 6, libelle: 'print("Hello World")', est_correct: true },
      { id_option: 7, libelle: 'console.log("Hello World")', est_correct: false },
      { id_option: 8, libelle: 'printf("Hello World")', est_correct: false }
    ]
  },
  {
    id_question: 3,
    libelle: 'Quelle est la bonne syntaxe pour créer une liste en Python ?',
    id_quiz: 1,
    options: [
      { id_option: 9, libelle: 'list = (1, 2, 3)', est_correct: false },
      { id_option: 10, libelle: 'list = [1, 2, 3]', est_correct: true },
      { id_option: 11, libelle: 'list = {1, 2, 3}', est_correct: false },
      { id_option: 12, libelle: 'list = <1, 2, 3>', est_correct: false }
    ]
  }
]

export const mockAssignments = [
  {
    id_devoir: 1,
    titre: 'Projet - Calculatrice Python',
    description: 'Créez une calculatrice simple en Python qui peut effectuer les 4 opérations de base',
    date_limite: '2024-12-31T23:59:59',
    id_cours: 1
  },
  {
    id_devoir: 2,
    titre: 'Exercice - Manipulation de Listes',
    description: 'Résolvez les 10 exercices sur les listes Python',
    date_limite: '2024-12-25T23:59:59',
    id_cours: 1
  }
]

export const mockMessages = [
  {
    id_message: 1,
    contenu: 'Bonjour, j\'ai une question sur le chapitre 3',
    date_envoi: '2024-11-20T10:30:00',
    id_expediteur: 2,
    id_destinataire: 1
  },
  {
    id_message: 2,
    contenu: 'Bien sûr, quelle est votre question ?',
    date_envoi: '2024-11-20T10:35:00',
    id_expediteur: 1,
    id_destinataire: 2
  }
]

export const mockConversations = [
  {
    id_user: 1,
    nom: 'Rakoto',
    prenom: 'Jean',
    role: 'TEACHER'
  },
  {
    id_user: 3,
    nom: 'Rabe',
    prenom: 'Marie',
    role: 'STUDENT'
  }
]

export const mockStats = {
  student: {
    enrolledCourses: 4,
    completedCourses: 1,
    inProgressCourses: 3,
    totalProgress: 37
  },
  teacher: {
    totalCourses: 3,
    totalStudents: 437,
    pendingAssignments: 12
  },
  admin: {
    totalUsers: 1247,
    totalCourses: 45,
    totalStudents: 1089,
    totalTeachers: 34
  }
}

export const mockUser = {
  id_user: 1,
  nom: 'Randria',
  prenom: 'Paul',
  email: 'paul.randria@email.com',
  role: 'STUDENT'
}

// Fonction pour simuler un délai réseau
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))
