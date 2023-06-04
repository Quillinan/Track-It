import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	button {
		height: 45px;
		background: #52B6FF;	
		border-radius: 4.6px;
		border-style: none;
		font-family: 'Lexend Deca';
		font-size: 21px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #FFFFFF;
		padding: 0 10px;
		margin-top: 6px;
	}
	input {
		background: '#FFFFFF';
		border: 1px solid #D5D5D5;
		border-radius: 5px;
		height: 45px;
		margin-top: 10px;
		padding: 0 10px;
		color: #DBDBDB;
		font-family: 'Lexend Deca';
		font-size: 20px;
		display: flex;
		align-items: center;
		&::placeholder{
			font-style: normal;
			color: #DBDBDB;
		}
		
	}
`;

export default GlobalStyle;
