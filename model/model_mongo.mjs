import dotenv from "dotenv"; 
import mongoose from "mongoose";

dotenv.config();

// Connect to mongodb
async function connectDB(){
  try {
      await mongoose.connect(process.env.MONGO_CONNECTION, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true });
      mongoose.set('debug', true)
  } catch(err) {
      console.error(err)
  }
}

await connectDB()
const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () =>{
  console.log("Connected successfully");
});

// MONGOOSE schemata and model definition for books and users

const bookSchema = new mongoose.Schema(
    {title: String,
    author: String,
    comment: String,
    });

const userSchema = new mongoose.Schema(
  {userName: String,
  books: [bookSchema]});

const Book = await new mongoose.model("Book", bookSchema, "books")
const User = await new mongoose.model("User", userSchema, "users")

// Interface to the database

async function getMyBooks (userID) {
  // ανάκτηση όλων των βιβλίων του χρήστη από τη βάση δεδομένων
  try{
    const theUser = await User.findOne({_id: userID})
    console.log('the User is ...', theUser)
    return theUser.books
  } catch(err) {  
    console.error(err)
  }
}

async function newBook (book, userID) {
  console.log('to insert...', book)
  try {
    const theBook = Book(book)
    await User.findOneAndUpdate({_id: userID}, {$push: {"books": theBook}})
    console.log('book inserted')
  } catch(err) {
    console.error(err)
  }
}

async function findBook (bookID, userID) {
  console.log('findbook', bookID, userID)
  try {
    const theUser = await User.findOne( {_id: userID, "books._id": bookID})
    console.log('theUser books are ...', theUser.books)
    return theUser.books.filter(book => book._id == bookID)
  } catch(err) {
    console.error(err)
  }
}

async function updateBook (book, userID) {
  console.log('book to update is ...', book)
  const theBook = Book(book)
  console.log('theBook to update is ...', theBook)
  try {
    const theUser = await User.findOne({_id: userID});
    console.log('theUser...', theUser)
    // to be checked
    const theBooks = theUser.books.map(item => item._id.toString() == theBook._id.toString() ? theBook : item)
    console.log('theBooks updated...', theBooks)
    const result = await User.findOneAndUpdate({_id: userID}, {$set: {"books": theBooks}})
    console.log('book updated', result)
  } catch(err) {
    console.error(err)
  }
}

async function deleteBook (bookID, userID)  {
  console.log('book to delete is ...', bookID)
  try {
    const theUser = await User.findOne({_id: userID});
    console.log('theUser...', theUser)
    const theBooks = theUser.books.filter(item => item._id.toString()  != bookID.toString() )
    console.log('theBooks after deletion...', theBooks)
    const result = await User.findOneAndUpdate({_id: userID}, {$set: {"books": theBooks}}, {new: true})
    console.log('book updated', result)
  } catch(err) {
    console.error(err)
  }
}

async function insertUser (user) {
  // εισαγωγή νέου χρήστη στη βάση δεδομένων
  try {
    console.log(user, typeof(user))
    const theUser = User({"userName": user})
    await theUser.save()
    console.log('user inserted')
    return await User.findOne({"userName": user}); // return the inserted user
  } catch(err){
    return console.error(err)
  }
}

async function findUser (userID=null, userName=null) {
  // εύρεση χρήστη με βάση τον κωδικό ή το όνομά του.
  // χωρίς μυστικό κωδικό για λόγους απλότητας
  if (userID) {
    try {
      const result = await User.findOne({_id: userID})
      return result
    } catch(err) {
      console.error(err)
    }
  } else {
    const result = await User.findOne({"userName": userName})
    if (!result) {
      // ο χρήστης δεν υπάρχει, πρέπει να δημιουργηθεί
      const newUser = new User({"userName": userName})
      try {
        await newUser.save()
        console.log('new user inserted')
        return await findUser(null, userName)
      } catch(err) {
        console.error(err)
      }
    } else {
      return result
    } 
  }
}


// Test code for mongodb

// const book = new Book({'title': "Poems", 'authors': "Cavafy", 'comments': "wonderful"})
// const user = new User({'userName': "Γιώργος", 'books': [book]})

// try {
//   const result = await insertUser(user)
//   console.log(result)
// } catch(err) {
//   console.error(err)
// }

// try {
//   const result = await findUser(null, "Kostas")
//   console.log(result)
// } catch(err) {
//   console.error(err)
// }


// exports

export {getMyBooks, newBook, findBook, updateBook, deleteBook, insertUser, findUser};
 