const {
  sequelize,
  Sequelize,
  DataTypes,
  Model,
  QueryTypes,
  Op,
} = require("../config/databaseConfig");

const DB = {
  Sequelize,
  sequelize,
  QueryTypes,
  Op,
  Model,
};

// Including models
DB.Company = require("./companyModel")(sequelize, DataTypes, Model);
DB.User = require("./userModel")(sequelize, DataTypes, Model);
DB.Job = require("./jobModel")(sequelize, DataTypes, Model);
DB.Apply = require("./applyModel")(sequelize, DataTypes, Model);
DB.Resume = require("./resumeModel")(sequelize, DataTypes, Model);
DB.Tag = require("./tagModel")(sequelize, DataTypes, Model);
DB.Industry = require("./industryModel")(sequelize, DataTypes, Model);

// Associations

DB.Job.belongsTo(DB.Company, {
  foreignKey: "company_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

DB.Company.hasMany(DB.Job, {
  foreignKey: "company_id",
});

DB.Apply.belongsTo(DB.Job, {
  foreignKey: "job_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

DB.Apply.belongsTo(DB.User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

DB.Apply.belongsTo(DB.Resume, {
  foreignKey: "resume_id",
  // onDelete: "CASCADE",
  // onUpdate: "CASCADE",
});

DB.Job.hasMany(DB.Apply, {
  foreignKey: "job_id",
});

DB.User.hasMany(DB.Apply, {
  foreignKey: "user_id",
});

DB.Resume.belongsTo(DB.User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

DB.User.hasMany(DB.Resume, {
  foreignKey: "user_id",
});

DB.User.belongsTo(DB.Company, {
  foreignKey: "company_id",
});

DB.Company.hasOne(DB.User, {
  foreignKey: "company_id",
});

DB.Job.belongsToMany(DB.Tag, {
  through: "job_tags",
  foreignKey: "job_id",
  otherKey: "tag_id",
});

DB.Tag.belongsToMany(DB.Job, {
  through: "job_tags",
  foreignKey: "tag_id",
  otherKey: "job_id",
});

DB.Job.belongsToMany(DB.Industry, {
  through: "job_industries",
  foreignKey: "job_id",
  otherKey: "industry_id",
});

DB.Industry.belongsToMany(DB.Job, {
  through: "job_industries",
  foreignKey: "industry_id",
  otherKey: "job_id",
});

// Notification and Chat FKs

const transactionWrapper = async (callback) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const result = await callback(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

// Wrap all models' CRUD operations within a transaction
Object.values(DB).forEach((model) => {
  if (model instanceof Model) {
    model.create = async (values, options) => {
      return transactionWrapper(async (transaction) => {
        return model.create(values, { ...options, transaction });
      });
    };

    model.update = async (values, options) => {
      return transactionWrapper(async (transaction) => {
        return model.update(values, { ...options, transaction });
      });
    };

    model.destroy = async (options) => {
      return transactionWrapper(async (transaction) => {
        return model.destroy({ ...options, transaction });
      });
    };
  }
});

DB.sequelize.sync().then(() => {
  console.log("All models were synchronized successfully.");
});

module.exports = DB;
