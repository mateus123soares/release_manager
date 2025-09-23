import type { Route } from "./+types/home";
import { ProjectForm } from "../pages/project/newProject";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Create new project" },
    { name: "description", content: "Create new project in release manager" },
  ];
}

export default function NewProject() {
  return <ProjectForm/>;
}
