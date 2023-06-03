import styled from 'styled-components';

export default function Footer() {
  return (
    <StyledFooter>
      <p>Hábitos</p>
      <Circle>
        <p>Hoje</p>
      </Circle>
      <p>Histórico</p>
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
