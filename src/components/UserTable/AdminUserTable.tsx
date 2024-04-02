import { Avatar, Container,  Tabs,  useMantineTheme, Table, Group, Text, ActionIcon, Menu, rem } from '@mantine/core';
import {
  IconUserCircle,
  IconTrash,
  IconDots,
  IconMail,
} from '@tabler/icons-react';
import cx from 'clsx';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';

const data = [
  {
    name: 'Robert Wolfkisser',
    ocurrences: '3x Volunteer',
    email: 'rob_wolf@gmail.com',
  },
  {
    name: 'Jill Jailbreaker',
    ocurrences: '2x Volunteer',
    email: 'jj@breaker.com',
  },
  {
    name: 'Henry Silkeater',
    ocurrences: '2x Volunteer',
    email: 'henry@silkeater.io',
  },
  {
    name: 'Bill Horsefighter',
    ocurrences: '1x Volunteer',
    email: 'bhorsefighter@gmail.com',
  },
  {
    name: 'Jeremy Footviewer',
    ocurrences: '5x Volunteer',
    email: 'jeremy@foot.dev',
  },
];
  
  
const UsersStack = () => {
    const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group >
            <IconUserCircle style={{ width: rem(50), height: rem(50) }}/>
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Text c="dimmed" fz="xs">
              {item.ocurrences}
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


