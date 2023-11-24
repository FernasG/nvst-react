import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ChangeEvent, useEffect, useState } from 'react';
import { Container, Header, Title, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button, Panel, Input, SubmitButton } from './styles';
import { UsersService } from '../../services';

export const Users = ((): JSX.Element => {
  const [cpf, setCpf] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const handleOnChange = ((e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    const { target: { value } } = e;
    setState(value);
  });

  const deleteUser = (async (userId: number) => {
    const response = await UsersService.deleteUser(userId);

    if (response) {
      const filteredUsers = users.filter(({ id }) => id !== userId);
      setUsers([...filteredUsers]);
    }
  });

  const createUser = (async () => {
    const response = await UsersService.createUser(name, cpf, email, password);

    if (response) {
      setCpf('');
      setName('');
      setEmail('');
      setPassword('');

      setUsers([...users, response]);
    }
  });

  useEffect(() => {
    if (firstLoad) {
      (async () => {
        const response = await UsersService.listUsers();

        if (response && Array.isArray(response)) setUsers(response);
      })();

      setFirstLoad(false);
    }
  }, [users]);

  return (
    <Container>
      <Header>
        <Title>Users</Title>
        <Panel>
          <Input
            placeholder={'Name'}
            type={'text'}
            value={name}
            onChange={((e) => handleOnChange(e, setName))}
          />
          <Input
            placeholder={'Email'}
            type={'email'}
            value={email}
            onChange={((e) => handleOnChange(e, setEmail))}
          />
          <Input
            placeholder={'CPF'}
            type={'text'}
            value={cpf}
            onChange={((e) => handleOnChange(e, setCpf))}
          />
          <Input
            placeholder={'Password'}
            type={'password'}
            value={password}
            onChange={((e) => handleOnChange(e, setPassword))}
          />
          <SubmitButton onClick={(() => createUser())}>Add</SubmitButton>
        </Panel>
      </Header>
      <Body>
        <Table>
          <TableHeader>
            <HeaderItem>ID</HeaderItem>
            <HeaderItem>Name</HeaderItem>
            <HeaderItem>CPF</HeaderItem>
            <HeaderItem>Created</HeaderItem>
            <HeaderItem>Deleted</HeaderItem>
            <HeaderItem>Actions</HeaderItem>
          </TableHeader>
          <TableBody>
            {
              users.map((user) => {
                return (
                  <TableRow key={uuidv4()}>
                    <RowItem key={uuidv4()}>{user.id}</RowItem>
                    <RowItem key={uuidv4()}>{user.name}</RowItem>
                    <RowItem key={uuidv4()}>{user.cpf}</RowItem>
                    <RowItem key={uuidv4()}>{new Date(user.created_at).toLocaleString('pt-br')}</RowItem>
                    <RowItem key={uuidv4()}>{user.deleted_at ? new Date(user.created_at).toLocaleString('pt-br') : '-'}</RowItem>
                    <RowItem key={uuidv4()}>
                      <Button type={'edit'}>
                        <FaEdit size={'17px'} />
                      </Button>
                      <Button type={'delete'} onClick={(() => deleteUser(user.id))}>
                        <FaTrash size={'17px'} />
                      </Button>
                    </RowItem>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </Body>
    </Container>
  );
});