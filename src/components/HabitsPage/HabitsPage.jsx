import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
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
  const [showBox, setShowBox] = useState(false);
  const [savedHabit, setSavedHabit] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleDayClick(day) {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  }

  const handleAddButton = () => {
    setShowBox(true);
  };

  const handleSaveButton = () => {
    setShowBox(false);
    setSavedHabit(true);
  };

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
          <p>Meus hábitos</p>
          <button onClick={handleAddButton}>+</button>
        </TitleContainer>
        {showBox && (
          <BoxContainer>
            <input placeholder="nome do hábito" />
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
              <p>Cancelar</p>
              <button onClick={handleSaveButton}>Salvar</button>
            </ButtonsContainer>
          </BoxContainer>
        )}
        {!savedHabit && (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
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
