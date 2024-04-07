import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import VolunteerEventCard from "../../components/UserCards/VolunteerEventCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";
import { UserType } from "../../CustomTypes/UserType";
import { useSession } from "next-auth/react";

export default function myEvents() {
  const [tabs, settabs] = useState(["Upcoming", "Past Events"]);
  const [currentTab, setCurrentTab] = useState(0);
  const { data: session } = useSession();
  const [upcomingEvents, setUpcoming] = useState([]);
  const [pastEvents, setPast] = useState([]);

  useEffect(() => {
    console.log("session.user is: ",session?.user?.name);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "user1@example.com",
      })
    };
    console.log(requestOptions);
    fetch('/api/opportunities/myEvents', requestOptions)
      .then(response => response.json())
      .then(responseData =>{
        console.log("updated status: ", responseData);
        const currentDate = new Date(); // Get the current date and time

        setUpcoming( responseData.filter(event => {
          const eventDate = new Date(event._doc.time);
          return eventDate > currentDate; // Filter events with time greater than current time
        }));
        console.log(upcomingEvents);

        setPast( responseData.filter(event => {
          const eventDate = new Date(event._doc.time);
          return eventDate <= currentDate; // Filter events with time less than or equal to current time
        }));
        console.log(pastEvents);

      })
      .catch(error => console.error('Error:', error));

  }, []);

  return (
    <Layout>
      <SearchInput selected={currentTab} setTab={setCurrentTab} tabs={tabs} />

      
        {currentTab==0? (
          <Group justify="space-evenly" style={{ margin: 25 }}>
          {upcomingEvents.length > 0 ? (upcomingEvents.map((event, index) => {
            return <VolunteerEventCard key={index} event={event} />;
          })) : (
            <div>You're not registered for any upcoming events</div>
          )}
          </Group>
        ):(
          <Group justify="space-evenly" style={{ margin: 25 }}>
          {pastEvents.length > 0 ? (pastEvents.map((event, index) => {
            return <VolunteerEventCard key={index} event={event} />;
          })) : (
            <div>You have no past events</div>
          )}
          </Group>
        )}
    </Layout>
  );
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    !(session?.user?.email && session?.user?.name) ||
    session?.user?.name !== UserType.VOLUNTEER
  ) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export { getServerSideProps };
