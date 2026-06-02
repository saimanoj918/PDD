const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./prisma/dev.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
        process.exit(1);
    }
});

const exportData = {};

db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", function (err, tables) {
        if (err) throw err;
        let tablesProcessed = 0;
        
        tables.forEach(function (table) {
            db.all(`SELECT * FROM ${table.name}`, function (err, rows) {
                if (err) throw err;
                exportData[table.name] = rows;
                tablesProcessed++;
                
                if (tablesProcessed === tables.length) {
                    fs.writeFileSync('./old_database_backup.json', JSON.stringify(exportData, null, 2));
                    console.log("Successfully exported old database to old_database_backup.json");
                    db.close();
                }
            });
        });
    });
});
