import express from 'express';

// database sqlite
import getUser from '../controllers/sqlite/getUser.mjs';
import getCreateUser from '../controllers/sqlite/getCreateUser.mjs';
import getBooks from '../controllers/sqlite/getBooks.mjs';
import about from '../controllers/sqlite/about.mjs';
import create from '../controllers/sqlite/create.mjs';
import createBook from '../controllers/sqlite/createBook.mjs';
import findBook from '../controllers/sqlite/findBook.mjs';
import updateBook from '../controllers/sqlite/updateBook.mjs';
import findToDeleteBook from '../controllers/sqlite/findToDeleteBook.mjs';
import deleteBook from '../controllers/sqlite/deleteBook.mjs';

// database mongo
// import getUser from '../controllers/mongo/getUser.mjs';
// import getCreateUser from '../controllers/mongo/getCreateUser.mjs';
// import getBooks from '../controllers/mongo/getBooks.mjs';
// import about from '../controllers/mongo/about.mjs';
// import create from '../controllers/mongo/create.mjs';
// import createBook from '../controllers/mongo/createBook.mjs';
// import findBook from '../controllers/mongo/findBook.mjs';
// import updateBook from '../controllers/mongo/updateBook.mjs';
// import findToDeleteBook from '../controllers/mongo/findToDeleteBook.mjs';
// import deleteBook from '../controllers/mongo/deleteBook.mjs';

const router = express.Router();
// const bookList = new BookList();

const redirectHome = (req, res, next) => {
   console.log('redirect...', req.session)
   if (!req.session.userID) {
   res.redirect('/');
   } else {
   next();
   } };

const logout = (req, res) => {
   console.log('logout...', req.session)
   req.session.destroy(err => {
   if (err) {
      return res.redirect('/');
   }
   res.clearCookie('sid');
   res.redirect('/');
   });
};


router.get("/", getUser); // show user if connected
router.post("/", getCreateUser); // get or create user
router.get("/books", redirectHome, getBooks); // GET /books
router.get("/about", about); // GET /about
router.get("/create", redirectHome, create); // GET /create
router.post("/create", redirectHome, createBook);   // POST /create
router.get("/edit/:bookID", redirectHome, findBook); // GET /edit/:bookID
router.post("/edit/:id", redirectHome, updateBook); // POST /edit/:bookID
router.get("/delete/:id", redirectHome, findToDeleteBook);// GET /delete/:bookID
router.post("/delete/:id", deleteBook);  // POST /delete/:bookID
router.get("/logout", logout); // GET /logout

export { router };