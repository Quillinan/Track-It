import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/footer';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TodayPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habitData, setHabitData] = useState(null);
  const token = user.token;
  const [habitCompleted, setHabitCompleted] = useState(false);

  const handleCheckClick = async () => {
    try {
      const response = await fetch(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitData.id}/check`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setHabitCompleted(true);
      } else if (response.status === 400) {
        throw new Error('Erro ao concluir hábito');
      }
    } catch (error) {
      console.error('Erro ao concluir hábito:', error);
    }
  };

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await fetch(
          'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setHabitData(data[0]);
        } else {
          throw new Error('Erro ao obter dados do hábito');
        }
      } catch (error) {
        console.error('Erro ao obter dados do hábito:', error);
      }
    };

    if (!user) {
      navigate('/');
    } else if (token) {
      fetchHabitData();
    }
  }, [user, token, navigate]);

  if (!habitData) {
    return null; // Adicione um retorno nulo ou uma mensagem de carregamento enquanto os dados do hábito estão sendo buscados
  }

  return (
    <div>
      <NavBar />
      <PageContainer>
        <TitleContainer>
          <Title>Segunda, 17/05</Title>
          <Subtitle>Nenhum hábito concluído ainda</Subtitle>
        </TitleContainer>
        <BoxContainer>
          <TextContainer>
            <div className="habit-name">{habitData.name}</div>
            <p>Sequência atual: {habitData.currentSequence} dias</p>
            <p>Seu recorde: {habitData.highestSequence} dias</p>
          </TextContainer>
          <CheckContainer completed={habitCompleted} onClick={handleCheckClick}>
            <img src={'checkmark.svg'} alt="icon" />
          </CheckContainer>
        </BoxContainer>
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
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-style: normal;
  font-size: 18px;
  color: #bababa;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 95px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 30px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 13px;
  margin-left: 15px;

  div {
    font-size: 20px;
    margin-bottom: 8px;
  }
`;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ebebeb;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  width: 69px;
  height: 69px;
  margin-right: 15px;
  background-color: ${({ completed }) => (completed ? '#8FC549' : '#EBEBEB')};
`;
