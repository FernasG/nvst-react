import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ChangeEvent, useEffect, useState } from 'react';
import { Container, Header, Title, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button, Panel, Input, SubmitButton, HeaderStatus } from './styles';
import { Modal } from '../';
import { UsersService } from '../../services';

export const Users = ((): JSX.Element => {
  const [id, setId] = useState<number>(0);
  const [cpf, setCpf] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const toggleModalShow = ((setShowModal: React.Dispatch<React.SetStateAction<boolean>>, showModal: boolean) => {
    setShowModal(!showModal);
  });

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

    toggleModalShow(setShowCreateModal, showCreateModal);
  });

  const updateUser = (async () => {
    const response = await UsersService.updateUser(id, name, email, password);

    setCpf('');
    setName('');
    setEmail('');
    setPassword('');

    if (response) {
      const filteredUsers = users.filter(user => user.id != id);
      setUsers([...filteredUsers, response]);
    }

    toggleModalShow(setShowUpdateModal, showUpdateModal);
  });

  const setupUpdateUser = (async (userId: number, name: string, cpf: string, email: string, password: string) => {
    setId(userId);
    setCpf(cpf);
    setName(name);
    setEmail(email);
    setPassword(password);

    toggleModalShow(setShowUpdateModal, showUpdateModal);
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

  const formItems = [
    { placeholder: 'Name', type: 'text', value: name, setState: setName },
    { placeholder: 'Email', type: 'email', value: email, setState: setEmail },
    { placeholder: 'CPF', type: 'text', value: cpf, setState: setCpf },
    { placeholder: 'Password', type: 'password', value: password, setState: setPassword }
  ];

  return (
    <>
      <Container>
        <Modal
          title={'Create User'}
          saveFunction={createUser}
          formItems={formItems}
          toggleView={showCreateModal}
          setToggleView={setShowCreateModal}
        ></Modal>

        <Modal
          title={'Update User'}
          saveFunction={updateUser}
          formItems={formItems}
          toggleView={showUpdateModal}
          setToggleView={setShowUpdateModal}
        ></Modal>
        <Header>
          <HeaderStatus>
            <Title>Users</Title>
            <SubmitButton onClick={((_) => toggleModalShow(setShowCreateModal, showCreateModal))}>Add</SubmitButton>
          </HeaderStatus>
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
            <SubmitButton >Filter</SubmitButton>
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
                          <FaEdit size={'17px'}
                            onClick={(() => setupUpdateUser(user.id, user.name, user.cpf, user.email, user.password))}
                          />
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
    </>
  );
});