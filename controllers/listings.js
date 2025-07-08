const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});
const ExpressError = require("../utlis/ExpressError");


//Routes/Listings all routes 
module.exports.index = async (req, res)=>{
   const allListings= await Listing.find({});
   res.render("./listings/index.ejs", {allListings});
};

//New 
module.exports.renderNewForm = (req, res)=>{
    
     res.render("./listings/new.ejs");
};

//SHOW
module.exports.showListing =async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews", 
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error", "Listing  you requested for doesn't Exist!");
        res.redirect("/listings");
    }else{
        console.log(listing)
    res.render("./listings/show.ejs", {listing});
    }
};

//Create 
module.exports.createListing = async (req, res, next)=>{

    try {
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        }).send();
        
        if (!response.body.features || response.body.features.length === 0) {
            throw new ExpressError(400, "Invalid location. Please enter a valid address.");
        }
        
        let url = req.file.path;
        let filename = req.file.filename;
        const newListing = new Listing(req.body.listing);  //It will be an object of Js with the properties title, description, price, location, country andd it will directly convert into model instance
        newListing.owner = req.user._id;
        newListing.image = {url,filename};
        // MAP
        newListing.geometry = response.body.features[0].geometry;

        let saved = await newListing.save();
        console.log(saved);
        req.flash("success", "New listing Created!");
        res.redirect("/listings");
    } catch (error) {
        req.flash("error", "Failed to create listing. Please check the location.");
        res.redirect("/listings/new");
    }
   
};

//Edit
module.exports.renderEditForm = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
};

module.exports.updateListing =async (req, res, next)=>{
    if(!req.body.listing) {
        throw new ExpressError(400, "Invalid Listing Data");    
    }
    let {id} = req.params;
    
    try {
        // Geocode the new location to get updated coordinates
        let response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        }).send();
        
        if (!response.body.features || response.body.features.length === 0) {
            throw new ExpressError(400, "Invalid location. Please enter a valid address.");
        }
        
        // Update the listing with new data including geometry
        req.body.listing.geometry = response.body.features[0].geometry;
        let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true, new: true});
        
        if(typeof req.file !== "undefined"){
            let url = req.file.path;
            let filename= req.file.filename;
            listing.image = {url, filename};
            await listing.save();
        }
        
        req.flash("success", "Listing Updated!");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        req.flash("error", "Failed to update listing. Please check the location.");
        res.redirect(`/listings/${id}/edit`);
    }
};

//Destory
module.exports.destroyListing = async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

