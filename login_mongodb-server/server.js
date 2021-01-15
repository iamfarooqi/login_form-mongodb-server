const PORT = process.env.PORT || 5000;

var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var morgan = require("morgan");
const mongoose = require("mongoose");
var bcrypt = require("bcrypt-inzi")



let dbURI = "mongodb+srv://iamfarooqi:03325312621@cluster0.8tr9b.mongodb.net/TestDataBase?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



mongoose.connection.on('connected', function () {
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});

var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});
var userModel = mongoose.model("users", userSchema);


var app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));


app.post("/signup", (req, res, next) => {

    if (!req.body.userName ||
        !req.body.userEmail ||
        !req.body.userPassword ||
        !req.body.userPhone
    ) {

        res.status(403).send(`
            please send name, email, password, phone and gender in json body.
            e.g:
            {
                "name": "farooqi",
                "email": "farooq@gmail.com",
                "password": "12345",
                "phone": "03332765421",
                
            }`)
        return;
    }


    })


    userModel.findOne({ email: req.body.userEmail },
        function (err, doc) {
            if (!err && !doc) {
                
                bcrypt.stringToHash(req.body.userPassword).then(function (hash) {
                    
                    var newUser = new userModel({
                        "name": req.body.userName,
                        "email": req.body.userEmail,
                        "password": hash,
                        "phone": req.body.userPhone,
                    })
                    newUser.save((err, data) => {
                        if (!err) {
                            res.send({
                                message: "user created"
                            })
                        } else {
                            console.log(err);
                            res.status(500).send({
                                message: "user create error, " + err
                            })
                        }
                    });
                })
                
            } else if (err) {
                res.status(500).send({
                    message: "db error"
                })
            } else {
                res.status(409).send({
                    message: "user already exist"
                })
            }
        })
        
        
        app.listen(PORT, () => {
            console.log("server is running on: ", PORT);
        })
        // newUser.save((err, data) => {
        //     if (!err) {
        //         res.send("user created")
        //     } else {
        //         console.log(err);
        //         res.status(500).send("user create error, " + err)
        //     }
        // });