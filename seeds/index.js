const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");

if(process.env.NODE_ENV != "production"){   //not access env file in production phase
  require('dotenv').config();
  };

const MONGO_URL = process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj)=>({...obj, owner: "6860411b28069cbdefcec199"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();