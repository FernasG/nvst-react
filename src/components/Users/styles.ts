import styled from 'styled-components';

interface Props {
  type: 'edit' | 'delete';
}

export const Container = styled.div`
  width: 70%;
  min-height: 500px;
  background: var(--layer-01);
  border-radius: 10px;
  padding: 10px;
`;

export const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
`;

export const Title = styled.h1``;

export const Body = styled.div`
  width: 100%;
  height: 100%;
`;

export const Table = styled.div`
  border: 1px solid var(--light-gray);
  border-radius: 5px;
`;

export const TableHeader = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 1px solid var(--light-gray);
`;

export const HeaderItem = styled.span`
  width: 100%;
  text-align: center;
  font-weight: bold;
  vertical-align: center;
`;

export const TableBody = styled.div`
  width: 100%;
`;

export const TableRow = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const RowItem = styled.span`
  width: 100%;
  text-align: center;
  vertical-align: center;

  & > button:nth-child(1) {
    margin-right: 10px;
  }
`;


export const Button = styled.button<Props>`
  cursor: pointer;
  color: var(--text-color);
  transition: all 500ms;

  &:hover {
    color: ${({ type }) => type === 'delete' ? 'var(--red)' : 'var(--azure)'};
  }
`;