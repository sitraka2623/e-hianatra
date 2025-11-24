import mysql from 'mysql2/promise';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function verifyTables() {
  console.log('\n🔍 Vérification des tables Railway\n');

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

    // Lister toutes les tables
    const [tables] = await connection.query('SHOW TABLES');
    
    console.log('📊 Tables trouvées dans la base de données:\n');
    
    if (tables.length === 0) {
      console.log('❌ Aucune table trouvée!\n');
    } else {
      const tableNames = tables.map(t => Object.values(t)[0]);
      
      const expectedTables = [
        'utilisateur',
        'cours',
        'chapitre',
        'quiz',
        'questions_quiz',
        'reponses_quiz',
        'devoirs',
        'soumissions_devoirs',
        'messages',
        'inscriptions',
        'progression'
      ];
      
      console.log(`Total: ${tableNames.length} tables\n`);
      
      expectedTables.forEach(tableName => {
        if (tableNames.includes(tableName)) {
          console.log(`✅ ${tableName}`);
        } else {
          console.log(`❌ ${tableName} - MANQUANTE`);
        }
      });
      
      // Tables supplémentaires non attendues
      const extraTables = tableNames.filter(t => !expectedTables.includes(t));
      if (extraTables.length > 0) {
        console.log('\n📝 Tables supplémentaires:');
        extraTables.forEach(t => console.log(`   • ${t}`));
      }
      
      console.log('\n');
      
      // Vérifier l'encodage
      const [charset] = await connection.query(
        `SELECT DEFAULT_CHARACTER_SET_NAME, DEFAULT_COLLATION_NAME 
         FROM information_schema.SCHEMATA 
         WHERE SCHEMA_NAME = ?`,
        [database.trim()]
      );
      
      if (charset.length > 0) {
        console.log('🔤 Encodage de la base de données:');
        console.log(`   Charset: ${charset[0].DEFAULT_CHARACTER_SET_NAME}`);
        console.log(`   Collation: ${charset[0].DEFAULT_COLLATION_NAME}`);
        
        if (charset[0].DEFAULT_CHARACTER_SET_NAME === 'utf8mb4') {
          console.log('   ✅ UTF-8 correctement configuré!\n');
        } else {
          console.log('   ⚠️  UTF-8 non configuré correctement\n');
        }
      }
    }

    await connection.end();

  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
  } finally {
    rl.close();
  }
}

verifyTables();
