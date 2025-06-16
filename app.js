const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");

const MONGOURL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGOURL);22
}
app.get("/", (req, res) => {
    res.send("Request received at /");
});
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname, "views")));

// INDEX ROUTE 

app.get("/listings", async (req, res)=>{
   const allListings= await Listing.find({});
   res.render("./listings/index.ejs", {allListings});
    });

// NEW ROUTE
app.get("/listings/new", (req, res)=>{
    res.render("./listings/new.ejs");
});
// SHOW ROUTE
app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs", {listing});
});

app.post("/listings", async (req, res)=>{
    const newListing = new Listing(req.body.listing);   //It will be an object of Js with the properties title, description, price, location, country andd it will directly convert into model instance
  await newListing.save();
    res.redirect("/listings");
});
//EDIT ROUTE
app.get("/listings/:id/edit", async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
});

// UPDATE ROUTE
app.put("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true});
    res.redirect(`/listings/${id}`);
});

// DELETE ROUTE
app.delete("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});


// app.get("/testListing", async (req, res)=>{
//     let sampleListing = new Listing({
//         title: "Sample Listing",
//         description: "This is a sample listing for testing purposes.",
//         price: 1200,
//         location: "Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("Sample listing saved to database");
//     res.send("Sample listing saved to database");
// });


app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
});