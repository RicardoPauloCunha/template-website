import { Outlet } from "react-router-dom";
import { LayoutEl } from "./styles";

const Layout = () => {
    return (
        <LayoutEl
            className="container-sm"
        >
            <Outlet />
        </LayoutEl>
    )
}

export default Layout;