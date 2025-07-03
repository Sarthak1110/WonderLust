const User = require("../models/user");

//render signup form
module.exports.renderSignupForm = (req, res)=>{
    res.render("./users/signup.ejs");
};

//SIGNUP POST ROUTE
module.exports.signup = async(req, res)=>{
    try{
        let {username , email , password} = req.body;
     const newUser = new User({email, username});
      const registeredUser = await User.register(newUser, password);
  
      //Passport login function
      req.login(registeredUser ,(err)=>{
        if(err){
          return next(err);
        }
          req.flash("success", "User Registered Sucessfully"); 
          res.redirect("/listings");
      });
  
    } catch(err){
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  };

//render login form
module.exports.renderLoginForm = (req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.login = async(req,res)=>{      // passport.authenticate("Stragey",OPtions) this middleware is used to authenticate user 
    req.flash("success", "Welcome to WanderLust");

     //middleware.js
     //isLoggedIn is  not triggered for log in page thats why when user login using login button then we redirect to listings 
     let redirectUrl = res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);

};

//logout user
module.exports.logout = (req,res, next)=>{
    req.logOut((err)=>{
      if(err){
      return next(err);
     }
     req.flash("sucesss", "you are logged out");
     res.redirect("/listings");
    });
   };

