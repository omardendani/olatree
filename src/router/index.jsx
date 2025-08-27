import { createBrowserRouter } from "react-router-dom";

// Layouts
    import NotFound from "../view/NotFound";

// Routes:
    import { generalRoutes } from "./generalRoutes";
    import { websiteRoutes } from "./websiteRoutes";
    
    // import { merchantRoutes } from "./merchantRoutes";


export const router = createBrowserRouter([

    // Routes générales
    ...generalRoutes,
    websiteRoutes,

    // Catch-all à la fin
    { 
        path: "*", 
        element: <NotFound /> 
    }

]);