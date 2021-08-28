import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

// definindo os tipos de user e da função signInWithGoogle
type AuthcontextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}
// definindo o tipo de usuário
type User = {
  id: string;
  name: string;
  avatar: string;
}
// definindo o tipo de props
type AuthcontextProviderProps = {
  children: ReactNode;
}

// exportando o contexto de autenticação
export const AuthContext = createContext({} as AuthcontextType);

export function AuthcontextProvider(props: AuthcontextProviderProps) {

  const [user, setUser] = useState<User>();
  // hook para verificar se o usuário já havia logado e retornar os dados do mesmo ao clicar no refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        // verifica se o usuário tem foto e nome
        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    // encerra o evento do status de logado
    return () => {
      unsubscribe();
    }
  }, [])

  async function signInWithGoogle() {
    // criando a autenticação com o Google
    const provider = new firebase.auth.GoogleAuthProvider();
    // base da autenticação com o google
    const result = await auth.signInWithPopup(provider);
    // verifica se o usuário está logado
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      // verifica se o usuário tem foto e nome
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}