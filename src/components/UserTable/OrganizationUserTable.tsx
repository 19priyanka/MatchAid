import { Avatar, Table, Group, Text, ActionIcon, Menu, rem, Button } from '@mantine/core';
import {
  IconUserCircle, IconUserExclamation,
} from '@tabler/icons-react';
import { getSession, useSession } from 'next-auth/react';
import {useState, useEffect} from 'react';


const reportUser = (reviewee, reviewer) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      revieweeEmail: reviewee,
      reviewerEmail: reviewer,
      description: "User has been reported",
      rating: 0,
    })
  };

  
  const adminRequestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      revieweeEmail: reviewee,
      reviewerEmail: reviewer,
      description: "User has been reported",
      rating: 0,
    })
  };
  
  fetch('/api/review', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  
    fetch('/api/admin/reviews', adminRequestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
};


export function UsersStack(searchTerm) {
  const [volunteers, setVolunteers] = useState([]);
  const [allVolunteers, setAll] = useState([]);
  const { data: session } = useSession();

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
  useEffect(()=>{
    setVolunteers(allVolunteers.filter(volunteer => {
      return volunteer.fullName.toLowerCase().includes(searchTerm.searchTerm.toLowerCase());
    }));
  }, [searchTerm]);
  const rows = volunteers.map((item) => (
    <Table.Tr key={item._id}>
      <Table.Td>
        <Group gap="sm">
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
        <Button
            color="black"
            mt="md"
            radius="xl"
            style={{ paddingInline: 25 }}
            onClick={()=>{reportUser(item.email, session?.user?.email)}}
            >
            <ActionIcon variant="subtle" color="red">
            <IconUserExclamation style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
            </ActionIcon>
                  Report user
                </Button>           
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