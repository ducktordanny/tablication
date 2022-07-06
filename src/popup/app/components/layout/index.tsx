import React, {ReactNode} from 'react';

import {Container} from '@mui/material';

import Navbar from './navbar';
import ViewSelect, {ViewSelectOptions} from '../view-select';

interface LayoutProps {
  children: ReactNode;
}

const VIEW_OPTIONS: ViewSelectOptions = [
  {value: 'windows', title: 'Windows'},
  {value: 'all-tabs', title: 'All tabs'},
  {value: 'tabs-grouped', title: 'Tabs grouped'},
  {value: 'summery', title: 'Summery'},
];

export default function Layout({children}: LayoutProps) {
  const onViewSelection = (value: string) => console.log(value);

  return (
    <>
      <Navbar>
        <ViewSelect options={VIEW_OPTIONS} onSelect={onViewSelection} />
      </Navbar>
      <Container>
        {children}
      </Container>
    </>
  );
}
