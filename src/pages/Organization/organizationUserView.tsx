import React, {useState} from "react";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import { UsersStack } from "../../components/UserTable/OrganizationUserTable";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { UserType } from "../../CustomTypes/UserType";

export default function organizationUserView() {
  const [search, setSearch] = useState('');
  const searchBy=(searchTerm )=>{
    console.log("search starts at ",search);
    setSearch(searchTerm);
    console.log("set search in view to ",search);
    console.log("searchTerm is ", searchTerm)
  }
  return (
    <div>
      <div>
        <Layout>
          <SearchInput searchBy={searchBy} setTab={null} selected={null} tabs={[]} />
          <UsersStack searchTerm={search}/>
        </Layout>
      </div>
    </div>
  );
}
const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (
    !(session?.user?.email && session?.user?.name) ||
    session?.user?.name !== UserType.ORGANIZATION
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
