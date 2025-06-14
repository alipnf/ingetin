import { auth, db } from './config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useUserStore } from '@/store/user-store';

type UserInfo = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
};

const createUserDocIfNotExists = async (user: UserInfo) => {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(),
    });
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { user } = userCredential;

  const userData = {
    uid: user.uid,
    name: username,
    email: user.email,
    photoURL: user.photoURL,
  };

  useUserStore.getState().setUser(userData);
  await createUserDocIfNotExists(userData);

  return userCredential;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { user } = userCredential;

  const userData = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  useUserStore.getState().setUser(userData);
  await createUserDocIfNotExists(userData);

  return userCredential;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const { user } = userCredential;

  const userData = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  useUserStore.getState().setUser(userData);
  await createUserDocIfNotExists(userData);

  return userCredential;
};

export const logoutUser = async () => {
  await signOut(auth);
  useUserStore.getState().logout();
};
