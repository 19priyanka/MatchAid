import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import VolunteerNavBar from "../NavBar/VolunteerNavBar";
import logo from "../../../logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import OrganizationNavBar from "../NavBar/OrganizationNavBar";
import GuestNavBar from "../NavBar/GuestNavBar";
import AdminNavBar from "../NavBar/AdminNavBar";
import { UserType } from "../../CustomTypes/UserType";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user?.name);
  useEffect(() => {
    setUser(session?.user?.name);
  }, [session]);

  console.log("this is the session user",  session?.user);
  const renderNavBar = () => {
    switch (user) {
      case UserType.ADMIN:
        return <AdminNavBar />;
      case UserType.ORGANIZATION:
        return <OrganizationNavBar />;
      case UserType.VOLUNTEER:
        return <VolunteerNavBar />;
      default:
        return <GuestNavBar />;
    }
  };

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group>
          <Image src={logo} alt="logo" width={50} height={50} />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">{renderNavBar()}</AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
