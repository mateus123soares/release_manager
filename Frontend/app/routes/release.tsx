import type { Route } from "./+types/home";
import { useParams } from "react-router";

import { ReleaseManager } from "../pages/releases/Releases";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Deployment" },
    { name: "description", content: "Releases projects" },
  ];
}

import {Projects} from "../../mocks/projects"

export default function Docs() {
    const { project } = useParams<{ project: string }>();

    return <ReleaseManager 
      project={Projects[0]}
    />;
}