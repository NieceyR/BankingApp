require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dal = require('./dal.js');


const authRouter = require('./auth');

dotenv.config({path: './config/config.env'})

// Passport config
require('./config/passport')(passport)

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));



// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(passport.authenticate('session'));



app.use('/', authRouter);

// create user account
app.post('/account/create/:name/:email/:password', function (req, res) {
    dal.find(req.params.email).then((users) => {
        if(users.length > 0) {
            res.status(401).send('User already exists');
        } else {
            // else create user
             dal.create(req.params.name, req.params.email, req.params.password).then((user) => {
                console.log(user);
                res.send(user);
             });
        }
    });
});

app.get('/account/login/:email/:password', function(req, res) {
    dal.find(req.params.email).then((user) => {
        if(user.length > 0) {
            if(user[0].password === req.params.password){
                res.status(200).send({
                    msg:"user login successful",
                    user: user[0],
                    success:true
                })
            } else {
                res.status(401).send('Login failed: wrong password');
            }
        } else {
            res.status(401).send('Login failed: user not found');
        }
    });
});

app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).then((user) => {
        console.log(user);
        res.send(user);
    });
});

app.put('/account/update', function (req, res) {
    console.log('req.body', req.body);
    const amount = Number(req.body.amount);

    dal.update(req.body.email, amount).then((response) => {
        res.send(response);
    });
});

app.put('/account/updateWithdraw', function(req, res){
    console.log('req.body', req.body);
    const amount = -Math.abs(Number(req.body.amount));

    dal.update(req.body.email, amount).then((response) => {
        res.send(response);
    })
})

// all accounts
app.get('/account/all', function(req, res){
    dal.all().then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Running on port:' + port));
