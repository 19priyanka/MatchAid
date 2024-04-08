import { Avatar, Table, Group, Text, ActionIcon, Menu, rem } from '@mantine/core';
import {
  IconUserCircle, IconUserExclamation,
} from '@tabler/icons-react';

const data = [
  {
    name: 'Robert Wolfkisser',
    ocurrences: '3x Volunteer',
  },
  {
    name: 'Jill Jailbreaker',
    ocurrences: '2x Volunteer',
  },
  {
    name: 'Henry Silkeater',
    ocurrences: '2x Volunteer',
  },
  {
    name: 'Bill Horsefighter',
    ocurrences: '1x Volunteer',
  },
  {
    name: 'Jeremy Footviewer',
    ocurrences: '5x Volunteer',
  },
];

export function UsersStack(searchTerm) {
  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
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
          <ActionIcon variant="subtle" color="red">
            <IconUserExclamation style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </ActionIcon>
          <Text>
            Report User
          </Text>
           
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="md">
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}