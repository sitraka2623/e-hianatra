import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function addDemoData() {
  console.log('\n📊 Ajout de données de démonstration\n');

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

    // Créer un utilisateur enseignant
    const hashedPassword = await bcrypt.hash('password123', 10);
    const [userResult] = await connection.query(
      'INSERT INTO utilisateur (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)',
      ['Dupont', 'Jean', 'prof@ehianatra.mg', hashedPassword, 'TEACHER']
    );
    const teacherId = userResult.insertId;
    console.log('✅ Enseignant créé: prof@ehianatra.mg / password123');

    // Créer des cours de démonstration
    const courses = [
      {
        titre: 'Introduction à la Programmation Python',
        description: 'Apprenez les bases de Python, un langage puissant et facile à apprendre.',
        categorie: 'Programmation'
      },
      {
        titre: 'Développement Web avec React',
        description: 'Maîtrisez React.js et créez des applications web modernes.',
        categorie: 'Développement Web'
      },
      {
        titre: 'Design UI/UX avec Figma',
        description: 'Créez des interfaces utilisateur attrayantes et intuitives.',
        categorie: 'Design'
      },
      {
        titre: 'Intelligence Artificielle et Machine Learning',
        description: 'Découvrez les concepts fondamentaux de l\'IA et du ML.',
        categorie: 'Intelligence Artificielle'
      },
      {
        titre: 'Marketing Digital',
        description: 'Stratégies de marketing en ligne, SEO et réseaux sociaux.',
        categorie: 'Marketing'
      }
    ];

    for (const course of courses) {
      await connection.query(
        'INSERT INTO cours (titre, description, categorie, id_enseignant) VALUES (?, ?, ?, ?)',
        [course.titre, course.description, course.categorie, teacherId]
      );
      console.log(`✅ Cours créé: ${course.titre}`);
    }

    console.log('\n🎉 Données de démonstration ajoutées avec succès!\n');
    console.log('Vous pouvez maintenant vous connecter avec:');
    console.log('  Email: prof@ehianatra.mg');
    console.log('  Mot de passe: password123\n');

    await connection.end();

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  } finally {
    rl.close();
  }
}

addDemoData();
