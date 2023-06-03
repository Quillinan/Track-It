import styled from 'styled-components';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/footer';

export default function TodayPage() {
  return (
    <div>
      <NavBar />
      <PageContainer>
        <TitleContainer>
          <Title>Segunda, 17/05</Title>
          <Subtitle>Nenhum hábito concluído ainda</Subtitle>
        </TitleContainer>
        <BoxContainer></BoxContainer>
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
`;

const Subtitle = styled.p`
  font-style: normal;
  font-size: 18px;
  color: #bababa;
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
