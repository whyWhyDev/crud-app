import React from 'react';
import { ContactsDisplay } from '../components';

function Display({ companyId, contacts, handleContactOpen, handleHR }, ref) {
  return (
    <div className='base-container'>
      <ContactsDisplay
        handleHR={handleHR}
        isCompany={true}
        isEmployed={true}
        contacts={contacts.employed}
        handleContactOpen={handleContactOpen}
      />
      <ContactsDisplay
        handleHR={handleHR}
        isCompany={true}
        isEmployed={false}
        companyId={companyId}
        contacts={contacts.unemployed}
        handleContactOpen={handleContactOpen}
      />
    </div>
  );
}

const CompanyContactsDisplay = React.forwardRef(Display);

export default CompanyContactsDisplay;
