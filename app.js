if(process.env.NODE_ENV != "production"){   //not access env file in production phase
require('dotenv').config();
};


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

//Passport authentication

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User= require("./models/user.js");


// Express routes for reduce code complexity 
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;
main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "views")));
app.engine('ejs', engine);

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", ()=>{
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() +7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};



// app.get("/", (req, res) => {
//     res.send("Request received at /");
// });

app.use(session(sessionOptions));
app.use(flash()); 

//CONFIGURING STRATEGY
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser = req.user;  //res.user is a papport login user details it can't access directly in ejs but using locals we can access in navbar.ejs 
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);



app.use((err,req,res,next)=>{
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("./listings/error.ejs", {err});
    // res.status(statusCode).send(message);
});

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});