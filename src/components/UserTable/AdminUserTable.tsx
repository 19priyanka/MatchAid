import { Avatar, Container,  Tabs,  useMantineTheme, Table, Group, Text, ActionIcon, Menu, rem } from '@mantine/core';
import {
  IconUserCircle,
  IconTrash,
  IconDots,
  IconMail,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@mantine/hooks';


  
  
const UsersStack = (searchTerm) => {
    const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [allVolunteers, setAll] = useState([]);
  const [reportedVolunteers, setReported] = useState([]);
  
  useEffect(() => {
      fetch('/api/admin/volunteers')
      .then(response => response.json())
      .then(responseData =>{
        console.log("all volunteers are: ", responseData);
        setAll( responseData);
        console.log(allVolunteers);
        setVolunteers(responseData);
      })
      .catch(error => console.error('Error:', error));
  }, []);
  const rows = volunteers.map((item) => (
    <Table.Tr key={item._id}>
      <Table.Td>
        <Group >
            <IconUserCircle style={{ width: rem(50), height: rem(50) }}/>
          <div>
            <Text fz="sm" fw={500}>
              {item.fullName}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.noOfTimesVolunteered}x Volunteer
            </Text>
          </div>
        </Group>
      </Table.Td>
      
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <Menu
            transitionProps={{ transition: 'pop' }}
            withArrow
            position="bottom-end"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <IconDots style={{ width: rem(24), height: rem(16) }} stroke={1.5} />
                
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconMail style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
              >
                {item.email}
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                color="red"
              >
                Delete Account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
  useEffect(()=>{
    setVolunteers(allVolunteers.filter(volunteer => {
      return volunteer.fullName.includes(searchTerm.searchTerm);
    }));
    console.log(volunteers);
  }, [searchTerm]);
  return (
    <div>
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="md">
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  </div>
  );
}

export default UsersStack;


