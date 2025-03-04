import { signInAnonymously, updateProfile } from "firebase/auth";
import { auth } from ".";

export const signIn = async ({ username }: { username: string }) => {
  try {
    const { user } = await signInAnonymously(auth);
    await updateProfile(user, {
      displayName: username,
    });
    return user;
  } catch (error) {
    console.error("Erreur de connexion anonyme :", error);
  }
};
