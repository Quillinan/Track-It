import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function TodayPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habitData, setHabitData] = useState(null);
  const token = user.token;
  const currentDate = new Date();
  const DateptBR = format(currentDate, 'EEEE, dd/MM', { locale: ptBR });
  const formattedDate = DateptBR.charAt(0).toUpperCase() + DateptBR.slice(1);
  const totalHabits = habitData ? habitData.length : 0;
  const completedHabits = habitData
    ? habitData.filter((habit) => habit.done).length
    : 0;
  const percentCompleted =
    totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  const handleCheckClick = async (habitId) => {
    try {
      const response = await fetch(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setHabitData((prevHabitData) => {
          return prevHabitData.map((habit) => {
            if (habit.id === habitId) {
              return { ...habit, done: !habit.done };
            }
            return habit;
          });
        });
      } else if (response.status === 400) {
        throw new Error('Erro ao concluir hábito');
      }
    } catch (error) {
      console.error('Erro ao concluir hábito:', error);
    }
  };

  let counterText = 'Nenhum hábito concluído ainda';

  if (completedHabits > 0) {
    counterText = `${percentCompleted}% dos hábitos concluídos`;
  }

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
          console.log(data);
          setHabitData(data);
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
    return null;
  }

  return (
    <div>
      <NavBar />
      <PageContainer>
        <TitleContainer>
          <Title data-test="today">{formattedDate}</Title>
          <Subtitle
            data-test="today-counter"
            className={completedHabits > 0 ? 'green-text' : ''}
          >
            {counterText}
          </Subtitle>
        </TitleContainer>
        {habitData.map((habit) => (
          <BoxContainer key={habit.id} data-test="today-habit-container">
            <TextContainer>
              <div data-test="today-habit-name" className="habit-name">
                {habit.name}
              </div>
              <div className="line">
                <p data-test="today-habit-sequence">Sequência atual:</p>
                <p className={habit.done ? 'habit done' : 'habit'}>
                  {habit.currentSequence} dias
                </p>
              </div>

              <div className="line">
                <p data-test="today-habit-record">Seu recorde:</p>
                <p className={habit.done ? 'habit done' : 'habit'}>
                  {habit.highestSequence} dias
                </p>
              </div>
            </TextContainer>
            <CheckContainer
              data-test="today-habit-check-btn"
              done={habit.done}
              onClick={() => handleCheckClick(habit.id)}
            >
              <img src={'checkmark.svg'} alt="icon" />
            </CheckContainer>
          </BoxContainer>
        ))}
      </PageContainer>
      <Footer percentCompleted={percentCompleted} />
    </div>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-size: 18px;
  background: #f2f2f2;
  color: #666666;
  box-sizing: border-box;
  overflow-y: auto;
  height: calc(100vh - 30px);
  padding-top: 70px;
  padding-bottom: 90px;
`;

const TitleContainer = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 30px 0;
  font-family: 'Lexend Deca';
  .green-text {
    color: #8fc549;
  }
`;

const Title = styled.p`
  font-style: normal;
  font-size: 23px;
  color: #126ba5;
  margin-bottom: 5px;
  margin-left: 17px;
`;

const Subtitle = styled.p`
  font-style: normal;
  font-size: 18px;
  color: #bababa;
  margin-left: 17px;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  border-radius: 5px;
  margin: 5px 18px;
  padding: 13px;
  width: -webkit-fill-available;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: 13px;
  width: 75%;
  .habit-name {
    font-size: 20px;
    margin-bottom: 8px;
  }
  .line {
    display: flex;
    flex-direction: row;
  }
  .habit {
    margin-left: 2px;
    color: #666666;
  }
  .habit.done {
    color: #8fc549;
  }
  p {
    display: flex;
    flex-direction: row;
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
  background-color: ${({ done }) => (done ? '#8FC549' : '#EBEBEB')};
`;
