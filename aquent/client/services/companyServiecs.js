import axios from 'axios';

const url = './company';

const serializer = (obj) => ({
  id: obj._id,
  companyName: obj.name,
  phone: obj.phone,
  uri: obj.uri,
  street: obj.street,
  state: obj.state,
  city: obj.city,
  zipCode: obj.zip_code,
});

const getCompanies = async () => {
  try {
    const response = await axios.get(url);
    return response.data.map((company) => serializer(company));
  } catch (err) {
    console.error(err);
  }
};

const createCompany = async (company) => {
  try {
    const response = await axios.post(url, company);
    return serializer(response.data);
  } catch (err) {
    console.error(err);
  }
};

const removeCompany = async (companyId) => {
  try {
    await axios.delete(`${url}/${companyId}`);
  } catch (err) {
    console.error(err);
  }
};

const updateCompany = async (companyId, company) => {
  try {
    const response = await axios.patch(`${url}/${companyId}`, company);
    return serializer(response.data);
  } catch (err) {
    console.error(err);
  }
};

export { getCompanies, createCompany, updateCompany, removeCompany };
