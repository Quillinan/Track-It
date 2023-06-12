import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function TodayPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [habitData, setHabitData] = useState(null);
  const token = user.token;
  const currentDate = new Date();
  const DateptBR = format(currentDate, "EEEE, dd/MM", { locale: ptBR });
  const formattedDate = DateptBR.charAt(0).toUpperCase() + DateptBR.slice(1);

  const handleCheckClick = async () => {
    try {
      const response = await fetch(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitData.id}/check`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setHabitData(!habitData.done);
      } else if (response.status === 400) {
        throw new Error("Erro ao concluir hábito");
      }
    } catch (error) {
      console.error("Erro ao concluir hábito:", error);
    }
  };

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await fetch(
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
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
          throw new Error("Erro ao obter dados do hábito");
        }
      } catch (error) {
        console.error("Erro ao obter dados do hábito:", error);
      }
    };

    if (!user) {
      navigate("/");
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
          <Subtitle data-test="today-counter">
            Nenhum hábito concluído ainda
          </Subtitle>
        </TitleContainer>
        <BoxContainer data-test="today-habit-container">
          <TextContainer>
            <div data-test="today-habit-name" className="habit-name">
              {habitData.name}
            </div>
            <p data-test="today-habit-sequence">
              Sequência atual: {habitData.currentSequence} dias
            </p>
            <p data-test="today-habit-record">
              Seu recorde: {habitData.highestSequence} dias
            </p>
          </TextContainer>
          <CheckContainer
            data-test="today-habit-check-btn"
            done={habitData.done}
            onClick={handleCheckClick}>
            <img src={"checkmark.svg"} alt="icon" />
          </CheckContainer>
        </BoxContainer>
      </PageContainer>
      <Footer />
    </div>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lexend Deca";
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
  font-family: "Lexend Deca";
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
  width: 340px;
  min-height: 94px;
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
  background-color: ${({ done }) => (done ? "#8FC549" : "#EBEBEB")};
`;
