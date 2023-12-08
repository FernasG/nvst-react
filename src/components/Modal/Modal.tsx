import { useEffect, useState, ChangeEvent } from 'react';
import { Layout, Container, ModalHeader, Title, Button, ModalBody, ModalFooter, ButtonArea, InteractionButton, ModalForm, Field, Input } from './styles';
import { IoCloseCircleSharp } from 'react-icons/io5';

interface Props {
  title: string;
  toggleView: boolean;
  setToggleView: React.Dispatch<React.SetStateAction<boolean>>;
  saveFunction: (() => any);
  formItems: { placeholder: string; type: string; value: any; setState: React.Dispatch<React.SetStateAction<any>> }[];
}

export const Modal = (({ title, saveFunction, formItems, toggleView, setToggleView }: Props): JSX.Element => {
  const toggleModalView = (() => setToggleView(!toggleView));

  const handleOnChange = ((e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    const { target: { value } } = e;
    setState(value);
  });

  const handleSave = ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (saveFunction) saveFunction();
  });

  useEffect(() => { }, [toggleView]);

  return (
    <>
      <Layout toggleView={toggleView} onClick={((_) => toggleModalView())} />
      <Container toggleView={toggleView}>
        <ModalHeader>
          <Title>{title}</Title>
          <Button onClick={((_) => toggleModalView())}>
            <IoCloseCircleSharp size={'14pt'} />
          </Button>
        </ModalHeader>
        <ModalBody>
          <ModalForm>
            {
              formItems.map(({ placeholder, type, value, setState }) => {
                return (
                  <Field>
                    <Input
                      placeholder={placeholder}
                      type={type}
                      value={value}
                      onChange={((e) => handleOnChange(e, setState))}
                    />
                  </Field>
                );
              })
            }
          </ModalForm>
        </ModalBody>
        <ModalFooter>
          <ButtonArea>
            <InteractionButton
              hoverColor={'fern-green'}
              borderColor={'fern-green'}
              onClick={((e) => handleSave(e))}
            >Save</InteractionButton>
            <InteractionButton
              backgroundColor={'red'}
              hoverColor={'red'}
              borderColor={'red'}
            >Cancel</InteractionButton>
          </ButtonArea>
        </ModalFooter>
      </Container>
    </>
  );
});