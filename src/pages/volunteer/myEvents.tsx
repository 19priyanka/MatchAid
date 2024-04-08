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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("session.user is: ",session?.user?.email);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // email: session?.user?.email,
        email: "user1@example.com"
      })
    };
    console.log(requestOptions);
    fetch('/api/opportunities/myEvents', requestOptions)
      .then(response => response.json())
        .then((responseData) => {
          const currentDate = new Date();
          const upcoming = responseData.filter(
            (event) => new Date(event.time) > currentDate
          );
          const past = responseData.filter(
            (event) => new Date(event.time) <= currentDate
          );
          setUpcoming(upcoming);
          
          setPast(past);
         
       
        })
        .catch((error) => console.error("Error:", error));
    
  }, [currentTab]);
  

  const filterData = (search: string) => {
    const filteredEvents =
      currentTab === 1
        ? upcomingEvents.filter((event) =>
            event.name.toLowerCase().includes(search.toLowerCase())
           
          )
        : pastEvents.filter((event) =>
            event.name.toLowerCase().includes(search.toLowerCase())
          );
          console.log("filteredEvents: ", filteredEvents);
    setEvents(filteredEvents);
  };
  

  return (
    <Layout>
      <SearchInput searchBy={filterData} selected={currentTab} setTab={setCurrentTab} tabs={tabs} />

      
      <Group justify="space-evenly" style={{ margin: 25 }}>
      {currentTab === 0 ? (
        <>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <VolunteerEventCard attending={true} key={index} event={event} />
            ))
          ) : (
            <div>You're not registered for any upcoming events</div>
          )}
        </>
      ) : (
        <>
          {pastEvents.length > 0 ? (
            pastEvents.map((event, index) => (
              <VolunteerEventCard attending={true} key={index} event={event} />
            ))
          ) : (
            <div>You have no past events</div>
          )}
        </>
      )}
    </Group>
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
