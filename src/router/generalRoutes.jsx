import { lazy, Suspense } from "react";

import BaserageLoader from "../utils/BaserageLoader";

import DefaultLayout from "../layouts/Baserage/DefaultLayout";
import GuestLayout from "../layouts/Baserage/GuestLayout";

// Chargement dynamique avec React.lazy
const loadUserComponent = (templateName, componentPath) =>
    lazy(() =>
            import(`../view/Baserage/${templateName}/${componentPath}`).then((module) => ({
            default: module.default,
        }))
    );

// Chargement des composants du template
const templateName = "default"; // Exemple : récupéré dynamiquement
const LoginLayout = loadUserComponent(templateName, "layouts/LoginLayout");

const Home = loadUserComponent(templateName, "pages/Home");
const Login = loadUserComponent(templateName, "pages/Login");
const Signup = loadUserComponent(templateName, "pages/Signup");


// Déclaration des routes générales
export const generalRoutes = [
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <BaserageLoader templateName={templateName}>
                    <DefaultLayout/>
                </BaserageLoader>
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "contact",
                element: <p>Contact</p>,
            },
        ],
    },
    {
        path: "/",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <BaserageLoader templateName={templateName}>
                    <GuestLayout>
                        <LoginLayout/>
                    </GuestLayout>
                </BaserageLoader>
            </Suspense>
        ),
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <Signup />,
            },
        ],
    },
];
