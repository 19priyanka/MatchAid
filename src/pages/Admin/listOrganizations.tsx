import type { GetServerSideProps } from "next";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import { UserType } from "../../CustomTypes/UserType";
import OrganizationCard from "../../components/UserCards/OrganizationCard";
import { Group } from "@mantine/core";
import { getSession } from "next-auth/react";

export default function homePage() {
  const tabs = ["All Organizations", "Reported Organizations"];
  const organizations = [
    {
      Name: "Soup Kitchen",
      Description:
        "This is a description of the event that's going to take place.",
    },
    {
      Name: "Homeless Shelter",
      Description:
        "This is a description of the event that's going to take place.",
    },
  ];

  return (
    <Layout>
      <SearchInput selected={0} tabs={tabs} />

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
