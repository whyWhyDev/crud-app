const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');

router.get('/', contactController.getContacts, (_, res) => {
  res.status(200).json(res.locals.contacts);
});

router.get('/:company_id', contactController.getContacts, (_, res) => {
  res.status(200).json(res.locals.contacts);
});

router.post('/', contactController.createContact, (_, res) => {
  res.status(200).json(res.locals.contact);
});

router.patch('/:contact_id', contactController.updateContact, (_, res) => {
  res.status(200).json(res.locals.contact);
});

router.patch('/:contact_id/:company_id', contactController.updateContactCompany, (_, res) => {
  res.status(200).json(res.locals.contact);
});

router.delete('/:contact_id', contactController.removeContact, (_, res) => {
  res.sendStatus(200);
});

module.exports = router;
