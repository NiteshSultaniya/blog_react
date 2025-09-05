import { NavLink } from "react-router-dom"
import Dashboard from "../Dashboard/Dashboard"
import MenuSideBar from "./MenuSideBar"
import MenuUpperBar from "./MenuUpperBar"

const MenuBar = () => {
    return <>
        <MenuSideBar />
        <MenuUpperBar />
    </>

}

export default MenuBar