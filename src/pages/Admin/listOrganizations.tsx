import type { GetServerSideProps } from "next";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import { UserType } from "../../CustomTypes/UserType";
import OrganizationCard from "../../components/UserCards/OrganizationCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";
import { useState } from "react";

export default function homePage() {
  const tabs = ["All Organizations", "Reported Organizations"];
  const [currentTab, setCurrentTab] = useState(0);
  const organizations = [
    {
      Name: "Soup Kitchen",
      Description:
        "This is a description of the event that's going to take place.",
      reporter:{
        email: "user1@example.com",
        name: "volunteer 1",
      }
    },
    {
      Name: "Homeless Shelter",
      Description:
        "This is a description of the event that's going to take place.",
        reporter:{
          email: "user3@example.com",
          name: "volunteer 3",
        }
    },
  ];

  return (
    <Layout>
      <SearchInput selected={currentTab} setTab={setCurrentTab} tabs={tabs} />

      <Group justify="space-evenly" style={{ margin: 25 }}>
        {organizations.map((organization, index) => {
          return <OrganizationCard key={index} organization={organization} />;
        })}
      </Group>
    </Layout>
  );
}

const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    !(session?.user?.email && session?.user?.name) ||
    session?.user?.name !== UserType.ADMIN
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
