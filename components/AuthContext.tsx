import { login } from "@/internal/authorization/login";
import { useStorageState } from "@/internal/storage/usesStorageState";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface AuthInfo {
  signIn: (nis: string, password: string) => Promise<void>;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthInfo>({
  signIn: async () => { },
  signOut: () => null,
  session: null,
  isLoading: false,
})

export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return <AuthContext.Provider
    value={{
      // TODO: add param for nis and password
      signIn: async (nis: string, password: string) => {
        // actual login logic goes here
        const loginResponse = await login(nis, password);
        setSession(loginResponse.token);
        //setSession("token-from-api-goes-here");
      },
      signOut: () => {
        // call the logout api here
        setSession(null);
      },
      session,
      isLoading,
    }}
  >
    {children}
  </AuthContext.Provider>
}
