const mongoose = require ('mongoose');
const MONGODB_URI = 'mongodb://mongo:27017/castandcrew';


const connectWithRetry = () => {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
    err && setTimeout(connectWithRetry, 5000); //attempt to reconnect every 5 seconds if initial attempt fails
  });
};
connectWithRetry();

/****************************
 * SCHEMA DEFINITIONS *
 ****************************/

const movieSchema = new mongoose.Schema(
  {
    id: 'number',
    title: 'string',
    release_date: 'string',
    vudu_rating: 'number',
    runtime: 'string',
    rating: 'string',
    rt_rating: 'number',
    price: 'string',
    thumbnail_url: 'string',
    personnel: [
      {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Personnel'},
        role: 'string'
      },
    ]
  }
);

const personnelSchema = new mongoose.Schema(
  {
    _id: 'ObjectId',
    name: 'string',
    thumbnail_url: 'string',
  }
);

/**********
 * MODELS *
 **********/

const Movie = mongoose.model('Movie', movieSchema);
const Personnel = mongoose.model('Personnel', personnelSchema);

/***********
 * QUERIES *
 ***********/

const getPersonnel = (id) => {
  return Movie.find().where('personnel._id').equals(id).exec();
};

const getMovies = (id) => {
  return Movie.find().where('id').equals(id).populate('personnel._id').exec();
};

/* Export schemas for testing and seeding the database */
module.exports = {
  Movie,
  Personnel,
  getMovies,
  getPersonnel
};
