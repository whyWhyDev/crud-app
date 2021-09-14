import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { DataGrid, GridToolbarContainer } from '@material-ui/data-grid';

import { removeContacts, updateContactsCompany } from '../services';

import '../sass/ContactsDisplay.scss'

function DataTable({ contacts, isCompany, isEmployed, companyId, handleContactOpen, handleHR }, ref) {
  const columns = [
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
    },
    {
      field: 'companyName',
      headerName: 'Company',
      width: 140,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'street',
      headerName: 'Street',
      width: 130,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 120,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 120,
    },
    {
      field: 'zipCode',
      headerName: 'Zip Code',
      width: 140,
    },
    {
      field: 'editContact',
      headerName: 'Edit Contact',
      width: 160,
      renderCell: (cellValues) => {
        return (
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              handleContactOpen(cellValues.id);
            }}
          >
            Edit
          </Button>
        );
      },
    },
  ];
  const [checkedRows, setCheckedRows] = useState([]);

  const AquentHR = async (id, rows) => {
      await updateContactsCompany(id, rows)
  } 

  function MyExportButton() {
    return (
      <GridToolbarContainer>
        {isCompany ? (
          isEmployed ? (
            <>
              <Button onClick={() => updateContactsCompany(0, checkedRows)}>Remove Selected Users From Company</Button>
            </>
          ) : (
            <>
              <Button onClick={() => updateContactsCompany(companyId, checkedRows)}>
                Add Selected Users From Company
              </Button>
            </>
          )
        ) : (
          <>
            <Button onClick={handleContactOpen}>Create New Contact</Button>
            <Button onClick={() => removeContacts(checkedRows)}>Delete Selected Contacts</Button>
          </>
        )}
      </GridToolbarContainer>
    );
  }

  return (
    <div className='data-grid' style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={contacts}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: MyExportButton,
        }}
        onSelectionModelChange={(ids) => {
          setCheckedRows(ids);
        }}
      />
    </div>
  );
}

const ContactsDisplay = React.forwardRef(DataTable);

export default ContactsDisplay;
