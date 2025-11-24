import mysql from 'mysql2/promise';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createTables() {
  console.log('\n📊 Création des tables Railway\n');

  try {
    console.log('Entrez les informations de connexion Railway:\n');
    
    const host = await question('MYSQLHOST: ');
    const user = await question('MYSQLUSER: ');
    const password = await question('MYSQLPASSWORD: ');
    const database = await question('MYSQLDATABASE: ');
    const port = await question('MYSQLPORT: ');

    console.log('\n📡 Connexion à Railway...');

    const connection = await mysql.createConnection({
      host: host.trim(),
      user: user.trim(),
      password: password.trim(),
      database: database.trim(),
      port: parseInt(port.trim()),
      charset: 'utf8mb4'
    });

    console.log('✅ Connecté!\n');
    console.log('📄 Création des tables...\n');

    // Créer chaque table une par une
    const tables = [
      `CREATE TABLE IF NOT EXISTS utilisateur (
        id_user INT PRIMARY KEY AUTO_INCREMENT,
        nom VARCHAR(100) NOT NULL,
        prenom VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        mot_de_passe VARCHAR(255) NOT NULL,
        role ENUM('STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'STUDENT',
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS cours (
        id_cours INT PRIMARY KEY AUTO_INCREMENT,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        categorie VARCHAR(100),
        id_enseignant INT,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_enseignant) REFERENCES utilisateur(id_user) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS chapitre (
        id_chapitre INT PRIMARY KEY AUTO_INCREMENT,
        id_cours INT NOT NULL,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        contenu LONGTEXT,
        ordre INT DEFAULT 1,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS quiz (
        id_quiz INT PRIMARY KEY AUTO_INCREMENT,
        id_cours INT NOT NULL,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        duree_minutes INT DEFAULT 30,
        note_passage DECIMAL(5,2) DEFAULT 50.00,
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS questions_quiz (
        id_question INT PRIMARY KEY AUTO_INCREMENT,
        id_quiz INT NOT NULL,
        question TEXT NOT NULL,
        type ENUM('choix_multiple', 'vrai_faux', 'texte') DEFAULT 'choix_multiple',
        points INT DEFAULT 1,
        options JSON,
        reponse_correcte TEXT,
        FOREIGN KEY (id_quiz) REFERENCES quiz(id_quiz) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS reponses_quiz (
        id_reponse INT PRIMARY KEY AUTO_INCREMENT,
        id_question INT NOT NULL,
        id_user INT NOT NULL,
        reponse TEXT,
        est_correcte BOOLEAN DEFAULT FALSE,
        date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_question) REFERENCES questions_quiz(id_question) ON DELETE CASCADE,
        FOREIGN KEY (id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS devoirs (
        id_devoir INT PRIMARY KEY AUTO_INCREMENT,
        id_cours INT NOT NULL,
        titre VARCHAR(255) NOT NULL,
        description TEXT,
        consignes TEXT,
        date_limite DATETIME,
        note_max DECIMAL(5,2) DEFAULT 100.00,
        type_soumission ENUM('texte', 'fichier', 'lien', 'mixte') DEFAULT 'texte',
        date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS soumissions_devoirs (
        id_soumission INT PRIMARY KEY AUTO_INCREMENT,
        id_devoir INT NOT NULL,
        id_user INT NOT NULL,
        contenu TEXT,
        fichier_url VARCHAR(500),
        note DECIMAL(5,2),
        commentaire TEXT,
        date_soumission TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_devoir) REFERENCES devoirs(id_devoir) ON DELETE CASCADE,
        FOREIGN KEY (id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS messages (
        id_message INT PRIMARY KEY AUTO_INCREMENT,
        id_expediteur INT NOT NULL,
        id_destinataire INT NOT NULL,
        sujet VARCHAR(255),
        contenu TEXT,
        lu BOOLEAN DEFAULT FALSE,
        date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_expediteur) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
        FOREIGN KEY (id_destinataire) REFERENCES utilisateur(id_user) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS inscriptions (
        id_inscription INT PRIMARY KEY AUTO_INCREMENT,
        id_user INT NOT NULL,
        id_cours INT NOT NULL,
        date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        statut ENUM('active', 'terminee', 'abandonnee') DEFAULT 'active',
        FOREIGN KEY (id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
        FOREIGN KEY (id_cours) REFERENCES cours(id_cours) ON DELETE CASCADE,
        UNIQUE KEY unique_inscription (id_user, id_cours)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
      
      `CREATE TABLE IF NOT EXISTS progression (
        id_progression INT PRIMARY KEY AUTO_INCREMENT,
        id_user INT NOT NULL,
        id_chapitre INT NOT NULL,
        termine BOOLEAN DEFAULT FALSE,
        date_completion TIMESTAMP NULL,
        FOREIGN KEY (id_user) REFERENCES utilisateur(id_user) ON DELETE CASCADE,
        FOREIGN KEY (id_chapitre) REFERENCES chapitre(id_chapitre) ON DELETE CASCADE,
        UNIQUE KEY unique_progression (id_user, id_chapitre)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`
    ];

    const tableNames = ['utilisateur', 'cours', 'chapitre', 'quiz', 'questions_quiz', 
                       'reponses_quiz', 'devoirs', 'soumissions_devoirs', 'messages', 
                       'inscriptions', 'progression'];

    for (let i = 0; i < tables.length; i++) {
      await connection.query(tables[i]);
      console.log(`✅ Table ${tableNames[i]} créée`);
    }

    console.log('\n🎉 Toutes les tables ont été créées avec succès!\n');

    await connection.end();

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  } finally {
    rl.close();
  }
}

createTables();
