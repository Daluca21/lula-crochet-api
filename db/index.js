const { Sequelize, DataTypes, Model } = require("sequelize");
const mysql2 = require("mysql2");
const { DB_NAME, DB_HOST, DB_PASSWORD, DB_USER , DB_PORT, TABLE_NAMES} = require("../config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  dialectModule: mysql2,
  host: DB_HOST,
  port: DB_PORT,
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log("error db connect", err));

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const tableNames = TABLE_NAMES.split(",");
tableNames.forEach(name => {
  require(`./models/${name}.js`)(sequelize, DataTypes, Model);
});

Object.values(sequelize.models).filter(model => model.hasOwnProperty("associate") && typeof model.associate === "function").forEach(model => model.associate(sequelize.models));

db.sequelize.sync({ alter: false }).then(() => {
  console.log("Tables created");
});

module.exports = db;