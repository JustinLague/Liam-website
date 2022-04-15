require("dotenv").config({ path: __dirname + "/.env" });

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.DB_URL
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "S3creT"
  }
};
