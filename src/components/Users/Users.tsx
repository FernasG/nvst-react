import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Container, Header, Title, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button } from './styles';
import { UsersService } from '../../services';

export const Users = ((): JSX.Element => {
  const [users, setUsers] = useState<any[]>([]);

  const deleteUser = (async (userId: number) => {
    const response = await UsersService.deleteUser(userId);

    if (response) {
      const filteredUsers = users.filter(({ id }) => id !== userId);
      setUsers([...filteredUsers]);
    }
  });

  useEffect(() => {
    (async () => {
      const response = await UsersService.listUsers();

      if (response && Array.isArray(response)) setUsers(response);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Users</Title>
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