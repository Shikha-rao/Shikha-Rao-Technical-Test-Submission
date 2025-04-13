const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Category = require('./category.model')(sequelize, DataTypes);
db.Product = require('./product.model')(sequelize, DataTypes);

// Relationships
db.Category.belongsTo(db.User);
db.Product.belongsTo(db.Category);
db.Product.belongsTo(db.User);

module.exports = db;
