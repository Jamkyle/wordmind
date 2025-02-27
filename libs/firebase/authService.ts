import { signInAnonymously } from "firebase/auth";
import { auth } from ".";

// Fonction pour connecter anonymement un joueur (optionnel)
export const signIn = async () => {
  try {
    await signInAnonymously(auth);
  } catch (error) {
    console.error("Erreur de connexion anonyme :", error);
  }
};
