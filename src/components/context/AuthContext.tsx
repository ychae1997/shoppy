import { createContext, useContext, useEffect, useState } from "react";
import { ProtectedRouteType } from "../../types/elementTypes";
import { NullableUser, AuthType } from "../../types/authTypes";
import { login, logout, onUserStateChange } from "../../api/firebase";

export const AuthContext = createContext<AuthType | undefined>(undefined);

export function AuthContextProvider({ children }: ProtectedRouteType) {
  const [user, setUser] = useState<NullableUser>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    onUserStateChange((user: NullableUser) => {
      setUser(user);
      setIsLoading(false);
    });
    return () => {
      setIsLoading(true);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
