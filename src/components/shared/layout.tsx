import { AppShell, Burger, Group} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import VolunteerNavBar from "../NavBar/VolunteerNavBar";
import logo from '../../../logo.png';
import Image from 'next/image'
import { useState } from "react";
import OrganizationNavBar from "../NavBar/OrganizationNavBar";
import GuestNavBar from "../NavBar/GuestNavBar";
import AdminNavBar from "../NavBar/AdminNavBar";
import { UserType } from "../../CustomTypes/UserType";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
  const [user, setUser] = useState('volunteer' as UserType); //Probably will replace this with singleton when we have user authentication working and can pull user type from there
  
  const renderNavBar = () => {
    switch (user) {
      case UserType.ADMIN:
        return    <AdminNavBar />;
      case UserType.ORGANIZATION:
        return    <OrganizationNavBar />;
      case UserType.VOLUNTEER:
        return    <VolunteerNavBar />;
      default:
        return <GuestNavBar />;
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group>
        <Image src={logo} alt="logo"  width={70}
      height={70} />
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
     
        {renderNavBar()}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
