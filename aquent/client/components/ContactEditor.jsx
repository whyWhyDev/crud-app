import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Modal, TextField } from '@material-ui/core';

import '../sass/DisplayCard.scss';

yup.addMethod(yup.string, 'noDigit', function () {
  return this.matches(/^([^0-9]*)$/, 'The field should have letters only');
});

const validationSchema = yup.object({
  firstName: yup.string('First Name').noDigit().required('First Name is required'),
  lastName: yup.string('Last Name').noDigit().required('Last Name is required'),
  email: yup.string('Email Address').email('Enter a valid email').required('Email is required'),
  street: yup.string('Street').required('Street is required'),
  state: yup.string('State').noDigit().required('State is required'),
  city: yup.string('City').noDigit().required('City is required'),
  zipCode: yup
    .string('Zip Code')
    .min(5, 'Password should be of minimum 5 characters length')
    .max(11, 'Password should be of maximum 11 characters length')
    .required('Zip Code is required'),
});

const ContactEditor = ({ contact, open }) => {
  const formik = useFormik({
    initialValues: contact ? contact : {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      state: '',
      city: '',
      zipCode: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Modal open={open}>
      <div className='contact-editor-modal'>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            size='small'
            id='firstName'
            name='firstName'
            label='First Name'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            size='small'
            id='lastName'
            name='lastName'
            label='Last Name'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            size='small'
            id='email'
            name='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
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
          <Button color='primary' variant='contained' size='small' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default ContactEditor;
