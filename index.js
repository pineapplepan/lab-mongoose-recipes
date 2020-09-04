const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

Recipe.create(data, (error, recipe) => {
  if (error) {
    console.log("An error happened:", error);
    return;
  }
  console.log("The recipe is saved: ", recipe);
});

Recipe.create(data)
  .then((recipe) => console.log("The recipe is saved: ", recipe))
  .catch((error) =>
    console.log("An error happened while saving a new recipe:", error)
  );
