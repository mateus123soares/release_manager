import type { Route } from "./+types/home";
import { useParams } from "react-router";

import { DeploymentManager } from "../pages/deployment/Deployment";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Deployment" },
    { name: "description", content: "Deployments projects" },
  ];
}

import {Projects} from "../../mocks/projects"

export default function Docs() {
    const { project } = useParams<{ project: string }>();

    return <DeploymentManager 
      project={Projects[0]}
    />;
}