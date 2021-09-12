const db = require('../models/dbModels');

const companyController = {};

const destruct = ({ companyName, phone, uri, street, state, city, zipCode }) => [
  companyName,
  phone,
  uri,
  street,
  state,
  city,
  zipCode,
];

const errMessage = (querier) => {
  return {
    log: `There was an error with the ${querier} query.`,
    message: {
      err: `An error occurred with the ${querier} query.`,
    },
  };
};

companyController.getCompanies = (req, res, next) => {
  const statement = `SELECT * FROM companies`;
  db.query(statement, (err, result) => {
    if (err) return next(errMessage('getCompanyies'));
    res.locals.companies = result.rows;
    return next();
  });
};

companyController.createCompany = (req, res, next) => {
  const companyInfo = destruct(req.body);
  const statement = `INSERT INTO companies (company_name, company_phone, company_uri, company_street, company_state, company_city, company_zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  db.query(statement, companyInfo, (err, result) => {
    if (err) return next(errMessage('createCompany'));
    res.locals.company = result.rows[0];
    return next();
  });
};

companyController.updateCompany = (req, res, next) => {
  const companyInfo = destruct(req.body);
  const statement = `UPDATE companies SET company_name = $1, company_phone = $2, company_uri = $3, company_street = $4, company_state = $5, company_city = $6, company_zip_code = $7 WHERE _id = ${req.params.companyId} RETURNING *`;
  db.query(statement, companyInfo, (err, result) => {
    if (err) return next(errMessage('updateCompany'));
    res.locals.company = result.rows[0];
    return next();
  });
};

companyController.removeCompany = (req, res, next) => {
  const statement = `DELETE FROM company WHERE _id = ${req.params.company_id}`;
  db.query(statement, (err, result) => {
    if (err) return next(errMessage('removeCompany'));
    return next();
  });
};

module.exports = companyController;
