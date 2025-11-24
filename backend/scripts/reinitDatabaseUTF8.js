import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function reinitDatabase() {
  console.log('\n🔄 Réinitialisation de la base de données avec UTF-8\n');

  try {
    console.log('Entrez les informations de connexion Railway:\n');
    
    const host = await question('MYSQLHOST: ');
    const user = await question('MYSQLUSER: ');
    const password = await question('MYSQLPASSWORD: ');
    const database = await question('MYSQLDATABASE: ');
    const port = await question('MYSQLPORT: ');

    console.log('\n📡 Connexion à Railway...');

    // Connexion sans spécifier la base de données
    const connection = await mysql.createConnection({
      host: host.trim(),
      user: user.trim(),
      password: password.trim(),
      port: parseInt(port.trim()),
      charset: 'utf8mb4'
    });

    console.log('✅ Connecté!\n');

    // Supprimer l'ancienne base
    console.log('🗑️  Suppression de l\'ancienne base de données...');
    await connection.query(`DROP DATABASE IF EXISTS ${database.trim()}`);
    
    // Créer la nouvelle base avec UTF-8
    console.log('📦 Création de la nouvelle base avec UTF-8...');
    await connection.query(`CREATE DATABASE ${database.trim()} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    
    // Utiliser la nouvelle base
    await connection.query(`USE ${database.trim()}`);

    // Lire et exécuter le script SQL propre
    const sqlFile = path.join(__dirname, '..', 'database-clean.sql');
    let sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Retirer les lignes CREATE DATABASE et USE car on l'a déjà fait
    sql = sql.replace(/CREATE DATABASE.*?;/gi, '');
    sql = sql.replace(/USE.*?;/gi, '');
    
    // Séparer les requêtes et les exécuter une par une
    const queries = sql
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0 && !q.startsWith('--'));

    console.log('📄 Exécution du script database.sql...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (const query of queries) {
      if (query.trim()) {
        try {
          await connection.query(query);
          successCount++;
        } catch (err) {
          // Ignorer les erreurs de tables inexistantes (DROP, ALTER, etc.)
          if (!err.message.includes("doesn't exist") && 
              !err.message.includes("Unknown table") &&
              !err.message.includes("Can't DROP")) {
            console.error('⚠️  Erreur ignorée:', err.message.substring(0, 100));
            errorCount++;
          }
        }
      }
    }
    
    console.log(`\n✅ ${successCount} requêtes exécutées avec succès`);
    if (errorCount > 0) {
      console.log(`⚠️  ${errorCount} erreurs ignorées`);
    }

    console.log('✅ Base de données réinitialisée avec succès!\n');
    console.log('Encodage: UTF-8 (utf8mb4)');
    console.log('Les accents français fonctionneront correctement maintenant! 🇫🇷\n');

    await connection.end();

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  } finally {
    rl.close();
  }
}

reinitDatabase();
