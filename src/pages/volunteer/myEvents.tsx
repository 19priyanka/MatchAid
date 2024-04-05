import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import VolunteerEventCard from "../../components/UserCards/VolunteerEventCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";
import { UserType } from "../../CustomTypes/UserType";

export default function homePage() {
  const [tabs, settabs] = useState(["Upcoming", "Past Events"]);
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

  return (
    <Layout>
      <SearchInput selected={0} tabs={tabs} />

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
