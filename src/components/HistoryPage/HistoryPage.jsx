import styled from "styled-components";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function HistoryPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    if (!user) {
      navigate("/");
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
          <Title>Histórico</Title>
        </TitleContainer>
        <StyledCalendar onChange={onChange} value={value} />
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
  padding: 70px 17px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;
  margin-bottom: 15px;
  font-family: "Lexend Deca";
`;

const Title = styled.p`
  font-style: normal;
  font-size: 23px;
  color: #126ba5;
`;

const StyledCalendar = styled(Calendar)`
  border-radius: 10px;
`;
