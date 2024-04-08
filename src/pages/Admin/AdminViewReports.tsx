import React, {useState} from "react";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import UsersStack from "../../components/UserTable/AdminReportsTable";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { UserType } from "../../CustomTypes/UserType";

function AdminViewReports() {
  const [search, setSearch] = useState('');
  const searchBy=(search:string )=>{
    setSearch(search);
  }
  return (
    <div>
      <div>
        <main>
          <Layout>
            <SearchInput searchBy={searchBy} tabs={["Volunteers", "New Reports"]} selected={1} setTab={null} />
            <UsersStack searchTerm={search}/>
          </Layout>
        </main>
      </div>
    </div>
  );
}

export default AdminViewReports;

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
