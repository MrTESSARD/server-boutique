require('dotenv').config()
const mongoose = require("mongoose");
const USERNAME =
  process.env.REACT_APP_ATLAS_CLOUD_USERNAME;
const PASSWORD =
  process.env.REACT_APP_ATLAS_CLOUD_PASSWORD;
const DATABASE_NAME =
  process.env.REACT_APP_ATLAS_CLOUD_DATABASE_NAME;
const KEY =
  process.env.REACT_APP_ATLAS_CLOUD_KEY;

const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster-clickcollect.${KEY}.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

const MongoDBClient = {
  initialize: () => {
    try {
      const client = mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      client.then(()=> console.log(`succefully conected to DB : ${DATABASE_NAME}`))
    } catch (e) {
      throw Error(e);
    }
  },
};
module.exports = MongoDBClient
