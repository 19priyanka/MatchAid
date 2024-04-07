import {
  Group,
  Stack,
  Button,
  Card,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { UserType } from "../../CustomTypes/UserType";
import VolunteerMenu from "./VolunteerMenu";
import { useRouter } from "next/router";
import CreateOpportunityModal from "../Modal/CreateOpportunityModal";
import VolunteerModal from "../Modal/VolunteerModal";

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

const VolunteerEventCard = ({ event, attending }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user?.name);
  const [eventStatus, setStatus] = useState(event.status);
  const [time, setTime] = useState("");
  const router = useRouter();
  useEffect(() => {
    setUser(session?.user?.name);
    console.log("Event status is: ", event.status);
    const date = new Date(event.time);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)
    let end = hours + event.duration;
    end = end % 12;
    const endampm = end > hours? 'pm' : 'am';

    setTime(`${month} ${day}, ${year} ${hours}:${minutes}${ampm} - ${end}:${minutes}${endampm}`);
  }, [session]);
  const changeEventStatus = (status: string) =>{
    console.log(status);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: event.name,
        status: status
      })
    };
    console.log(requestOptions);
    fetch('/api/admin/updateOpportunityStatus', requestOptions)
      .then(response => {
        response.json()
        setStatus(status);
        console.log("updated status: ", response);
      })
      .catch(error => console.error('Error:', error));
  };
  const reportOrganization = () =>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        revieweeEmail: event.organization.email,
        reviewerEmail: session?.user?.email,
      })
    };
    
    fetch('/api/review', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error('Error:', error));
  };
  const renderButtons = () => {
    switch (user) {
      case UserType.ADMIN:
        return (
          <Group justify="flex-end">
            <Button
              onClick={()=>{changeEventStatus('Accepted')}}
              color="black"
              mt="md"
              radius="xl"
              style={{ paddingInline: 25 }}
              disabled= {eventStatus=='Accepted'? true:false}
            >
              Approve
            </Button>
            <Button
              onClick={()=>{changeEventStatus('Declined')}}
              color="black"
              mt="md"
              radius="xl"
              style={{ paddingInline: 25 }}
              disabled= {eventStatus=='Declined'? true:false}
            >
              Reject
            </Button>
          </Group>
        );
      case UserType.ORGANIZATION:
        return (
          <Group justify="flex-end">
            <Text>Event status: {event.status}</Text>
            <Button
              color="black"
              mt="md"
              radius="xl"
              style={{ paddingInline: 25 }}
              onClick={()=>{CreateOpportunityModal()}}
            >
              Edit
            </Button>
          </Group>
        );
      case UserType.VOLUNTEER:
        if (attending) {
          return (
            <Group justify="flex-end">
              <Tooltip
                withArrow
                multiline
                w={200}
                position="top"
                label="Report this organization if you do not feel they meet MatchAid standards"
              >
                <Button
                  color="black"
                  mt="md"
                  radius="xl"
                  style={{ paddingInline: 25 }}
                  onClick={()=>{reportOrganization()}}
                >
                  Report
                </Button>
              </Tooltip>
            </Group>
          );
        } else
          return (
            <Group justify="flex-end">
              <Button
                color="black"
                mt="md"
                radius="xl"
                style={{ paddingInline: 25 }}
                onClick={()=>{VolunteerModal()}}
              >
                Volunteer
              </Button>
            </Group>
          );
      default:
        return (
          <Group justify="flex-end">
            <Button
              onClick={()=>{router.push('/login')}}
              color="black"
              mt="md"
              radius="xl"
              style={{ paddingInline: 25 }}
            >
              To volunteer, sign up or login!
            </Button>
          </Group>
        );
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

      <Stack mt="md" mb="md">
        {user == UserType.ORGANIZATION ? (
          <Group>
            <Text fw={500} size="md">
              {event.name}
            </Text>
            <VolunteerMenu opportunityId={event.opportunityId}/>
          </Group>
        ) : (
          <Text fw={500} size="md">
            {event.name}
          </Text>
        )}

        <Group>
          <Text size="xs">
            Date: {time}
          </Text>
          <Text size="xs">{event.volunteersNeeded} volunteers wanted</Text>
        </Group>
      </Stack>

      <Text mt="lg" size="sm" c="dimmed">
        {event.description}
      </Text>

      {renderButtons()}
    </Card>
  );
};
export default VolunteerEventCard;
