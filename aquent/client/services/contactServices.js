import axios from 'axios';

const url = './contact';

const getContacts = async () => {
  console.log('hi')
  const response = await axios.get(url);
};

const getCompanyContacts = async (companyId) => {
  const response = await axios.get(`${url}/${companyId}`);
};

const updateContactCompany = async (contactId, company) => {
  const response = await axios.patch(`${url}/${contactId}`, company);
};

const createContact = async (contact) => {
  const response = await axios.post(url, contact);
};

const removeContact = async (contactId) => {
  const response = await axios.delete(url, contactId);
};

const updateContact = async (contact) => {
  const response = await axios.patch(url, contact);
};

export { getContacts, createContact, updateContact, removeContact, getCompanyContacts, updateContactCompany };
