const { Pool } = require("pg");

// URI to update to db
const PG_URI = 'postgres://yhldntay:Yg1ThCNJicre4iPt8W_Uik7pB6-DKcPg@chunee.db.elephantsql.com/yhldntay';
  

// creates a new pool using the connection URI
const pool = new Pool({
  connectionString: PG_URI,
  max: 5,
  min: 0,
  idle: 10000,
});

// exports an object with a method on it that makes queries to database
module.exports = {
  query: (text, params, callback) => {
    console.log("Querying for: ", text);
    return pool.query(text, params, callback);
  },
};
