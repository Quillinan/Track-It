import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

export default function Footer() {
  const { user } = useContext(AuthContext);
  const percentage = user.percentCompleted;
  const navigate = useNavigate();

  const handleHabitsClick = () => {
    navigate("/habitos");
  };

  const handleTodayClick = () => {
    console.log(user.percentCompleted);
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
      <Circle onClick={handleTodayClick}>
        {/* <p data-test="today-link" onClick={handleTodayClick}>
          Hoje
        </p> */}
        <CircularProgressbar
          onClick={handleTodayClick}
          value={percentage}
          text={"Hoje"}
          styles={buildStyles({
            textSize: "18px",
            pathTransitionDuration: 0.5,
            pathColor: `(, ${percentage / 100})`,
            textColor: "#ffffff",
            trailColor: "#ffffff",
            backgroundColor: "#52b6ff",
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: #52b6ff;
  color: #ffffff;
  margin-bottom: 50px;
`;
