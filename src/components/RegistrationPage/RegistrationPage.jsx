import styled from 'styled-components';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const { login } = useContext(AuthContext);

  const handleLoginClick = () => {
    navigate('/');
  };

  const handleRegistrationClick = async () => {
    try {
      const response = await fetch(
        'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            name,
            image,
            password,
          }),
        }
      );

      if (response.ok) {
        await login(email, password);
        navigate('/habitos');
      } else {
        throw new Error('Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <PageContainer>
      <img src={'Logo.svg'} alt="logo" />
      <FormContainer>
        <input
          data-test="email-input"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-test="password-input"
          placeholder="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          data-test="user-name-input"
          placeholder="nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          data-test="user-image-input"
          placeholder="foto"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button data-test="signup-btn" onClick={handleRegistrationClick}>
          Cadastrar
        </button>
        <p data-test="login-link" onClick={handleLoginClick}>
          Já tem uma conta? Faça login!
        </p>
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
    width: calc(100vw - 200px);
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
