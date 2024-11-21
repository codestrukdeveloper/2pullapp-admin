import { ReactNode } from "react";

export interface IRoute {
  name: string;
  layout: string;
  path?: string;
  icon: ReactNode;
  children?: IRoute[]; // Add this optional children property
}
