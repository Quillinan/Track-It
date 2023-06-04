import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterClick = () => {
    navigate('/cadastro');
  };

  const handleLoginClick = async () => {
    try {
      const response = await login(email, password);

      if (response.ok) {
        navigate('/habitos');
      } else {
        console.error('Erro ao fazer login:', response.error);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/habitos');
    }
  }, [user, navigate]);

  return (
    <PageContainer>
      <img src={'Logo.svg'} alt="logo" />
      <FormContainer>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLoginClick}>Entrar</button>
        <p onClick={handleRegisterClick}>Não tem uma conta? Cadastre-se!</p>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lexend Deca';
  text-align: center;
  background: #ffffff;
  p {
    margin-top: 25px;
    font-style: normal;
    text-decoration-line: underline;
    color: #52b6ff;
  }
  img {
    margin-top: 68px;
    width: 180px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  font-size: 14px;
  align-items: center button {
    width: calc(100vw - 50px);
  }
  input {
    width: calc(100vw - 70px);
  }
`;
