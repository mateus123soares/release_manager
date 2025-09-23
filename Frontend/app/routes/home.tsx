import type { Route } from "./+types/home";
import { Dashboard } from "../pages/dashboard/Dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Release Manager" },
    { name: "description", content: "Release Manager for TL" },
  ];
}

import {Projects} from "../../mocks/projects"

export default function Home() {
  return <Dashboard 
      projects={Projects}
    />;
}
