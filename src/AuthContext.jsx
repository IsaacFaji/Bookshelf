import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  login as apiLogin,
  logout as apiLogout,
  getCurrentUser
} from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Restore authentication when the website loads
  useEffect(() => {
    async function restoreSession() {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (error) {
        setUser(null);

        if (error.status !== 401) {
          setAuthError("Unable to check your login session.");
        }
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  // Log in
  async function login(email, password) {
    const data = await apiLogin(email, password);

    setUser(data.user);
    setAuthError(null);

    return data;
  }

  // Log out
  async function logout() {
    await apiLogout();

    setUser(null);
    setAuthError(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        login,
        logout,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
