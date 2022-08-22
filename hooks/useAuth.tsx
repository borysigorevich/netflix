import {useState, useContext, createContext, useEffect, useMemo, ReactNode} from "react"
import {useRouter} from 'next/router'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    User
} from 'firebase/auth'

import {auth} from '../firebase'

type AuthFn = (email: string, password: string) => void

type AuthContextType = {
    signUp: AuthFn
    signIn: AuthFn
    logout: () => void
    loading: boolean
    user: User | null
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

type AuthProviderProps = {
    children: ReactNode
}

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [isSSR, setIsSSR] = useState(true)
    const router = useRouter()

    const signUp = async (email: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }

    const logout = async () => {
        setLoading(true)

        await signOut(auth)
            .then(() => setUser(null))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    const memoizedValue = useMemo(() => ({
        signIn,
        signUp,
        logout,
        loading,
        user
    }), [loading, user])

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(true)
                await router.push('/login')
            }
            // setIsSSR(false)
        })

    }, [auth])

    return <AuthContext.Provider value={memoizedValue}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)