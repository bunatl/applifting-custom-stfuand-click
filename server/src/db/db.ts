const dbURI = process.env.DB_URI || 'localhost';
const dbURI_PORT = process.env.DB_URI_PORT || '27017';
const dbName = process.env.DB_NAME || 'applifting';

const dbUsername = process.env.DB_USERNAME || '';
const dbPassword = process.env.DB_PASSWORD || '';

const monk = require('monk');
const db = monk(`mongodb://${ dbURI }:${ dbURI_PORT }/${ dbName }`, {
    user: dbUsername,
    password: dbPassword
});
db.then(() => console.log('Succesfully connected to MongoDB.'));

// module.exports.db = db;
module.exports = db;