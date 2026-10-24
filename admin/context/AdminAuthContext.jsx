import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(authService.getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifySession() {
      const existingToken = authService.getToken();
      if (!existingToken) {
        setLoading(false);
        return;
      }
      try {
        const res = await authService.verify();
        if (res.authenticated) {
          setUser(res.admin);
          setToken(existingToken);
        } else {
          authService.logout();
        }
      } catch {
        authService.logout();
      } finally {
        setLoading(false);
      }
    }

    verifySession();
  }, []);

  const login = async (username, password) => {
    const res = await authService.login(username, password);
    if (res.success) {
      setUser(res.admin);
      setToken(res.token);
    }
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    authService.logout();
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token),
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
};
