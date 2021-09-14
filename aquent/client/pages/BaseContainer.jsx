import React, { useState, useEffect } from 'react';
import {
  DisplayCard,
  ContactEditor,
  CompanyEditor,
  ContactsDisplay,
  CompanyContactsDisplay,
} from '../components';
import { Button, CircularProgress, Modal } from '@material-ui/core';
import { getCompanies, getContacts } from '../services';

export default function BaseContainer() {
  const [isLoading, setIsLoading] = useState({
    companies: false,
    contacts: false,
  });

  const [modalOpen, setModalOpen] = useState({
    companyId: null,
    contactId: null,
    companyEditorModal: false,
    contactEditorModal: false,
    contactsDisplayModal: false,
    companyContactsModal: false,
  });

  const [companies, setCompanies] = useState([]);

  const [contacts, setContacts] = useState([]);

  const [displayContacts, setDisplayContacts] = useState({
    employed: [],
    unemployed: [],
  });

  useEffect(async () => {
    if (!companies.length) {
      setIsLoading({ ...isLoading, companies: true });
      const companiesData = await getCompanies();
      setCompanies(companiesData);
      setIsLoading({ ...isLoading, companies: false });
    }
    if (!contacts.length) {
      setIsLoading({ ...isLoading, contacts: true });
      const contactsData = await getContacts();
      setContacts(contactsData);
      const unemployed = contactsData.filter((c) => c.companyId === 0);
      setDisplayContacts({ ...displayContacts, unemployed: unemployed });
      setIsLoading({ ...isLoading, contacts: false });
    }
  }, []);

  useEffect(() => {
    if (modalOpen.companyId !== null) {
      const newEmplyed = contacts.filter((c) => c.companyId === modalOpen.companyId);
      setDisplayContacts({ ...displayContacts, employed: newEmplyed, companyId: modalOpen.companyId});
    }
  }, [modalOpen.companyId]);

  const handleModal = {
    companyOpen: (i) => setModalOpen({ ...modalOpen, companyEditorModal: true, companyId: i }),
    companyClose: () => setModalOpen({ ...modalOpen, companyEditorModal: false, companyId: null }),
    contactOpen: (i) => setModalOpen({ ...modalOpen, contactEditorModal: true, contactId: i }),
    contactClose: () => setModalOpen({ ...modalOpen, contactEditorModal: false, contactId: null }),
    companyContactsOpen: (i) => setModalOpen({ ...modalOpen, companyContactsModal: true, companyId: i }),
    companyContactsClose: () => setModalOpen({ ...modalOpen, companyContactsModal: false, companyId: null }),
    contactsDisplayOpen: () => setModalOpen({ ...modalOpen, contactsDisplayModal: true }),
    contactsDisplayClose: () => setModalOpen({ ...modalOpen, contactsDisplayModal: false }),
  };

  const getObj = (data, id) => data.filter((c) => c.id === id)[0];

  const renderCompanies = () =>
    companies.map((company, i) => (
      <DisplayCard
        key={`company-card-${company.id}`}
        className='company-card'
        title={company.companyName}
        desc={company.uri}
        handleInfoOpen={() => handleModal.companyOpen(company.id)}
        handleContactsOpen={() => handleModal.companyContactsOpen(company.id)}
      />
    ));

  return (
    <div className='base-container'>
      <>
        {isLoading.companies ? <CircularProgress /> : companies.length && <div className='cards-display'>{renderCompanies()}</div>}
        <Button color='primary' variant='contained' onClick={handleModal.contactsDisplayOpen}>
          View All Contacts
        </Button>
        <Button color='primary' variant='contained' onClick={handleModal.companyOpen}>
          Create New Company
        </Button>
      </>
      <div>
        <Modal open={modalOpen.contactsDisplayModal} onClose={handleModal.contactsDisplayClose}>
          <ContactsDisplay contacts={contacts} handleContactOpen={handleModal.contactOpen} />
        </Modal>
      </div>
      <div>
        <Modal open={modalOpen.companyContactsModal} onClose={handleModal.companyContactsClose}>
          <CompanyContactsDisplay
            handleHR={setDisplayContacts}
            companyId={modalOpen.companyId}
            contacts={displayContacts}
            handleContactOpen={handleModal.contactOpen}
          />
        </Modal>
      </div>
      <ContactEditor
        className='editor'
        handleSave={setContacts}
        contacts={contacts}
        open={modalOpen.contactEditorModal}
        contact={getObj(contacts, modalOpen.contactId)}
        handleClose={handleModal.contactClose}
      />
      <CompanyEditor
        className='editor'
        handleSave={setCompanies}
        companies={companies}
        open={modalOpen.companyEditorModal}
        company={getObj(companies, modalOpen.companyId)}
        handleClose={handleModal.companyClose}
      />
    </div>
  );
}
