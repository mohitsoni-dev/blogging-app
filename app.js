var express          = require("express"),
    methodOverride   = require("method-override"),
    bodyParser       = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    app              = express();


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

const session = require('express-session');

app.use(session({
  secret: 'seCReT',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

// Index Route
app.use('/', require('./routes/index.js'));

// User Route
app.use('/users', require('./routes/users.js'));

// Starting Server
app.get("*", (req, res) => {
    res.status(404).send("You did something wrong!");  
});
var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log("Server has started!");
});
