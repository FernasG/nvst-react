import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export const Panel = styled.div`
  height: 100vh;
  width: calc(100% - 250px);
  display: flex;
  align-items: center;
  justify-content: center;
`;