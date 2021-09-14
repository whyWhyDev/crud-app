import axios from 'axios';

const url = './contact';

const serializer = (obj) => ({
  id: obj._id,
  firstName: obj.first_name,
  lastName: obj.last_name,
  email: obj.email,
  companyId: obj.company_id,
  companyName: obj.company_name,
  street: obj.street,
  state: obj.state,
  city: obj.city,
  zipCode: obj.zip_code
})

const getContacts = async () => {
  try {
    const response = await axios.get(url);
    return response.data.map((contact) => serializer(contact));
  } catch (err) {
    console.error(err);
  }
};

const getCompanyContacts = async (companyId) => { 
  try {
    const response = await axios.get(`${url}/${companyId}`);
    return response.data.map((contact) => serializer(contact));
  } catch (err) {
    console.error(err);
  }
};

const updateContactsCompany = async (companyId, contactIds) => {
  try {
    await axios.patch(`${url}/company/${companyId}`, contactIds);
  } catch (err) {
    console.error(err);
  }
};

const createContact = async (contact, companyId = 0) => {
  try {
    const response = await axios.post(url, contact);
    return serializer(response.data)
  } catch (err) {
    console.error(err);
  }
};

const removeContacts = async (contactIds) => {
  try {
    await axios.delete(url, {data: contactIds});
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, contact) => {
  try {
    const response = await axios.patch(`${url}/${contactId}`, contact);
    return serializer(response.data)
  } catch (err) {
    console.error(err);
  }
};

export { getContacts, createContact, updateContact, removeContacts, getCompanyContacts, updateContactsCompany };
