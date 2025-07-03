const express = require("express");
const router = express.Router({mergeParams: true}); //it gets id from parent route(ID nhi le pate iske bina aap.js se EX: /listing/:id)
const Review = require("../models/review.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const Listing = require("../models/listing.js");
const{validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewsController = require("../controllers/reviews.js");

//REviews
//POST ROUTE
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewsController.createReview));

//REVIEWS 
//DElete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewsController.destroyReview));

module.exports = router;
