import React from "react";
import Layout from "../../components/shared/layout";
import SearchInput from "../../components/SearchBar/SearchInput";
import { UsersStack } from "../../components/UserTable/OrganizationUserTable";

function organizationUserView(){
    return(
        <div>
        <div >
            <Layout>
            <SearchInput tabs={[]}/>
                <UsersStack />
            </Layout>
        </div>
        </div>

    );
}
export default organizationUserView;