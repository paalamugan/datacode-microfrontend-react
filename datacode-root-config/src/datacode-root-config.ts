import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout, {
  loaders: {
    navbar: "<h1 class='flex items-center justify-start h-16 px-6 text-white bg-primary'>Loading navbar</h1>",
    home: "<h1 class='flex items-center justify-center h-16 px-6'>Loading home</h1>",
    technology: "<h1 class='flex items-center justify-center h-16 px-6'>Loading technology</h1>",
    education: "<h1 class='flex items-center justify-center h-16 px-6'>Loading education</h1>",
    footer: "<h1 class='flex items-center justify-center h-16 px-6 text-white bg-primary'>Loading footer</h1>",
  },
  props: {
    navbar: {
      name: "navbar"
    }
  },
  errors: {
    navbar: "<h1>Failed to load navbar</h1>",
    home: "<h1 class='flex items-center justify-center h-16 px-6'>Failed to load home page</h1>",
    technology: "<h1 class='flex items-center justify-center h-16 px-6'>Failed to load technology page</h1>",
    education: "<h1 class='flex items-center justify-center h-16 px-6'>Failed to load education page</h1>",
    footer: "<h1 class='flex items-center justify-center'>Failed to load footer</h1>",
  },
});

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications, active: false });

applications.forEach(registerApplication);

System.import("@datacode/styleguide").then(() => {
  // Activate the layout engine once the styleguide CSS is loaded
  layoutEngine.activate();
  start();
});
