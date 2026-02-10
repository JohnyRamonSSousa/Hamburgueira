import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged,
    User as FirebaseUser
} from "firebase/auth";
import { auth } from "../firebase";
import { User } from "../types";

export const signUp = async (email: string, password: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential.user;
};

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logout = async () => {
    await signOut(auth);
};

export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
            callback({
                name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuário',
                email: firebaseUser.email || '',
                registeredAt: new Date(firebaseUser.metadata.creationTime || Date.now())
            });
        } else {
            callback(null);
        }
    });
};
