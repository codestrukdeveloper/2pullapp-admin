// import { ReactComponentElement } from "react";

// export interface IRoute {
//   name: string;
//   layout: string; 
//   icon: ReactComponentElement | string;
//   secondary?: boolean;
//   path: string;
// }
import { IconType } from 'react-icons';

export interface IRoute {
  name: string;
  layout?: string;
  path?: string;
  icon?: IconType;
  secondary?: boolean;
  
  // Add children explicitly to the type
  children?: Array<{
    name: string;
    layout?: string;
    path?: string;
    icon?: IconType;
  }>;
}
