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

type UserInfo = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  provider?: 'google' | 'email' | 'unknown';
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

const storeTokenToServer = async (token: string) => {
  await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
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
    provider: 'email',
  };

  useUserStore.getState().setUser(userData);
  await createUserDocIfNotExists(userData);

  const token = await user.getIdToken();
  await storeTokenToServer(token);

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
      provider: 'email',
    };

    useUserStore.getState().setUser(userDataStore);
    await createUserDocIfNotExists(userDataStore);
  }

  const token = await user.getIdToken();
  await storeTokenToServer(token);

  return userCredential;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  provider.addScope('https://www.googleapis.com/auth/calendar');

  const userCredential = await signInWithPopup(auth, provider);
  const { user } = userCredential;

  const credential = GoogleAuthProvider.credentialFromResult(userCredential);
  const accessToken = credential?.accessToken;

  if (accessToken) {
    localStorage.setItem('google_access_token', accessToken);
  }

  const userData: UserInfo = {
    uid: user.uid,
    name: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };

  useUserStore.getState().setUser(userData);
  await createUserDocIfNotExists(userData);

  const token = await user.getIdToken();
  await storeTokenToServer(token);

  return userCredential;
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    useUserStore.getState().logout();

    localStorage.removeItem('google_access_token');

    await fetch('/api/session', { method: 'DELETE' });

    window.location.href = '/login';
  } catch (error) {
    console.error('Error during logout:', error);
    useUserStore.getState().logout();

    localStorage.removeItem('google_access_token');

    window.location.href = '/login';
  }
};

export const getLoginProvider = async (): Promise<
  'google' | 'email' | 'unknown'
> => {
  const user = auth.currentUser;

  if (!user) return 'unknown';

  const providers = user.providerData.map((p) => p.providerId);

  if (providers.includes('google.com')) return 'google';
  if (providers.includes('password')) return 'email';

  return 'unknown';
};
