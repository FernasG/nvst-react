import { ChangeEvent, useState } from 'react';
import { Container, Header, Title, Body, Field, Input, Footer, Button } from './styles';
import { UsersService } from '../../services';

interface Props {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LogIn = (({ setIsLoggedIn }: Props): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleOnChange = ((e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    const { target: { value } } = e;
    setState(value);
  });

  const handleOnClick = (async () => {
    const response = await UsersService.signIn(email, password);

    const { statusCode } = response;

    if (statusCode !== 200) return;

    setIsLoggedIn(true);
  });

  return (
    <Container>
      <Header>
        <Title>Sign In</Title>
      </Header>
      <Body>
        <Field>
          <Input
            type={'email'}
            value={email}
            placeholder={'Email'}
            onChange={((e) => handleOnChange(e, setEmail))}
          />
        </Field>

        <Field>
          <Input
            type={'password'}
            value={password}
            placeholder={'Password'}
            onChange={((e) => handleOnChange(e, setPassword))}
          />
        </Field>
      </Body>
      <Footer>
        <Button onClick={handleOnClick}>Sign In</Button>
      </Footer>
    </Container>
  );
});