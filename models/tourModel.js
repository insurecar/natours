const mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxLength: [40, "A tour name must have less or equal the 40 characters"],
      minLength: [10, "A tour name must have more or equal the 10 characters"],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A should have difficalty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either: easy, meduim or difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be bellow 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, "A tour must have description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cove image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //hide this field
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLWARE runs before .save() and .create() .insertMany()
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre("save", function (nextdev-
//   console.log("Will save document... 😂");
//   next();
// });

// tourSchema.post("save", function (doc, next) {
//   console.log(doc);

//   next();
// });

//QUERY MIDDLWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); // if this trigger is true we will not get this tour

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(`Query took ${Date.now() - this.start} milliseconds 😃😃😃😃😃`);
  // console.log(docs);
  next();
});

//AGGREGATION MIDDLEWARE
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log("😍", this);
  next();
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
