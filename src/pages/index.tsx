import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/shared/layout";
import SearchInput from "../components/SearchBar/SearchInput";
import { UserType } from "../CustomTypes/UserType";
import VolunteerEventCard from "../components/UserCards/VolunteerEventCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function homePage() {
  const [tabs, settabs] = useState([]);
  const { data: session } = useSession();
  const [user, setUser] = useState(session?.user?.name);
  const [currentTab, setCurrentTab] = useState(0);
  const [volunteerEvents, setVolunteerEvents] = useState([]);
  const [tab0, setTab0] = useState([]);
  const [tab1, setTab1] = useState([]);
  const [tab2, setTab2] = useState([]);
  
  useEffect(() => {
    setUser(session?.user?.name);
    console.log("user is: ",user);
    console.log("session is: ",session);
    console.log("email is: ",session?.user?.email);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: session?.user?.email,
        userType: session?.user?.name,
      })
    };
    console.log(requestOptions);
    fetch('/api/opportunities', requestOptions)
      .then(response => response.json())
      .then(responseData =>{
        console.log("opportunities: ", responseData);
        if(responseData.message){
          console.log("got message response back")
          return;
        }
        const currentDate = new Date();
        console.log("date is: ", currentDate);
        switch(user){
          case UserType.ADMIN:
            console.log("userType is amdin, splitting data");
            setTab0(responseData.filter(event => {
              return (event.status == 'Pending'); // Filter events with time greater than current time
            }));
            console.log(tab0);
            setTab1(responseData.filter(event => {
              const eventDate = new Date(event.time);
              return eventDate > currentDate && event.status == 'Accepted'; // Filter events with time greater than current time
            }));
            console.log(tab1);
            setTab2(responseData.filter(event => {
              const eventDate = new Date(event.time);
              return eventDate <= currentDate && event.status == 'Accepted'; // Filter events with time greater than current time
            }));
            console.log(tab2);
            break;  
          case UserType.ORGANIZATION:
            
            setTab0(responseData.filter(event => {
              const eventDate = new Date(event.time);
              return eventDate > currentDate ; // Filter events with time greater than current time
            }));
            setTab1(responseData.filter(event => {
              const eventDate = new Date(event.time);
              return eventDate <= currentDate ; // Filter events with time greater than current time
            }));
            break;
          default:
            setTab0(responseData);
            break;
        }
        console.log("setting events = to tab0: ", tab0);
        setVolunteerEvents(tab0);
      })
      .catch(error => console.error('Error:', error));
  }, [ session]); // Dependency array ensures the effect runs when selectedTab changes

  useEffect(() => {
    if(currentTab == 1){
      setVolunteerEvents(tab1);
    }else if(currentTab == 2){
      setVolunteerEvents(tab2);
    }else{
      setVolunteerEvents(tab0);
    }
  }, [currentTab, tab0, tab1, tab2]);

  const renderTabs = () => {
    switch (user) {
      case UserType.ADMIN:
        return ["Pending", "Upcoming", "Past Events"];
      case UserType.ORGANIZATION:
        return ["Upcoming Events", "Past Events"];
      default:
        return [];
    }
  };

  return (
    <Layout>
      <SearchInput
        selected={currentTab}
        tabs={renderTabs()}
        setTab={setCurrentTab}
      />

      <Group justify="space-evenly" style={{ margin: 25 }}>
        {volunteerEvents.length >0? (
        volunteerEvents?.map((event, index) => {
          return <VolunteerEventCard attending={false} key={index} event={event} />;
        })) : (
          <div>No Events found</div>
        )}
      </Group>
    </Layout>
  );
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!(session?.user?.email && session?.user?.name)) {
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
