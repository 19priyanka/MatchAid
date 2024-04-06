import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import VolunteerEventCard from "../../components/UserCards/VolunteerEventCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";
import { UserType } from "../../CustomTypes/UserType";

const upcomingEvents = [
  {
    Name: "Soup Kitchen",
    VolCount: 4,
    Date: "April 14",
    times: "8:30am-12:00pm",
    Description:
      "This is a description of the event that's going to take place.",
  },
  {
    Name: "Homeless Shelter",
    VolCount: 10,
    Date: "April 15",
    times: "2:30pm-9:00pm",
    Description:
      "This is a description of the event that's going to take place.",
  },
];
const pastEvents = [
  {
    Name: "Soup Kitchen",
    VolCount: 15,
    Date: "April 1",
    times: "8:30am-12:00pm",
    Description:
      "This is a description of the event that's going to take place.",
  },
  {
    Name: "Retirement Home",
    VolCount: 11,
    Date: "March 15",
    times: "2:30pm-9:00pm",
    Description:
      "This is a description of the event that's going to take place.",
  },
];

export default function homePage() {
  const [tabs, settabs] = useState(["Upcoming", "Past Events"]);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Layout>
      <SearchInput selected={currentTab} setTab={setCurrentTab} tabs={tabs} />

      
        {currentTab==0? (
          <Group justify="space-evenly" style={{ margin: 25 }}>
          {upcomingEvents.map((event, index) => {
            return <VolunteerEventCard key={index} event={event} />;
          })}
          </Group>
        ):(
          <Group justify="space-evenly" style={{ margin: 25 }}>
          {pastEvents.map((event, index) => {
            return <VolunteerEventCard key={index} event={event} />;
          })}
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
