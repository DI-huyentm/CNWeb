const { Op, Industry } = require("../../models/databaseIndex");
const _ = require("lodash");

exports.jobsQueryFilter = (req, res, next) => {
  const filterObject = _.pickBy({ ...req.query }, _.identity);
  const sequelizeFilterObject = {};

  for (let prop in filterObject) {
    console.log(prop);
    switch (prop) {
      case "companyName":
        sequelizeFilterObject["$Company.name$"] = {
          [Op.like]: `%${filterObject[prop]}%`,
        };
        break;

      default:
        break;
    }
  }

  req.query = sequelizeFilterObject;
  next();
};
