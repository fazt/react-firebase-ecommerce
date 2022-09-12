import { createContext, useContext, useEffect, useState } from 'react'
import { signInWithGoogle, } from '../firebase/auth'
import { UserInfo, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase/config'

export const AuthContext = createContext<any>(null)

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserInfo>()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithGoogle()
            setUser(result.user)
        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        await signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user)
                setIsAuthenticated(true)
            } else {
                setUser(undefined)
                setIsAuthenticated(false)
            }
        })
        return () => unsubscribe()
    })


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    )
}