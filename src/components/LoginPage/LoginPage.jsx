import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cadastro");
  };

  const handleLoginClick = () => {
    navigate("/habitos");
  };

  return (
    <PageContainer>
      <img src={"Logo.svg"} alt="logo" />
      <FormContainer>
        <input placeholder="email" />
        <input placeholder="senha" />
        <button onClick={handleLoginClick}>Entrar</button>
        <p onClick={handleClick}>Não tem uma conta? Cadastre-se!</p>
      </FormContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lexend Deca";
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
