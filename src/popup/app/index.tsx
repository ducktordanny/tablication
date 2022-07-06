import React, {useEffect} from 'react';

import Layout from './components/layout';
import {TablicationData} from '../../shared/types';

export default function App() {
  useEffect(() => {
    chrome.runtime.sendMessage({name: 'get-tablication-data'})
      .then((response: TablicationData) => console.log(response));
  }, []);

  return (
    <Layout>
      <p>Hello world!</p>
    </Layout>
  );
}
