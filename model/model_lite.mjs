import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db_name = path.join(__dirname, "../data", "books.db");

const getMyBooks = (userID, callback) => {
    // ανάκτηση όλων των βιβλίων του χρήστη από τη βάση δεδομένων
    const sql = "SELECT * FROM Books WHERE user = ? ORDER BY title";
    const db = new sqlite3.Database(db_name);
    db.all(sql, [userID], (err, rows) => {
    if (err) {
        db.close();
        callback(err, null);
    }
    db.close();
    callback(null, rows); // επιστρέφει array
});
}

const newBook = (book, callback) => {
    console.log('to insert...', book)
    const sql = "INSERT INTO Books (title, author, comment, user)  VALUES (?, ?, ?, ?);";
    const db = new sqlite3.Database(db_name);
    db.run(sql, [book.title, book.author, book.comment, book.user], (err, result) => {
        db.close();
        if (err) {
            callback(err, null)}
        else callback(null, result)
    });
}

const findBook = (bookID, callback) => {
    console.log('findbook', bookID)
    const sql = "SELECT * FROM Books WHERE bookID = ?";
    const db = new sqlite3.Database(db_name);
    db.get(sql, [bookID], (err, row) => {
        db.close();
        if (err) {
            callback(err, null)}
        else {
            console.log('findbook, row=', row)
            callback(null, [row])}
    });
}

const updateBook = (book, callback) => {
    const sql = `UPDATE Books 
        SET title = ?, author = ?, comment = ? 
        WHERE (bookID = ?)`;
    let db = new sqlite3.Database(db_name, (err) => {
        if (err) {
        callback(err, null)
      }
      console.log("Σύνδεση στη βάση δεδομένων 'books.db'");
      db.run(sql, [book.title, book.author, book.comment, book.bookID], (err) => {
          db.close();
          if (err) {
            callback(err, null)
        }
        console.log(`Row(s) updated`);
        callback(null, 1)
      });
    });
}

const deleteBook = (bookID, callback) => {
    const sql = `DELETE FROM Books
        WHERE  bookID = ?`;
    let db = new sqlite3.Database(db_name, (err) => {
        if (err) {
        callback(err, null)
      }
      console.log("Σύνδεση στη βάση δεδομένων 'books.db'");
      db.run(sql, [bookID], (err) => {
          db.close();
          if (err) {
            callback(err)
        }
        console.log(`Book deleted ...`);
      });
    });
}

const insertUser = (userName, callback) => {
    // εισαγωγή νέου χρήστη, και επιστροφή στο callback της νέας εγγραφής
    const sql = "INSERT INTO Users(userName) VALUES (?)"
    const db = new sqlite3.Database(db_name);
    db.run(sql, [userName], function (err, row){
        if (err) {
            db.close();
            callback(err, null)
        }
        db.close();
        console.log('1 new user inserted', this.lastID);
        callback(null, [{"userID":this.lastID, "userName": userName}]); 
    });
}

const findUser = (userID=null, userName=null, callback) => {
    // εύρεση χρήστη με βάση τον κωδικό ή το όνομά του.
    // χωρίς μυστικό κωδικό για λόγους απλότητας
    const sql = (userID) ? "SELECT * FROM Users WHERE UserID = ?" : 
        "SELECT * FROM Users WHERE UserName = ?";
    console.log('new sql...', sql)
    const db = new sqlite3.Database(db_name);
    db.all(sql, [userID || userName], (err, row) => {
        console.log("findUser")
        if (err || row.length === 0) {
            // ο χρήστης δεν υπάρχει, πρέπει να δημιουργηθεί
            db.close();
            insertUser(userName, (err, newUser) => {
                console.log("newuser", newUser);
                if (err) {
                    callback(err, null);
                } else
                findUser(userID, userName, callback);
            });
        }
        else {
            db.close();
            callback(null, row)
        }
    });
}

const  query = (text, params, callback) => {
    const db = new sqlite3.Database(db_name);
    return db.query(text, params, callback)
  }

export {getMyBooks, newBook, findBook, updateBook, deleteBook, insertUser, findUser};

