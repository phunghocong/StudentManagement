import { logout } from "../../api/accounts";
import { useEffect, } from "react";
import { Redirect } from "react-router";

export default function Logout() {
    useEffect(() => {
        logout();
        return <Redirect to="/dang-nhap/" />;

    })
    return (
        <div>
            <Redirect to="/dang-nhap/" />
        </div>
    );
}
