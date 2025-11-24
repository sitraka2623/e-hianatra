import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Interface pour lire les entrées utilisateur
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function initDatabase() {
  console.log('\n🚀 Initialisation de la base de données Railway\n');

  try {
    // Demander les informations de connexion
    console.log('Entrez les informations de connexion Railway:\n');
    
    const host = await question('MYSQLHOST (ex: monorail.proxy.rlwy.net): ');
    const user = await question('MYSQLUSER (généralement "root"): ');
    const password = await question('MYSQLPASSWORD: ');
    const database = await question('MYSQLDATABASE (généralement "railway"): ');
    const port = await question('MYSQLPORT (généralement "3306"): ');

    console.log('\n📡 Connexion à Railway...');

    // Créer la connexion
    const connection = await mysql.createConnection({
      host: host.trim(),
      user: user.trim(),
      password: password.trim(),
      database: database.trim(),
      port: parseInt(port.trim()),
      multipleStatements: true
    });

    console.log('✅ Connecté à Railway!\n');

    // Lire le fichier SQL
    const sqlFile = path.join(__dirname, '..', 'database.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');

    console.log('📄 Exécution du script database.sql...\n');

    // Exécuter le script SQL
    await connection.query(sql);

    console.log('✅ Base de données initialisée avec succès!\n');
    console.log('Tables créées:');
    console.log('  ✓ utilisateurs');
    console.log('  ✓ cours');
    console.log('  ✓ chapitres');
    console.log('  ✓ quiz');
    console.log('  ✓ questions_quiz');
    console.log('  ✓ reponses_quiz');
    console.log('  ✓ devoirs');
    console.log('  ✓ soumissions_devoirs');
    console.log('  ✓ messages');
    console.log('  ✓ inscriptions');
    console.log('  ✓ progression');

    await connection.end();
    console.log('\n🎉 Terminé! Votre base de données est prête.\n');

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    console.error('\nVérifiez que:');
    console.error('  - Les informations de connexion sont correctes');
    console.error('  - Railway autorise les connexions externes');
    console.error('  - Votre connexion internet fonctionne\n');
  } finally {
    rl.close();
  }
}

initDatabase();
