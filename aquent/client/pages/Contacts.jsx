import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { ContactEditor } from '../components'

const Contacts = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false)  
  return (<div>
    
    <ContactEditor open={modal}/>
    <button onClick={() => setModal(true)}>here</button>
  </div>);
};

export default Contacts;
