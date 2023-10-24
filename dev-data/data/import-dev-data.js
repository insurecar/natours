const mongoose = require("mongoose");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config({
  path: "../../config.env",
});

console.log(process.env.DATABASE);

const Tour = require("../../models/tourModel");
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection succesful"));

// //READ JSON FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8")
);

// //IMPORT DATE INTO DB

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("DATA SUCCSSESFULY LOADED!!!!!!!!!!!!!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL DATE FROM COLLECTION

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log("DATA SUCCSSESFULY DELETED!!!!!!!!!!!!!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
