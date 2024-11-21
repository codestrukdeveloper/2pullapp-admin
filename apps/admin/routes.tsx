import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdList,
  MdAdd,
} from "react-icons/md";

import { IRoute } from "types/navigation";

const routes: IRoute[] = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "Clubs",
    layout: "/admin",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    children: [
      {
        name: "All Clubs",
        layout: "/admin",
        path: "/club",
        icon: <Icon as={MdList} width="20px" height="20px" color="inherit" />,
      },
      {
        name: "Add Clubs",
        layout: "/admin",
        path: "/club/add",
        icon: <Icon as={MdAdd} width="20px" height="20px" color="inherit" />,
      },
    ],
  },
  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  },
];

export default routes;
