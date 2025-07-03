const Listing = require("../models/listing");

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
    let url = req.file.path;
    let filename= req.file.filename;
    const newListing = new Listing(req.body.listing);  //It will be an object of Js with the properties title, description, price, location, country andd it will directly convert into model instance
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    await newListing.save();
    req.flash("success", "New listing Created!");
    res.redirect("/listings");
   
};

//Edit
module.exports.renderEditForm = async (req, res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing});
};

module.exports.updateListing =async (req, res)=>{
    if(!req.body.listing) {
        throw new ExpressError(400, "Invalid Listing Data");    
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {runValidators: true});
     req.flash("success", "Listing !");
    res.redirect(`/listings/${id}`);
};

//Destory
module.exports.destroyListing = async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

