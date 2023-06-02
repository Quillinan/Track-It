import styled from "styled-components";

export default function HabitsPage() {
  return (
    <PageContainer>
      <NavContainer>
        TrackIt <img src={""} alt="icon" />
      </NavContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
`;
