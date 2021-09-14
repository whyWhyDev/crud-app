import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Modal, TextField } from '@material-ui/core';
import { createCompany, updateCompany, removeCompany } from '../services';

yup.addMethod(yup.string, 'noDigit', function () {
  return this.matches(/^([^0-9]*)$/, 'The field should have letters only');
});

const validationSchema = yup.object({
  companyName: yup.string('Company Name').required('Company Name is required'),
  phone: yup
    .string('Phone Number')
    .matches(/^\d+$/, 'Phone number should have digits only')
    .required('Phone number is required'),
  uri: yup.string('Company Web Site').url('Enter a valid URI').required('Company web site is required'),
  street: yup.string('Street').required('Street is required'),
  state: yup.string('State').noDigit().required('State is required'),
  city: yup.string('City').noDigit().required('City is required'),
  zipCode: yup
    .string('Zip Code')
    .min(5, 'Password should be of minimum 5 characters length')
    .max(11, 'Password should be of maximum 11 characters length')
    .required('Zip Code is required'),
});

export default function CompanyEditor ({ company, handleClose, open, handleSave, companies }) {
  const formik = useFormik({
    initialValues: company
      ? company
      : {
          companyName: 'Aquentsb',
          phone: '6175355000',
          uri: 'http://www.aquent.com',
          street: '123 Secret Street',
          state: 'New York',
          city: 'New York',
          zipCode: '00000',
        },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = company ? await updateCompany(company.id, values) : await createCompany(values);
        const newCompanies = companies.slice();
        if (company === undefined) {
          newCompanies.push(response);
        } else {
          for (let i = 0; i < newCompanies.length; i++) {
            if (newCompanies[i].id === response.id) {
              newCompanies[i] = response;
              break;
            }
          }
        }
        handleSave(newCompanies);
      } catch (err) {
        console.error(err);
      } finally {
        handleClose()
      }
    },
  });

  const handleRemove = async () => {
    try {
      await removeCompany(company.id);
      const newCompanies = companies.slice().filter((c) => c.id !== company.id);
      handleSave(newCompanies);
    } catch (err) {
      console.error(err);
    } finally {
      handleClose()
    }
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <div className='company-editor-modal'>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            size='small'
            id='companyName'
            name='companyName'
            label='Company Name'
            value={formik.values.companyName}
            onChange={formik.handleChange}
            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
          <TextField
            size='small'
            id='phone'
            name='phone'
            label='Phone Number'
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            size='small'
            id='uri'
            name='uri'
            label='Company Web Site'
            value={formik.values.uri}
            onChange={formik.handleChange}
            error={formik.touched.uri && Boolean(formik.errors.uri)}
            helperText={formik.touched.uri && formik.errors.uri}
          />
          <TextField
            size='small'
            id='street'
            name='street'
            label='Street'
            value={formik.values.street}
            onChange={formik.handleChange}
            error={formik.touched.street && Boolean(formik.errors.street)}
            helperText={formik.touched.street && formik.errors.street}
          />
          <TextField
            size='small'
            id='city'
            name='city'
            label='City'
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            size='small'
            id='state'
            name='state'
            label='State'
            value={formik.values.state}
            onChange={formik.handleChange}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
          />
          <TextField
            size='small'
            id='zipCode'
            name='zipCode'
            label='Zip Code'
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
            helperText={formik.touched.zipCode && formik.errors.zipCode}
          />
          {company && <Button color='primary' variant='contained' size='small' onClick={handleRemove}>
            Delete Company
          </Button>}
          <Button color='primary' variant='contained' size='small' type='submit'>
            Save
          </Button>
        </form>
      </div>
    </Modal>
  );
};

