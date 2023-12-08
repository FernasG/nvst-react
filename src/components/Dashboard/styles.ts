import styled from 'styled-components';

export const Container = styled.div`
  width: 70%;
  min-height: 500px;
  background: var(--layer-01);
  border-radius: 10px;
  padding: 10px;
`;

export const Header = styled.div`
  width: 100%;
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;

export const Chart = styled.div`
  width: 100%;
  height: 400px;
`;