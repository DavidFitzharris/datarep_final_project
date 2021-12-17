const express = require('express')
const app = express()
const port = 4000
const path = require('path');
//Body parse to be used in middle-ware
const bodyParser = require("body-parser");
//Avoiding CORS Errors
const cors = require('cors');
//Mongodb database
const mongoose = require('mongoose');

//Building the app
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));


//Mongodb Database
//Connecting to the database
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://admin:andrew1994@cluster0.renws.mongodb.net/finalProject?retryWrites=true&w=majority');
}

//Creating a new database 'Schema'
var Schema = mongoose.Schema
var playlistSchema = new Schema({
    Name: String,
    Genre: String,
    Link: String,
    Image: String
})

//Creating a new database model
var playlistModel = mongoose.model('playlist', playlistSchema);

//Avoiding Cors Error
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Config Body Parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) =>
    res.send('This is my server'))

//Route point for returning the api for the playlists
app.get('/api/playlists', (req, res) => {

    //Finding the documents in database
    playlistModel.find((err, data) => {
        res.json(data);
    })
})

//Reading data from the database
app.get('/api/movies', (req, res, next) => {
    playlistModel.find(function (err, data) {
        console.log(data);
        res.json(data);
    });
})

//Reads by document ID of playlist within database
app.get('/api/movies/:id', (req, res, next) => {
    console.log(req.params.id);
    playlistModel.findById(req.params.id,
        function (err, data) {
            res.json(data);
        });
})

//Show data coming from our AddPlaylist class
app.post('/api/playlists', (req, res) => {
    console.log('post Sucessfull');
    console.log(req.body)
    console.log(req.body.Name);
    console.log(req.body.Genre);
    console.log(req.body.Image);
    console.log(req.body.Link);

    //Using our Schema with mongoose
    playlistModel.create({
        Name: req.body.Name,
        Genre: req.body.Genre,
        Link: req.body.Link,
        Image: req.body.Image
    });
    res.send('Item added');

})

//Put method using findByIdAndUpdate to edit playlists
app.put('/api/playlists/:id', function (req, res) {
    console.log("Update Playlist " + req.params.id);
    console.log(req.body)
    console.log(req.body.Name);
    console.log(req.body.Genre);
    console.log(req.body.Image);
    console.log(req.body.Link);

    playlistModel.findByIdAndUpdate(req.params.id, req.body, { new: true },
        function (err, data) {
            res.send(data);
        })
})

//Delete Method to remove data
app.delete('/api/playlists/:id',(req,res)=>{
    console.log("Delete PLaylist by id: "+ req.params.id)

    playlistModel.findByIdAndDelete(req.params.id,(err, data)=>{
        res.send(data)
    })
})

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
    });
    

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`))