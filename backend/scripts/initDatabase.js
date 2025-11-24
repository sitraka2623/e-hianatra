import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()

const initDatabase = async () => {
  let connection

  try {
    // Connexion sans spécifier la base de données
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    })

    console.log('📦 Création de la base de données...')

    // Créer la base de données
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'e_hianatra'}`)
    await connection.query(`USE ${process.env.DB_NAME || 'e_hianatra'}`)

    console.log('✅ Base de données créée')

    // Créer les tables
    console.log('📋 Création des tables...')

    // Table utilisateur
    await connection.query(`
      CREATE TABLE IF NOT EXISTS utilisateur (
        id_user INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(100) NOT NULL,
        prenom VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        mot_de_passe VARCHAR(255) NOT NULL,
        role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Table cours
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cours (
        id_cours INT PRIMARY KEY AUTO_INCREMENT,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        categorie VARCHAR(100),
        id_enseignant INT,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_enseignant) REFERENCES utilisateur(id_user) ON DELETE SET NULL
      )
    `)

    // Table chapitre
    await connection.query(`
      CREATE TABLE IF NOT EXISTS chapitre (
        id_chapitre INT PRIMARY KEY AUTO_INCREMENT,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        id_cours INT,
        ordre INT DEFAULT 0,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
      )
    `)

    // Table contenu
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contenu (
        id_contenu INT PRIMARY KEY AUTO_INCREMENT,
        type ENUM('VIDEO', 'PDF', 'TEXT') NOT NULL,
        url TEXT NOT NULL,
        id_chapitre INT,
        FOREIGN KEY (id_chapitre) REFERENCES chapitre(id_chapitre) ON DELETE CASCADE
      )
    `)

    // Table quiz
    await connection.query(`
      CREATE TABLE IF NOT EXISTS quiz (
        id_quiz INT PRIMARY KEY AUTO_INCREMENT,
        titre VARCHAR(255) NOT NULL,
        id_cours INT,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
      )
    `)

    // Table question
    await connection.query(`
      CREATE TABLE IF NOT EXISTS question (
        id_question INT PRIMARY KEY AUTO_INCREMENT,
        libelle TEXT NOT NULL,
        id_quiz INT,
        FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz) ON DELETE CASCADE
      )
    `)

    // Table option_question
    await connection.query(`
      CREATE TABLE IF NOT EXISTS option_question (
        id_option INT PRIMARY KEY AUTO_INCREMENT,
        libelle VARCHAR(255) NOT NULL,
        est_correct BOOLEAN DEFAULT FALSE,
        id_question INT,
        FOREIGN KEY (id_question) REFERENCES question(id_question) ON DELETE CASCADE
      )
    `)

    // Table devoir
    await connection.query(`
      CREATE TABLE IF NOT EXISTS devoir (
        id_devoir INT PRIMARY KEY AUTO_INCREMENT,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        date_limite DATETIME,
        id_cours INT,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
      )
    `)

    // Table soumission
    await connection.query(`
      CREATE TABLE IF NOT EXISTS soumission (
        id_soumission INT PRIMARY KEY AUTO_INCREMENT,
        fichier VARCHAR(255),
        note DECIMAL(5,2),
        date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_devoir INT,
        id_etudiant INT,
        FOREIGN KEY (id_devoir) REFERENCES devoir(id_devoir) ON DELETE CASCADE,
        FOREIGN KEY (id_etudiant) REFERENCES utilisateur(id_user) ON DELETE CASCADE
      )
    `)

    // Table messagerie
    await connection.query(`
      CREATE TABLE IF NOT EXISTS messagerie (
        id_message INT PRIMARY KEY AUTO_INCREMENT,
        contenu TEXT NOT NULL,
        date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        id_expediteur INT,
        id_destinataire INT,
        FOREIGN KEY (id_expediteur) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
        FOREIGN KEY (id_destinataire) REFERENCES utilisateur(id_user) ON DELETE CASCADE
      )
    `)

    // Table inscription
    await connection.query(`
      CREATE TABLE IF NOT EXISTS inscription (
        id_inscription INT PRIMARY KEY AUTO_INCREMENT,
        id_cours INT,
        id_etudiant INT,
        date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE,
        FOREIGN KEY (id_etudiant) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
        UNIQUE KEY unique_inscription (id_cours, id_etudiant)
      )
    `)

    console.log('✅ Tables créées')

    // Insérer des données de test
    console.log('📝 Insertion des données de test...')

    const hashedPassword = await bcrypt.hash('password123', 10)

    // Utilisateurs
    await connection.query(`
      INSERT IGNORE INTO utilisateur (id_user, nom, prenom, email, mot_de_passe, role) VALUES
      (1, 'Rakoto', 'Jean', 'student@demo.mg', ?, 'STUDENT'),
      (2, 'Rabe', 'Marie', 'teacher@demo.mg', ?, 'TEACHER'),
      (3, 'Randria', 'Paul', 'admin@demo.mg', ?, 'ADMIN')
    `, [hashedPassword, hashedPassword, hashedPassword])

    // Cours
    await connection.query(`
      INSERT IGNORE INTO cours (id_cours, titre, description, categorie, id_enseignant) VALUES
      (1, 'Introduction à la Programmation Python', 'Apprenez les bases de Python, un langage de programmation puissant et facile à apprendre.', 'Programmation', 2),
      (2, 'Développement Web avec React', 'Maîtrisez React.js et créez des applications web modernes et interactives.', 'Développement Web', 2),
      (3, 'Design UI/UX avec Figma', 'Créez des interfaces utilisateur attrayantes et intuitives.', 'Design', 2)
    `)

    // Chapitres
    await connection.query(`
      INSERT IGNORE INTO chapitre (id_chapitre, titre, description, id_cours, ordre) VALUES
      (1, 'Introduction et Installation', 'Découvrez Python et installez votre environnement', 1, 1),
      (2, 'Variables et Types de Données', 'Apprenez à manipuler les variables', 1, 2),
      (3, 'Structures de Contrôle', 'Conditions, boucles et logique', 1, 3)
    `)

    // Contenus
    await connection.query(`
      INSERT IGNORE INTO contenu (id_contenu, type, url, id_chapitre) VALUES
      (1, 'VIDEO', 'https://www.youtube.com/embed/kqtD5dpn9C8', 1),
      (2, 'TEXT', 'Python est un langage de programmation interprété, orienté objet et de haut niveau.', 1)
    `)

    // Quiz
    await connection.query(`
      INSERT IGNORE INTO quiz (id_quiz, titre, id_cours) VALUES
      (1, 'Quiz - Bases de Python', 1)
    `)

    // Questions
    await connection.query(`
      INSERT IGNORE INTO question (id_question, libelle, id_quiz) VALUES
      (1, 'Quel est le type de données pour stocker du texte en Python ?', 1),
      (2, 'Comment afficher "Hello World" en Python ?', 1)
    `)

    // Options
    await connection.query(`
      INSERT IGNORE INTO option_question (id_option, libelle, est_correct, id_question) VALUES
      (1, 'int', FALSE, 1),
      (2, 'str', TRUE, 1),
      (3, 'float', FALSE, 1),
      (4, 'bool', FALSE, 1),
      (5, 'echo("Hello World")', FALSE, 2),
      (6, 'print("Hello World")', TRUE, 2),
      (7, 'console.log("Hello World")', FALSE, 2),
      (8, 'printf("Hello World")', FALSE, 2)
    `)

    // Devoirs
    await connection.query(`
      INSERT IGNORE INTO devoir (id_devoir, titre, description, date_limite, id_cours) VALUES
      (1, 'Projet - Calculatrice Python', 'Créez une calculatrice simple en Python', '2024-12-31 23:59:59', 1)
    `)

    // Inscriptions
    await connection.query(`
      INSERT IGNORE INTO inscription (id_cours, id_etudiant) VALUES
      (1, 1),
      (2, 1)
    `)

    console.log('✅ Données de test insérées')
    console.log('\n🎉 Base de données initialisée avec succès!')
    console.log('\n📧 Comptes de test créés:')
    console.log('   Étudiant: student@demo.mg / password123')
    console.log('   Enseignant: teacher@demo.mg / password123')
    console.log('   Admin: admin@demo.mg / password123')

  } catch (error) {
    console.error('❌ Erreur:', error.message)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

initDatabase()
