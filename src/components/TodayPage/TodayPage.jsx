import styled from "styled-components";

export default function TodayPage() {
  return (
    <PageContainer>
      <p>hoje</p>
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
