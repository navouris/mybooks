import express from "express";
import exphbs from "express-handlebars";
import path from "path";
import session from "express-session";
import dotenv from "dotenv"; 

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

//import * as model from './model/model_fs.js'; ////// first attempt with plain JSON file
import * as model from './model/model_lite.mjs'; ////// second attempt with sqlite3
// import * as model from './model/model_pg.js'; ////// third attempt with postgresql
////

// Δημιουργία εξυπηρετητή Express
const app = express();

// Διαμόρφωση του εξυπηρετητή - μηχανής handlebars
app.engine('hbs', exphbs.engine({extname: 'hbs', defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Προσθήκη του express-session middleware
app.use(session({
  name: process.env.SESS_NAME,
  secret: process.env.SESSION_SECRET || "PynOjAuHetAuWawtinAytVunar", // κλειδί για κρυπτογράφηση του cookie
  resave: false, // δεν χρειάζεται να αποθηκεύεται αν δεν αλλάξει
  saveUninitialized: false, // όχι αποθήκευση αν δεν έχει αρχικοποιηθεί
  cookie: {
    maxAge: 2*60*60*1000, //TWO_HOURS χρόνος ζωής του cookie σε ms
    sameSite: true
  }
}));

//// ROUTES //////
import {router} from './routes/router.mjs'; // import the router from router.mjs

app.use("^/$|/index(.html)?", router);
app.post("/", router);
app.get("/about", router);
app.get("/books", router);
app.get("/create", router);
app.post("/create", router);
app.get("/edit/:bookID", router);
app.post("/edit/:bookID", router);
app.get("/delete/:bookID", router);
app.post("/delete/:bookID", router);
app.get("/logout", router);

// GET /stats
// εδώ να προστεθεί κώδικας που θα πρέπει να είναι μόνο προσβάσιμος αν
// ο χρήστης λέγεται admin


console.log(process.env.PORT)
// Εκκίνηση του εξυπηρετητή
const PORT = process.env.PORT || 3003
app.listen(PORT, ()=> {
    console.log(`Συνδεθείτε στη σελίδα: http://localhost:${PORT}`);
});

