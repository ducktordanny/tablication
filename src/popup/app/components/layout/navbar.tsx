import React, {ReactElement} from 'react';

import {
  AppBar,
  CssBaseline,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';

interface ElevationScrollProps {
  children: ReactElement;
  window?: () => Window;
}

export interface NavbarProps {
  children?: ReactElement;
}

function ElevationScroll({children, window}: ElevationScrollProps) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Navbar = ({children}: NavbarProps) => (
  <>
    <CssBaseline />
    <ElevationScroll>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Tablication
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
    <Toolbar />
  </>
);

export default Navbar;
