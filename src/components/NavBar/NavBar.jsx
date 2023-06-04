import styled from 'styled-components';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export default function NavBar() {
  const { user } = useContext(AuthContext);

  return (
    <StyledNavContainer>
      <p>TrackIt</p>
      {user && <ProfileImage src={user.image} alt="Profile Icon" />}
    </StyledNavContainer>
  );
}

const StyledNavContainer = styled.div`
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
  p {
    margin-left: 18px;
  }
`;

const ProfileImage = styled.img`
  margin-right: 18px;
  border-radius: 98.5px;
  width: 51px;
  height: 51px;
`;
