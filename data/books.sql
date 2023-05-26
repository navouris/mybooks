CREATE TABLE IF NOT EXISTS Books (
    bookID INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    comment TEXT,
    user INTEGER
    );
CREATE TABLE IF NOT EXISTS Users (
    userID INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT NOT NULL
    );

INSERT INTO Users(userName) VALUES ("Nikos");

INSERT INTO Books (title, author, comment, user) VALUES
  ('Οι άθλιοι', 'Βίκτωρ Ουγκώ', '', 1);