import React, { useState, useEffect } from 'react';
import { ContactEditor } from '../components'

const Contacts = ({}) => {

  const [modal, setModal] = useState(false)  
  return (<div>
    <ContactEditor open={modal}/>
    <button onClick={() => setModal(true)}>here</button>
  </div>);
};

export default Contacts;
