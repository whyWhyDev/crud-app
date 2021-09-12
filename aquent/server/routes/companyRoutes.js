const express = require("express");
const router = express.Router();

const companyController = require('../controllers/companyController');

router.get('/', companyController.getCompanies, (_, res) => {
  res.status(200).json(res.locals.companies);
})

router.post('/', companyController.createCompany, (_, res) => {
  res.sendStatus(200);
})

module.exports = router;