// import { Icon } from '@chakra-ui/react';
// import {
//   MdBarChart,
//   MdPerson,
//   MdHome,
//   MdLock,
//   MdOutlineShoppingCart,
// } from 'react-icons/md';

// // Admin Imports
// // import MainDashboard from './pages/admin/default';
// // import NFTMarketplace from './pages/admin/nft-marketplace';
// // import Profile from './pages/admin/profile';
// // import DataTables from './pages/admin/data-tables';
// // import RTL from './pages/rtl/rtl-default';

// // Auth Imports
//  import SignInCentered from './pages/auth/sign-in';
// import { IRoute } from 'types/navigation';

// const routes: IRoute[] = [
//   {
//     name: 'Main Dashboard',
//     layout: '/admin',
//     path: '/default',
//     icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
//   },
//   // {
//   //   name: 'NFT Marketplace',
//   //   layout: '/admin',
//   //   path: '/nft-marketplace',
//   //   icon: (
//   //     <Icon
//   //       as={MdOutlineShoppingCart}
//   //       width="20px"
//   //       height="20px"
//   //       color="inherit"
//   //     />
//   //   ),
//   //   secondary: true,
//   // },x
//   // {
//   //   name: 'Data Tables',
//   //   layout: '/admin',
//   //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
//   //   path: '/data-tables',
//   // },
//   {
//     name: 'Club',
//     layout: '/admin',
//     path: '/club',
//     icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
//   },
//   {
//     name: 'Users',
//     layout: '/admin',
//     path: '/users',
//     icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
//   },
//   {
//     name: 'Sign In',
//     layout: '/auth',
//     path: '/sign-in',
//     icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
//   },
//   {
//     name: 'RTL Admin',
//     layout: '/rtl',
//     path: '/rtl-default',
//     icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
//   },
// ];

// export default routes;




import { IRoute } from "types/navigation";
import { MdHome, MdLock, MdPerson } from "react-icons/md";
import { FaRegUser, FaPlus, FaUserPlus, FaRegBuilding } from "react-icons/fa6";

const routes: IRoute[] = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: MdHome,
  },
  // {
  //   name: "Profile",
  //   layout: "admin",
  //   path: "profile",
  //   icon: MdLock,
  // },
  {
    path: "/auth/sign-in", // Ensure this matches exactly
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
        path: "club/add",
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
  // {
  //   name: "Users",
  //   layout: "admin",
  //   path: "users",
  // },
];
export default routes;
