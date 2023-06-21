import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [completedHabits, setCompletedHabits] = useState(0);

  const updateCompletedHabits = (totalCompleted) => {
    setCompletedHabits(totalCompleted);
  };

  const login = async (email, password) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        setUser(data);
        return { ok: true, data };
      } else {
        setIsLoading(false);
        return { ok: false };
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false);
      throw error;
    }
  };
  // Função para fazer logout do usuário
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        completedHabits,
        setCompletedHabits,
        updateCompletedHabits,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
