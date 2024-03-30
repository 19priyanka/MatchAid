import { Group, Stack, Button, Card, Image, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import classes from './SearchBar.module.css';
import { useState } from "react";
import { UserType } from "../../CustomTypes/UserType";

// example for the input
  // const num = 0; this is the index of the tab that is currently in use or navigating to
  // const tabs = ["Upcoming Events", "Past Events"];
  //   <Layout>
  //     <SearchInput selected={num} tabs={tabs}/>
  //     <h1 className="underline">Home</h1>
  //   </Layout>

const VolunteerEventCard= ( {event}) => {
    const [user, setUser] = useState('GUEST' as UserType);

    const renderButtons = () => {
        switch (user) {
          case UserType.ADMIN:
            return   <Group justify='flex-end'>
                        <Button color="black" mt="md" radius="md" style={{paddingInline: 25}}>
                        Approve
                        </Button>
                        <Button color="black" mt="md" radius="md" style={{paddingInline: 25}}>
                        Reject
                        </Button>
                    </Group>;
          case UserType.ORGANIZATION:
            return   <Group justify='flex-end'><Button color="black" mt="md" radius="md" style={{paddingInline: 25}} >Edit</Button></Group>;
          case UserType.VOLUNTEER:
            return   <Group justify='flex-end'><Button color="black" mt="md" radius="md" style={{paddingInline: 25}}>Volunteer</Button></Group>;
          default:
            return <Group justify='flex-end'><Button color="black" mt="md" radius="md" style={{paddingInline: 25}}>To volunteer, sign up or login!</Button></Group>;
        }
      };

  return (
    <Card shadow="lg" padding="lg" radius="md" withBorder>
        <Card.Section>
            <Image
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png"
                h={40}
                w={1300}
            />
        </Card.Section>

        <Stack mt="md" mb="md" >
            <Text fw={500} size="md">{event.Name}</Text>
            <Group >
            <Text size="xs">Date: {event.Date}, {event.times}</Text>
            <Text size="xs">{event.VolCount} volunteers wanted</Text>
            </Group>
            
        </Stack>

        <Text  mt="lg" size="sm" c="dimmed">{event.Description}</Text>

        {renderButtons()}
    </Card>

  )};
  export default VolunteerEventCard;
