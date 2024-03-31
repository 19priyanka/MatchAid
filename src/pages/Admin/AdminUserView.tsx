import React from "react";
import Layout from "../components/shared/layout";
import SearchInput from "../components/SearchBar/SearchInput";
import UsersStack from "../components/UserTable/AdminUserTable";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

function AdminUserView() {
  return (
    <div>
      <div>
        <main>
          <Layout>
            <SearchInput tabs={["Volunteers", "New Reports"]} selected={0} />
            <UsersStack />
          </Layout>
        </main>
      </div>
    </div>
  );
}

export default AdminUserView;

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
