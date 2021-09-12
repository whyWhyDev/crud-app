const db = require('../models/dbModels')

const companyController = {};

const destruct = ({ companyName, phone, uri, street, state, city, zipCode }) => [companyName, phone, uri, street, state, city, zipCode];

companyController.getCompanies = (req, res, next) => {
  const statement = `SELECT * FROM companies`;
  db.query(statement, (err, result) => {
    if (err)
      return next({
        log: "There was an error with the getCompanies query.",
        message: {
          err: "An error occurred with the getCompanies query.",
        },
      });

    res.locals.companies = result.rows[0];
    return next();
  });
};

companyController.createCompany = (req, res, next) => {
  // const companyInfo = ['Aquent', 6175355000,'http://www.aquent.com','123 Secret Street', 'New York', 'New York', '00000'];
  const companyInfo = destruct(req.body);
  console.log(companyInfo)
  const statement = `INSERT INTO companies (company_name, company_phone, company_uri, company_street, company_state, company_city, company_zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  db.query(statement, companyInfo, (err, result) => {
    if (err)
      return next({
        log: "There was an error with the createCompany query.",
        message: {
          err: "An error occurred with the createCompany query.",
        },
      });
    return next();
  });
};


module.exports = companyController;