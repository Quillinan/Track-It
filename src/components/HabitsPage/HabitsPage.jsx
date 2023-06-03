import styled from 'styled-components';
import { useState } from 'react';

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

  function handleDayClick(day) {
    setSelectedDays((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: !prevSelectedDays[day],
    }));
  }

  return (
    <div>
      <NavContainer>
        <p>TrackIt</p>
        <img src={''} alt="icon" />
      </NavContainer>
      <PageContainer>
        <TitleContainer>
          <p>Meus hábitos</p>
          <button>+</button>
        </TitleContainer>
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
            <button>Salvar</button>
          </ButtonsContainer>
        </BoxContainer>
        <p>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </p>
      </PageContainer>
      <Footer>
        <p>Hábitos</p>
        <p>Hoje</p>
        <p>Histórico</p>
      </Footer>
    </div>
  );
}

const NavContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: 'Playball';
  font-size: 40px;
  text-align: center;
  background: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  color: #ffffff;
  img {
    margin-right: 18px;
    border-radius: 98.5px;
    width: 51px;
    height: 51px;
  }
  p {
    margin-left: 18px;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Lexend Deca';
  font-style: normal;
  font-size: 18px;
  background: #f2f2f2;
  color: #666666;
  padding: 0 20px;
`;

const TitleContainer = styled.div`
  height: 70px;
  width: calc(100vw - 36px);
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
  width: calc(100vw - 38px);
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

const Footer = styled.div`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-size: 18px;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
`;
