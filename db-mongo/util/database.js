const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://jason:XXX@node-demo-ervxj.mongodb.net/node-demo?retryWrites=true&w=majority')
    .then(client => {
      console.log('Connected to MongoDb');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });

};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw 'Database not found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;