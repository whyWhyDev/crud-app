import axios from 'axios';

const url = './company'

const getCompanies = async () => {
  console.log('hi')
  const response = await axios.get(url);
  console.log(response)
}

const createCompany = async (company) => {
  console.log('hi', company)
  const response = await axios.post(url, company);
}

const removeCompany = async (companyId) => {
  const response = await axios.delete(url, companyId);
}

const updateCompany = async (company) => {
  const response = await axios.patch(url, company);
}

export { getCompanies, createCompany, updateCompany, removeCompany };