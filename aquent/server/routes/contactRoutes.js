const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/', contactController.getContacts, (_, res) => {
  res.status(200).json(res.locals.contacts);
});

router.get('/:company_id', contactController.getContacts, (_, res) => {
  res.status(200).json(res.locals.contacts);
});

router.patch('/company/:company_id', contactController.updateContactsCompany, (_, res) => {
  res.status(200).json(res.locals.contact);
});

router.post('/', contactController.createContact, (_, res) => {
  res.status(200).json(res.locals.contact);
});

router.patch('/:contact_id', contactController.updateContact, (_, res) => {
  res.status(200).json(res.locals.contact);
});



router.delete('/', contactController.removeContacts, (_, res) => {
  res.sendStatus(200);
});

module.exports = router;
