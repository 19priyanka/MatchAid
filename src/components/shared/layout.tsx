import { AppShell, Burger} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import VolunteerNavBar from "./VolunteerNavBar";
import logo from '../../../logo.png';
import Image from 'next/image'

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const [opened, { toggle }] = useDisclosure();

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
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Image src={logo} alt="logo" width={72}
      height={72}/>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <VolunteerNavBar />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
