import React from 'react'
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
export const SidebarData= [
    {
        title : "Home",
        icon:<HomeIcon/>,
        link:"/Home"
    },
    {
        title : "Settings",
        icon:<SettingsIcon/>,
        link:"/Settings"
    },
    {
        title : "Profile",
        icon:<PersonIcon/>,
        link:"/Profile"
    },
    {
        title : "Update",
        icon:<EditIcon/>,
        link:"/Update"
    }
]
  

