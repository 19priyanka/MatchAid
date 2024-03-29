import React from "react";
import VolunteerNavBar from "../../components/NavBar/VolunteerNavBar";
import { UsersStack } from "../../components/UserTable/OrganizationUserTable";

export default function organizationUserView(){
    return(
        <div>
        <div >
            <VolunteerNavBar />
            <main style={{ marginLeft : "25%" } }>
                <UsersStack />
            </main>
        </div>
        </div>

    );
}