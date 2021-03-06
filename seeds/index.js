const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);

    const price = Math.floor(Math.random() * 20) + 10;

    const camp = new Campground({
      author: '612cf0d80eb99f2084d2cab3',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/ryanjpeterson/image/upload/v1630507374/YelpCamp/tcawrrziugtuv3abhjaz.jpg',
          filename: 'YelpCamp/tcawrrziugtuv3abhjaz',
        },
        {
          url: 'https://res.cloudinary.com/ryanjpeterson/image/upload/v1630507374/YelpCamp/jp9xst9uehkzfrub4zmp.png',
          filename: 'YelpCamp/jp9xst9uehkzfrub4zmp',
        },
      ],
      geometry: {
        type: 'Point',
        coordinates: [-113.1331, 47.0202],
      },
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quidem minima vero quis ab sed inventore quibusdam harum exercitationem, et repellendus nisi error, hic tenetur? Odit inventore velit voluptatem eos.',
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('Seeded!');
});
