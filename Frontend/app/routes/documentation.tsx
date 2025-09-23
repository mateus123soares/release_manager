import type { Route } from "./+types/home";
import { useParams } from "react-router";

import { Documentation } from "../pages/documentation/Documentation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Release Manager" },
    { name: "description", content: "Documentation for projects" },
  ];
}

import {Projects} from "../../mocks/projects"

export default function Docs() {
    const { project } = useParams<{ project: string }>();

    return <Documentation 
      project={Projects[0]}
    />;
}