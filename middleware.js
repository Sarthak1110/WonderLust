const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utlis/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");



module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.method === "GET") {
            req.session.redirectUrl = req.originalUrl;
        }
        req.flash("error", "You must be logged in.");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    
     if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You Don't have access");
        return res.redirect(`/listings/${id}`);
    }
    next();
    
}

//ROUTES Listing.js
module.exports.validateListing = ((req, res, next) => {
     let {error} = listingSchema.validate(req.body); //Validating the data using Joi schema
    
    if(error) {
    throw new ExpressError(400, error); //If validation fails, throw an error
    }
    else{
        next(); //If validation passes, move to the next middleware
    }
});

//Routes review.js


module.exports.validateReview = ((req, res, next) => {
     let {error} = reviewSchema.validate(req.body); //Validating the data using Joi schema
    
    if(error) {
    throw new ExpressError(400, error); //If validation fails, throw an error
    }
    else{
        next(); //If validation passes, move to the next middleware
    }
});

//review.js (Routes middleware)
module.exports.isReviewAuthor = async(req ,res, next)=>{
    let {id ,reviewId} =req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You Don't have access");
        return res.redirect(`/listings/${id}`);
    }
    next();
}