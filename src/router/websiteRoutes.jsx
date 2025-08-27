import DynamicWebsiteRoute from "./DynamicWebsiteRoute";

// Déclaration des routes pour le site web
export const websiteRoutes = {
    path: "/:profilename",
    element: <DynamicWebsiteRoute />
};
