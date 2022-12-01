import { Container } from "@mantine/core";
import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import Link from 'next/link';

type Props = {
  children?: React.ReactNode
};
//children element required to pass data to this component from global state
//the following code is the constant main layout appshell for header, navbar, routing, but further adjustment needed for responsiveness and UI
export default function Layout ({  children } : Props) {
  const theme = useMantineTheme(); 
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: '#FFFFFF',
          width: "100vw",
          height: "100vh",
          paddingLeft: '0px',
      }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={ 
        <Navbar className="sideNavBar" p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 150 }}>
          <Link className="sideNav" href='/'>Home</Link>
          <Link className="sideNav"  href='/'>Accounts</Link>
          <Link className="sideNav"  href='/'>Transaction</Link>
          <Link className="sideNav"  href='/'>User</Link>
          <Link className="sideNav"  href='/'>Investing</Link>
          <Link className="sideNav"  href='/'>Lucas</Link>
        </Navbar>
      }

      header={
        
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                mr="xl"
              />
            </MediaQuery>         
            <img alt="fazz-logo" 
            src={"../../assets/fazz.png"}
            height="40px"
            />
            <h3 className="main-header">Fazz BizDashboard</h3>
          </div>
        </Header>
      }
    > <Container>{children}</Container>
    </AppShell>
  );
}
