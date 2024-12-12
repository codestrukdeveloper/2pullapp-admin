


import { IRoute } from "types/navigation";
import { MdHome, MdLock, MdPerson } from "react-icons/md";
import { FaRegUser, FaPlus, FaUserPlus, FaRegBuilding } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";

const routes: IRoute[] = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: MdHome,
  },

  {
    path: "/auth/sign-in",
    name: "Sign In",
    icon: MdLock,
  },
  {
    name: "Clubs",
    layout: "admin",
    icon: FaRegBuilding,
    children: [
      {
        name: "Clubs",
        layout: "admin",
        path: "club",
        icon: FaRegBuilding,
      },
      {
        name: "Add Clubs",
        layout: "admin",
        path: "club/addClub",
        icon: FaPlus,
      },
    ],
  },
  {
    name: "Users",
    layout: "admin",
    icon: FaRegUser,
    children: [
      {
        name: "User",
        layout: "admin",
        path: "users",
        icon: MdPerson,
      },
      {
        name: "Add Clubs",
        layout: "admin",
        path: "users/addUser",
        icon: FaUserPlus,
      },
    ],
  },
  {
    name: "Advertisement",
    layout: "admin",
    icon: RiAdvertisementFill,
    children: [
      {
        name: "Advertisement",
        layout: "admin",
        path: "advertisement",
        icon: RiAdvertisementFill,
      },
      {
        name: "Add Advertisement",
        layout: "admin",
        path: "advertisement/addAds",
        icon: FaUserPlus,
      },
    ],
  },
];
export default routes;
