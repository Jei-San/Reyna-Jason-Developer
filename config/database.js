require("dotenv").config();

//Connection to database (MySQL)
//You can change dialect to adapt
//to different DB engines
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  define: {
    timestamps: false,
  },
};
