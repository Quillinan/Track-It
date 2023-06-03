import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function RegistrationPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  const handleRegistrationClick = () => {
    navigate('/habitos');
  };

  return (
    <PageContainer>
      <img src={'Logo.svg'} alt="logo" />
      <FormContainer>
        <input placeholder="email" />
        <input placeholder="senha" />
        <input placeholder="nome" />
        <input placeholder="foto" />
        <button onClick={handleRegistrationClick}>Cadastrar</button>
        <p onClick={handleClick}>Já tem uma conta? Faça login!</p>
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
