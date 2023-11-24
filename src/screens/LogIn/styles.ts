import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 350px;
  height: 230px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--layer-01);
  border-radius: 10px;
`;

export const Header = styled.div`
  width: 100%;
  height: 20%;
  padding: 1%;
  border-bottom: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 1.5em;
`;

export const Body = styled.div`
  width: 100%;
  height: 55%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
`;

export const Field = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  background: var(--layer-06);
  height: 35px;
  width: 70%;
  color: var(--text-color);
  border: 2px solid var(--light-gray);
  font-size: 1em;
  padding-left: 2%;
  border-radius: 5px;
  transition: all 500ms;

  &:focus {
    border-color: var(--iris);
  }
`;

export const Footer = styled.div`
  width: 100%;
  height: 25%;
  border-top: 1px solid var(--light-gray);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  cursor: pointer;
  height: 30px;
  width: 80px;
  color: var(--text-color);
  padding: 5px;
  font-size: 1em;
  background: var(--iris);
  font-weight: bold;
  border-radius: 5px;
  transition: all 500ms;

  &:hover {
    background: var(--azure);
  }
`;