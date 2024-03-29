import React from "react";
import VolunteerNavBar from "../../components/NavBar/VolunteerNavBar";
import  UsersStack  from "../../components/UserTable/AdminUserTable";

function AdminUserView(){
    return(
        <div>
        <div >
            <main>
                <UsersStack />
            </main>
        </div>
        </div>

    );
}

export default AdminUserView;