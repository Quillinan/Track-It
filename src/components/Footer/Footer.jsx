import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Footer({ percentCompleted }) {
  const navigate = useNavigate();

  const handleHabitsClick = () => {
    navigate("/habitos");
  };

  const handleTodayClick = () => {
    navigate("/hoje");
  };

  const handleHistoryClick = () => {
    navigate("/historico");
  };

  return (
    <StyledFooter>
      <p data-test="habit-link" onClick={handleHabitsClick}>
        Hábitos
      </p>
      <Circle data-test="today-link" onClick={handleTodayClick}>
        <CircularProgressbar
          value={percentCompleted || 0}
          text="Hoje"
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: "#52b6ff",
            textColor: "#ffffff",
            pathColor: "#ffffff",
            trailColor: "transparent",
          })}
        />
      </Circle>

      <p data-test="history-link" onClick={handleHistoryClick}>
        Histórico
      </p>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  font-family: "Lexend Deca";
  font-style: normal;
  font-size: 18px;
  width: 375px;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: #ffffff;
  color: #52b6ff;
  position: fixed;
  bottom: 0px;
`;

const Circle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-bottom: 50px;
`;
