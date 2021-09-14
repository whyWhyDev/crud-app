const express = require("express");
const router = express.Router();

const companyController = require('../controllers/companyController');
const contactController = require('../controllers/contactController');

router.get('/', companyController.getCompanies, (_, res) => {
  res.status(200).json(res.locals.companies);
})

router.post('/', companyController.createCompany, (_, res) => {
  res.status(200).json(res.locals.company);
})

router.patch('/:company_id', companyController.updateCompany, (_, res) => {
  res.status(200).json(res.locals.company);
})

router.delete('/:company_id', companyController.removeCompany, contactController.removeContactsCompany, (_, res) => {
  res.sendStatus(200);
})

module.exports = router;