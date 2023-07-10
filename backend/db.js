// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://bilal69:taha123@cluster0.ukxzxeo.mongodb.net/foodiemern?retryWrites=true&w=majority';

// const mongoDB = async () => {
//   try {
//     //mongoose.set('debug', true); // Enable debug mode for Mongoose
//     await mongoose.connect(mongoURI);
//     console.log('Connected to MongoDB');
//     const fetch_data = mongoose.connection.db.collection('food_items');
//     const data = await fetch_data.find({}).toArray();
    
//     const fetch_catData = mongoose.connection.db.collection('food_Category');
//     const catData = await fetch_catData.find({}).toArray();
//     global.food_items = data;
//     global.food_Category = catData;


//     //console.log(global.food_items);
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//   }
// };

// module.exports = mongoDB;

const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://bilal69:taha123@cluster0.ukxzxeo.mongodb.net/foodiemern?retryWrites=true&w=majority';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');
  
    const fetch_data = mongoose.connection.db.collection('food_items');
    const data = await fetch_data.find({}).toArray();

    const fetchCategoryData = async () => {
      const fetch_catData = mongoose.connection.db.collection('food_Category');
      const catData = await fetch_catData.find({}).toArray();
      return catData;
    };

    const catData = await fetchCategoryData();
    global.food_items = data;
    global.food_Category = catData;

    //console.log(global.food_items);
    //console.log(global.food_Category);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = mongoDB;
