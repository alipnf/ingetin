import { auth, db } from './config-client';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useUserStore } from '@/store/user-store';
import Cookies from 'js-cookie';

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

  const userData: UserInfo = {
    uid: user.uid,
    name: username,
    email: user.email,
    photoURL: user.photoURL,
  };

  useUserStore.getState().setUser(userData);
  await createUserDocIfNotExists(userData);

  const token = await user.getIdToken();
  Cookies.set('token', token, { expires: 1 });

  return userCredential;
};

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const { user } = userCredential;

  const dbUserRef = doc(db, 'users', user.uid);
  const dbUserSnap = await getDoc(dbUserRef);

  if (dbUserSnap.exists()) {
    const userData = dbUserSnap.data();
    const userDataStore: UserInfo = {
      uid: user.uid,
      name: userData.displayName || userData.name,
      email: user.email,
      photoURL: user.photoURL,
    };

    useUserStore.getState().setUser(userDataStore);
    await createUserDocIfNotExists(userDataStore);
  }

  const token = await user.getIdToken();
  Cookies.set('token', token, { expires: 1 });

  return userCredential;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const { user } = userCredential;

  const userData: UserInfo = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  useUserStore.getState().setUser(userData);
  await createUserDocIfNotExists(userData);

  const token = await user.getIdToken();
  Cookies.set('token', token, { expires: 1 });

  return userCredential;
};

export const logoutUser = async () => {
  await signOut(auth);
  useUserStore.getState().logout();
  Cookies.remove('token'); // 🔐 Hapus token
};
