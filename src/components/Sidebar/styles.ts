import styled from 'styled-components';

export const Container = styled.div`
  width: 250px;
  height: 100vh;
  background: var(--layer-01);
  border-right: 2px solid var(--light-gray);
`;

export const Header = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--light-gray);
`;

export const Title = styled.h1``;

export const Body = styled.div`
  width: 100%;
`;

export const Item = styled.div`
  cursor: pointer;
  height: 35px;
  display: flex;
  align-items: center;
  transition: all 500ms;
  font-weight: bold;
  padding-left: 25%;

  &:hover {
    color: var(--white);
    background: var(--iris);
  }
`;

export const Text = styled.span`
  margin-left: 10px;
  font-size: 1.2em;
`;