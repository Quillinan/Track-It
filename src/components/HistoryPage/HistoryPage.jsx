import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function HistoryPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <NavBar />
      <PageContainer>
        <TitleContainer>
          <Title>Segunda, 17/05</Title>
        </TitleContainer>
        <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
      </PageContainer>
      <Footer />
    </div>
  );
}

const PageContainer = styled.div`
  height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-size: 18px;
  background: #f2f2f2;
  color: #666666;
  overflow-y: auto;
  padding: 0 20px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 30px;
  font-family: 'Lexend Deca';
`;

const Title = styled.p`
  font-style: normal;
  font-size: 23px;
  color: #126ba5;
`;
