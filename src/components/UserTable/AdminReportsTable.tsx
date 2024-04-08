import { Avatar, Container,  Tabs, useMantineTheme, Table, Group, Text, ActionIcon, Menu, rem } from '@mantine/core';
import {
  IconUserCircle,
  IconTrash,
  IconDots,
  IconMail,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { ModalsProvider, modals } from '@mantine/modals';
import type { GetServerSideProps } from "next";
  
const deleteUser = (user) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      _id: user._id,
    }),
  };

  fetch("/api/admin/volunteers/", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));

}
const UsersStack = (searchTerm) => {
    const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [allVolunteers, setAll] = useState([]);
  const [reportedVolunteers, setReported] = useState([]);


  fetch('/api/admin/reviews')
  .then(response => response.json())
  .then(responseData =>{
    console.log("reviews are: ", responseData);
    setReported( responseData.filter(event => {
      return event.review.revieweeType != 'Organization'; 
    }));
    console.log(reportedVolunteers);

  })
  .catch(error => console.error('Error:', error));

  const rows = reportedVolunteers.map((item) => (
    <Table.Tr key={item._id}>
      <Table.Td>
        <Group >
        <IconUserCircle style={{ width: rem(50), height: rem(50) }}/>
          <div>
            <Text fz="sm" fw={500}>
              {item.reviewee.fullName}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.reviewee.noOfTimesVolunteered}x Volunteer
            </Text>
          </div>
        </Group>
      </Table.Td>
      <Table.Td>
      <Group>
            <Text>
                Reported by: {item.reviewer.fullName}
            </Text>
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
                {item.reviewee.email}
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                color="red" onClick={()=>{deleteUser(item.reviewee)}}
              >
                Delete Account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

        </Group>
      </Table.Td>
    </Table.Tr>
  ));

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


