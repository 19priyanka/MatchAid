import { Menu, Button, rem, Table } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react';
import { useState, useEffect } from "react";

const volunteer = [
    {name: "Jane Doe",
      reason: "try something new",
      start: "1:30pm",
      end: "5:00pm",
    }, 
    {name: "Meridith Sloan",
      reason: "try something new",
      start: "12:30pm",
      end: "5:00pm",
    }, 
    {name: "John Smith",
      reason: "try something new",
      start: "1:30pm",
      end: "6:00pm",
    }, 
    {name: "Carter Cole",
      reason: "try something new",
      start: "2:30pm",
      end: "4:00pm",
    }];
function VolunteerMenu() {
  const [volunteers, setVolunteers] = useState(volunteer);

  useEffect(() => {
    // fetch user list for event 
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    
    fetch('/api/oportunities/getAllUsers', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setVolunteers(data);
      })
      .catch(error => console.error('Error:', error));
  },[]);

  const rows = volunteers?.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.reason}</Table.Td>
      <Table.Td>{element.start}</Table.Td>
      <Table.Td>{element.end}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Menu shadow="md" position="bottom-start" withArrow>
      <Menu.Target>
        <IconUser name="user" size={24} color="black"/>
      </Menu.Target>

      <Menu.Dropdown>
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Volunteer</Table.Th>
              <Table.Th>Reason for Volunteering</Table.Th>
              <Table.Th>Start Time</Table.Th>
              <Table.Th>End Time</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Menu.Dropdown>
    </Menu>
  );
}
export default VolunteerMenu;