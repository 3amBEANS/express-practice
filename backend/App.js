
const express=require('express');
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
const app = express();
const cors = require("cors");
const port=5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.post('/create', async (req, res) => {
    try{
        const id = req.body.name;
        const userJson = {
            name: req.body.name,
            message: req.body.message
        };
       await db.collection("messages").doc(id).set(userJson)
       res.status(200).send({ success: true, message: "Document created successfully" });
       res.status(404).send({what: "why is this going wrong,"})
        //res.send(response);
        //await addDoc(collection(db, 'messages')), userJson);
    }catch(e){
        console.log("there was an issue: ", e);
        res.status(500).send({ success: false, message: "Error writing document" });
    }
})

app.get('/read/all', async (req, res) => {
    try{
        const usersRef = db.collection("messages");
        const response = await usersRef.get();
        responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    }
    catch(e){
        console.log("there was an issue: ", e);
        res.status(500).send({ success: false, message: "Error writing document" , error: e});
    }

})









//example of get requests.
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get("/posts", (req, res) => {
//     let ret = [];
//     // Do things to get the data...
//     // Send the data array as a JSON response

//     db.
//     res.status(200).json(ret);
// });

// app.get("/posts/:id", (req, res) => {
//     const id = req.params.id;
//     // Do the same as before
// });

// app.post("/posts", (req, res) => {
//     const data = req.body
//     // Add data to the database
//     // Send a response
// });