import styled from 'styled-components';
import { useContext, useState, useEffect, useCallback } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/footer';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function HabitsPage() {
  const [selectedDays, setSelectedDays] = useState({
    Segunda: false,
    Terça: false,
    Quarta: false,
    Quinta: false,
    Sexta: false,
    Sábado: false,
    Domingo: false,
  });
  const [habitNameInput, setHabitNameInput] = useState('');
  const [habits, setHabits] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const token = user.token;
  const [isBoxContainerVisible, setIsBoxContainerVisible] = useState(false);
  const DiasdaSemana = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
    'Domingo',
  ];

  function handleDayClick(day) {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  }

  const handleAddButton = () => {
    setIsBoxContainerVisible(true);
  };

  const handleSaveButton = async () => {
    const habitName = habitNameInput;
    const days = Object.keys(selectedDays)
      .filter((day) => selectedDays[day])
      .map((day) => {
        switch (day) {
          case 'Segunda':
            return 1;
          case 'Terça':
            return 2;
          case 'Quarta':
            return 3;
          case 'Quinta':
            return 4;
          case 'Sexta':
            return 5;
          case 'Sábado':
            return 6;
          case 'Domingo':
            return 7;
          default:
            return null;
        }
      })
      .filter((day) => day !== null);

    const habitData = {
      name: habitName,
      days: days,
    };

    try {
      const response = await fetch(
        'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(habitData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const updatedHabits = [
          ...habits,
          { id: data.id, name: habitNameInput, days: days },
        ];
        setHabits(updatedHabits);
        setHabitNameInput('');

        const clearedSelectedDays = { ...selectedDays };
        Object.keys(clearedSelectedDays).forEach((day) => {
          clearedSelectedDays[day] = false;
        });
        setSelectedDays(clearedSelectedDays);
      } else {
        throw new Error('Erro ao salvar hábito');
      }
    } catch (error) {
      console.error('Erro ao salvar hábito:', error);
    }
  };

  const handleCancelButton = () => {
    setIsBoxContainerVisible(false);
  };
  console.log(habits);

  const fetchHabits = useCallback(async () => {
    try {
      const response = await fetch(
        'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits',
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHabits(data);
        setHasLoadedData(true);
      } else {
        throw new Error('Erro ao carregar hábitos');
      }
    } catch (error) {
      console.error('Erro ao carregar hábitos:', error);
    }
  }, [user.token]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (!hasLoadedData) {
      (async () => {
        await fetchHabits();
      })();
    }
  }, [user, navigate, hasLoadedData, fetchHabits]);

  return (
    <div>
      <NavBar />
      <PageContainer>
        <TitleContainer>
          <p>Meus hábitos</p>
          <button onClick={handleAddButton}>+</button>
        </TitleContainer>
        {isBoxContainerVisible && (
          <BoxContainer>
            <input
              id="habitName"
              placeholder="nome do hábito"
              value={habitNameInput}
              onChange={(event) => setHabitNameInput(event.target.value)}
            />
            <DaysContainer>
              {Object.keys(selectedDays).map((day) => (
                <DayButton
                  key={day}
                  selected={selectedDays[day]}
                  onClick={() => handleDayClick(day)}
                >
                  {day[0]}
                </DayButton>
              ))}
            </DaysContainer>
            <ButtonsContainer>
              <p onClick={handleCancelButton}>Cancelar</p>
              <button onClick={handleSaveButton}>Salvar</button>
            </ButtonsContainer>
          </BoxContainer>
        )}
        {habits.length === 0 && !isBoxContainerVisible && (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        )}
        {habits.length > 0 && (
          <>
            {habits.map((habit) => (
              <HabitBoxContainer key={habit.id}>
                <img
                  src={'trashicon.svg'}
                  alt="icon"
                  // onClick={() => handleDeleteHabit(habit.id)}
                />
                <p>{habit.name}</p>
                <DaysContainer>
                  {DiasdaSemana.map((day, index) => (
                    <DayButton
                      key={index}
                      disabled={habit.days.includes(index + 1)}
                      selected={habit.days.includes(index + 1)}
                    >
                      {day[0]}
                    </DayButton>
                  ))}
                </DaysContainer>
              </HabitBoxContainer>
            ))}
          </>
        )}
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
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 23px;
  color: #126ba5;
  button {
    width: 40px;
    height: 36px;
    font-size: 27px;
    color: #ffffff;
    padding: 0;
    margin-top: 0;
    align-items: center;
    align-text: center;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 30px;
  input {
    width: calc(100% - 40px);
    margin-top: 18px;
  }
`;

const DaysContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: calc(100% - 20px);
`;

const DayButton = styled.button`
  margin-right: 5px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? '#CFCFCF' : '#FFFFFF')};
  border: 1px solid ${(props) => (props.selected ? '#CFCFCF' : '#D4D4D4')};
  color: ${(props) => (props.selected ? '#FFFFFF' : '#DBDBDB')};
  font-size: 20px;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  width: calc(100% - 20px);
  margin-top: 30px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  p {
    color: #52b6ff;
    margin-right: 23px;
  }
  button {
    width: 84px;
    height: 35px;
    font-size: 16px;
  }
`;

const HabitBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 30px;
  margin-bottom: 30px;
  p {
    width: calc(100% - 20px);
  }
  img {
    align-self: flex-end;
    margin-top: 10px;
    width: 15px;
    height: 15px;
    margin-right: 10px;
  }
`;
