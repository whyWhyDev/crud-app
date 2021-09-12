import React, { useState, useEffect } from 'react';
import { ContainerHeade, DisplayCard, CompanyEditor } from '../components';

import '../sass/BaseContainer.scss';

function BaseContainer() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div className='base-container'>
      <>
      <CompanyEditor />
      <ContainerHeade />

      </>
    </div>
  );
}

export default BaseContainer;
