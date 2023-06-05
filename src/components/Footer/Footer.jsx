import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleHabitsClick = () => {
    navigate('/habitos');
  };

  const handleTodayClick = () => {
    navigate('/hoje');
  };

  const handleHistoryClick = () => {
    navigate('/historico');
  };

  return (
    <StyledFooter>
      <p data-test="habit-link" onClick={handleHabitsClick}>
        Hábitos
      </p>
      <Circle>
        <p data-test="today-link" onClick={handleTodayClick}>
          Hoje
        </p>
      </Circle>
      <p data-test="history-link" onClick={handleHistoryClick}>
        Histórico
      </p>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  font-family: 'Lexend Deca';
  font-style: normal;
  font-size: 18px;
  width: 375px;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  color: #52b6ff;
`;

const Circle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #52b6ff;
  color: #ffffff;
  margin-bottom: 50px;
`;
