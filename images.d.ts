declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "rc-time-picker";
declare module "react-parallax";
declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const value: DocumentNode;
  export = value;
}
