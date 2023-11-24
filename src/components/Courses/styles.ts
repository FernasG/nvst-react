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
  height: 100px;
`;

export const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;

export const Panel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Input = styled.input`
  background: var(--layer-06);
  height: 35px;
  color: var(--text-color);
  border: 2px solid var(--light-gray);
  font-size: 1em;
  padding-left: 0.5%;
  border-radius: 5px;
  transition: all 500ms;

  &:focus {
    border-color: var(--iris);
  }
`;

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
  height: 40px;
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

export const SubmitButton = styled.button`
  cursor: pointer;
  height: 35px;
  color: var(--text-color);
  padding: 5px 10px;
  font-size: 1em;
  background: var(--iris);
  font-weight: bold;
  border-radius: 5px;
  transition: all 500ms;

  &:hover {
    background: var(--azure);
  }
`;