const sqlite3: any = require('sqlite3').verbose();
export const db: object = new sqlite3.Database('./db/users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the users database.');
});
