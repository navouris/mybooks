# myBooks - παράδειγμα εφαρμογής CRUD σε Nodejs/Express με SQlite και MongoDB

## εγκατάσταση
δημιουργήστε φάκελο mybooks
αποσυμπιέστε το αρχείο στον φάκελο και στη συνέχεια
τρέξτε 
> npm install
(θα δημιουργήσει τον φάκελο node_modules με τα εξαρτήματα του πρότζεκτ)
θα πάρει κάποιο χρόνο για την ολοκλήρωση της εγκατάστασης.

στη συνέχεια 
τρέξτε από το τερματικό σας:

> nodemon index.js

## σύνδεση με sqlite3

Η κώδικας στην αρχική του μορφή συνδέει τον εξυπηρετητή με τη βάση δεδομένων sqlite3. 

Μπορείτε να χρησιμοποιήσετε το εργαλείο DB Browser for sqlite για να επικοινωνήσετε με τη βάση δεδομένων /data/books.db

- Επιλέξτε 'βιβλία...' από το μενού για να δείτε τα βιβλία σας και να τα τροποποιήσετε/ εισάγετε νέα.

## σύνδεση με mondodb

Ακολουθείστε τις οδηγίες του μαθήματος για δημιουργία βάσης δεδομένων σε cluster της [atlas mongodb](https://cloud.mongodb.com/) 

Αντιγράφετε το connection string και το εισάγετε στο αρχείο .env στη μεταβλητή 

```
MONGO_CONNECTION=mongodb+srv:// ... 
```

Θα πρέπει στο αρχείο routes/router.mjs να απενεργοποιήσετε τις γραμμές 4-13 που αφορούν σε σύνδεση με την sqlite3, και να ανεργοποιήσετε τις γραμμές 16-25 που αφορούν σε σύνδεση με την mongodb.

