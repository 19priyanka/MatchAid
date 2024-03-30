import React from "react";
import Layout from "../components/shared/layout";
import SearchInput from "../components/SearchBar/SearchInput";
import  UsersStack  from "../components/UserTable/AdminReportsTable";

function AdminViewReports(){
    return(
        <div>
        <div >
            <main>
                <Layout>
                <SearchInput tabs={["Volunteers", "New Reports"]} selected={1}/>
                <UsersStack />
                </Layout>
            </main>
        </div>
        </div>

    );
}

export default AdminViewReports;