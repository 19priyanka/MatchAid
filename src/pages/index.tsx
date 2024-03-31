import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Layout from "../components/shared/layout";
import SearchInput from "../components/SearchBar/SearchInput";
import { UserType } from "../CustomTypes/UserType";
import VolunteerEventCard from "../components/shared/VolunteerEventCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";

export default function homePage() {
  const [user, setUser] = useState("GUEST" as UserType);
  const volunteerEvents = [
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
      <SearchInput selected={0} tabs={renderTabs()} />

      <Group justify="space-evenly" style={{ margin: 25 }}>
        {volunteerEvents.map((event, index) => {
          return <VolunteerEventCard key={index} event={event} />;
        })}
      </Group>
    </Layout>
  );
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session?.user?.email && session?.user?.name) {
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
