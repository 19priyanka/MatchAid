import { Menu, Button, rem, Table } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { useState, useEffect, ReactNode } from "react";
import { isMobile } from 'react-device-detect';

  interface VolunteerMenuProps {
    volunteers: [];
  }
  
const VolunteerMenu = ({ volunteers }: VolunteerMenuProps): ReactNode => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768 );
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  const rows = volunteers?.map((element) => (
    <Table.Tr key={element.fullName}>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.reason}</Table.Td>
      <Table.Td>{element.hoursOfAvailability} hour(s)</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td w={100}>{element.phoneNumber}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Menu shadow="md" position={(isMobileView || isMobile)?  "bottom": "bottom-start"} withArrow width={(isMobileView || isMobile)? 300: 700}>
      <Menu.Target>
        <IconUser name="user" size={24} color="black"/>
      </Menu.Target>

      <Menu.Dropdown>
      <Table.ScrollContainer minWidth={600}>
        <Table highlightOnHover >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Volunteer</Table.Th>
              <Table.Th w={200}>Reason for Volunteering</Table.Th>
              <Table.Th>Availability</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th w={140}>Phone Number</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </Table.ScrollContainer>
      </Menu.Dropdown>
    </Menu>
  );
}
export default VolunteerMenu;