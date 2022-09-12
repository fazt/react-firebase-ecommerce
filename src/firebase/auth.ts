import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from './config'

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () =>
    await signInWithPopup(auth, provider)