import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("project/create","routes/project.tsx"),
    route("docs/:project","routes/documentation.tsx"),
    route("deployment/:project","routes/deployment.tsx"),
    route("release/:project","routes/release.tsx")
] satisfies RouteConfig;
