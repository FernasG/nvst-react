import styled from 'styled-components';

interface Props {
  toggleView: boolean;
}

interface ButtonProps {
  hoverColor: string;
  borderColor: string;
  backgroundColor?: string;
}

export const Layout = styled.div<Props>`
  width: 100%;
  height: 100vh;
  position: absolute;
  display: ${({ toggleView }) => toggleView ? 'block' : 'none'};
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 0;
  left: 0;
`;

export const Container = styled.div<Props>`
  width: 30%;
  background: var(--layer-01);
  display: ${({ toggleView }) => toggleView ? 'block' : 'none'};
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

export const ModalHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Title = styled.h1`
  font-size: 1.5em;
`;

export const Button = styled.button`
  color: var(--text-color);
  cursor: pointer;
  transition: all 500ms;

  &:hover {
    color: var(--red);
  }
`;

export const ButtonArea = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  column-gap: 30px;
`;

export const InteractionButton = styled.button<ButtonProps>`
  padding: 7.5px;
  border-radius: 5px;
  font-weight: bolder;
  font-size: 10pt;
  border: 1px solid;
  border-color: ${({ borderColor }) => `var(--${borderColor})`};
  color: var(--text-color);
  cursor: pointer;
  transition: all 500ms;
  background: ${({ backgroundColor }) =>  backgroundColor ? `var(--${backgroundColor})` : 'none'};

  &:hover {
    background: ${({ hoverColor }) => `var(--${hoverColor})`};
  }
`;

export const ModalBody = styled.div`
  width: 100%;
  border-top: 1px solid var(--light-gray);
  border-bottom: 1px solid var(--light-gray);
`;

export const ModalFooter = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalForm = styled.div`
  width: 100%;
  padding: 3%;
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
`;

export const Field = styled.div`
  width: 50%;
`;

export const Input = styled.input`
  background: var(--layer-06);
  height: 35px;
  width: 100%;
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