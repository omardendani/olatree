// ______________________________________________
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";

export default function ProfileLayout() {
    // Récupère le paramètre ":profilename" de l'URL
    const { profilename } = useParams();
    
    // Récupère les informations utilisateur depuis le contexte
    const { user } = useContext(AuthContext); // AuthContext contient les infos utilisateur connecté

    // Vérifie si le profil demandé est celui de l'utilisateur connecté
    const isOwnProfile = user?.username === profilename;

    // Contenu spécifique si l'utilisateur est sur son propre profil
    const renderOwnProfile = () => (
        <div>
            <h1>Welcome to your profile, {user.username}!</h1>
            <button onClick={() => alert("Edit profile clicked")}>Edit Profile</button>
            <button onClick={() => alert("Logout clicked")}>Logout</button>
            {/* Ajoutez ici d'autres fonctionnalités spécifiques à l'utilisateur connecté */}
        </div>
    );

    // Contenu spécifique si l'utilisateur visite un autre profil
    const renderOtherProfile = () => (
        <div>
            <h1>Welcome to {profilename}'s profile!</h1>
            <p>This is the public profile of {profilename}.</p>
            {/* Ajoutez ici des détails spécifiques à un profil public */}
        </div>
    );

    return (
        <div>
            {/* Rend le contenu en fonction du profil */}
            {isOwnProfile ? renderOwnProfile() : renderOtherProfile()}
        </div>
    );
}
