import { Group, Stack, Button, Card, Image, Text } from '@mantine/core';
import { useState } from "react";
import { UserType } from "../../CustomTypes/UserType";

// example for the input
  // const volunteerEvents = [
    // {Name: "Soup Kitchen", VolCount: 4, Date: "April 14", times: "8:30am-12:00pm", Description: "This is a description of the event that's going to take place."},
    // {Name: "Homeless Shelter", VolCount: 10, Date: "April 15", times: "2:30pm-9:00pm", Description: "This is a description of the event that's going to take place."},
    // ];
  //   <Layout>
    //   <Group justify="space-evenly" style={{margin: 25}}>
        //   {volunteerEvents.map((event, index) => {
        //     return <VolunteerEventCard key={index} event={event} />
        // })}
        // </Group>
  //   </Layout>

const VolunteerEventCard= ( {organization}) => {

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
            <Text fw={500} size="md">{organization.Name}</Text>            
        </Stack>

        <Text  mt="sm" size="sm" c="dimmed">{organization.Description}</Text>

        <Group justify='flex-end'>
            <Button color="black" mt="md" radius="xl" style={{paddingInline: 25}}>More details</Button>
        </Group>
    </Card>

  )};
  export default VolunteerEventCard;
