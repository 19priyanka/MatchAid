import React from "react";
import Layout from "../components/shared/layout";
import SearchInput from "../components/SearchBar/SearchInput";
import { UsersStack } from "../components/UserTable/OrganizationUserTable";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

function organizationUserView() {
  return (
    <div>
      <div>
        <Layout>
          <SearchInput tabs={[]} />
          <UsersStack />
        </Layout>
      </div>
    </div>
  );
}
export default organizationUserView;

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
