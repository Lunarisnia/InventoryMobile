import { useStorageState } from "@/internal/storage/usesStorageState";
import { createContext, PropsWithChildren, useContext } from "react";

interface AuthInfo {
  signIn: () => void;
  signOut: () => void;
  session: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthInfo>({
  signIn: () => null,
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
      signIn: () => {
        // actual login logic goes here
        setSession("token-from-api-goes-here");
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
