const { Sequelize } = require("sequelize");

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  logging: false,
});

const syncDB = async () => {
  try {
    await sequelize.sync();
    console.log("Veri tabanı sekronize edildi.");
  } catch (err) {
    console.log("\\\\ ----- Veri Tabanı Sekronize Edilemedi ----- //\n", err);
  }
};

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Veri tabanına bağlanıldı!");
  } catch (err) {
    console.log("\\\\ ----- Veri Tabanı Bağlantı Hatası ----- //\n", err);
  }
};

module.exports = {
  sequelize,
  connectDB,
  syncDB,
};
