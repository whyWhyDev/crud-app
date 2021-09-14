const db = require('../models/dbModels');

const contactController = {};

const destruct = ({ firstName, lastName, email, street, state, city, zipCode }) => [
  firstName,
  lastName,
  email,
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

contactController.getContacts = (req, res, next) => {
  const condition = req.params.company_id !== undefined ? ` WHERE company_id = ${req.params.company_id}` : '';
  const statement = 'SELECT * FROM contacts'.concat(condition);
  db.query(statement, (err, result) => {
    if (err) return next(errMessage('getContacts'));
    res.locals.contacts = result.rows;
    return next();
  });
};

contactController.createContact = (req, res, next) => {
  const contactInfo = destruct(req.body);
  const statement = `INSERT INTO contacts (first_name, last_name, email, street, state, city, zip_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  db.query(statement, contactInfo, (err, result) => {
    if (err) return next(errMessage('createContact'));
    res.locals.contact = result.rows[0];
    return next();
  });
};

contactController.updateContact = (req, res, next) => {
  const contactInfo = destruct(req.body);
  const statement = `UPDATE contacts SET first_name = $1, last_name = $2, email = $3, street = $4, state = $5, city = $6, zip_code = $7 WHERE _id = ${req.params.contact_id} RETURNING *`;
  db.query(statement, contactInfo, (err, result) => {
    if (err) return next(errMessage('updateContact'));
    res.locals.contact = result.rows;
    return next();
  });
};

contactController.updateContactsCompany = (req, res, next) => {
  const companyName =
    req.params.company_id != '0' ? `(SELECT name FROM companies WHERE _id = ${req.params.company_id})` : 'Unemployed';
  const statement = `UPDATE contacts SET company_id = ${
    req.params.company_id
  }, company_name = \'${companyName}\' WHERE _id IN (${req.body.join(', ')}) RETURNING *`;
  db.query(statement, (err, result) => {
    if (err) return next(errMessage('updateContactCompany'));

    res.locals.contact = result.rows;
    return next();
  });
};

contactController.removeContactsCompany = (req, res, next) => {
  const statement = `UPDATE contacts SET company_id = 0, company_name = '' WHERE company_id = ${req.params.company_id} RETURNING *`;
  db.query(statement, (err, result) => {
    if (err) return next(errMessage('removeContactsCompany'));
    res.locals.contact = result.rows;
    return next();
  });
};

contactController.removeContacts = (req, res, next) => {
  const ids = req.body.join(', ');
  const statement = `DELETE FROM contacts WHERE _id IN (${ids})`;
  db.query(statement, (err, result) => {
    if (err) return next(errMessage('removeContact'));
    return next();
  });
};

module.exports = contactController;
