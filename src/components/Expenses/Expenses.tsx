import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { Container, Header, Title, Panel, SubmitButton, Input, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button } from './styles';
import { ExpensesService } from '../../services';

export const Expenses = ((): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [payment, setPayment] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [value, setValue] = useState<number>(0);

  const deleteExpense = (async (expenseId: number) => {
    const response = await ExpensesService.deleteExpense(expenseId);

    if (response) {
      const filteredExpenses = expenses.filter(({ id }) => id !== expenseId);
      setExpenses([...filteredExpenses]);
    }
  });

  const createExpense = (async () => {
    const response = await ExpensesService.createExpense(title, description, category, payment, date, value);

    if (response) {
      setTitle('');
      setDescription('');
      setCategory('');
      setPayment('');
      setDate('');
      setValue(0);

      setExpenses([...expenses, response]);
    }
  });

  const handleOnChange = ((e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    const { target: { value } } = e;
    setState(value);
  });

  useEffect(() => {
    if (firstLoad) {
      (async () => {
        const response = await ExpensesService.listExpenses();

        if (response && Array.isArray(response)) setExpenses(response);
      })();

      setFirstLoad(false);
    }
  }, [expenses]);


  return (
    <Container>
      <Header>
        <Title>Courses</Title>
        <Panel>
          <Input
            placeholder={'Title'}
            type={'text'}
            value={title}
            onChange={((e) => handleOnChange(e, setTitle))}
          />
          <Input
            placeholder={'Description'}
            type={'text'}
            value={description}
            onChange={((e) => handleOnChange(e, setDescription))}
          />
          <Input
            placeholder={'Category'}
            type={'text'}
            value={category}
            onChange={((e) => handleOnChange(e, setCategory))}
          />
          <Input
            placeholder={'Payment'}
            type={'text'}
            value={payment}
            onChange={((e) => handleOnChange(e, setPayment))}
          />
          <Input
            placeholder={'Date'}
            type={'text'}
            value={date}
            onChange={((e) => handleOnChange(e, setDate))}
          />
          <Input
            placeholder={'Value'}
            type={'number'}
            value={value}
            onChange={((e) => handleOnChange(e, setValue))}
          />
          <SubmitButton onClick={(() => createExpense())}>Add</SubmitButton>
        </Panel>
      </Header>
      <Body>
        <Table>
          <TableHeader>
            <HeaderItem>ID</HeaderItem>
            <HeaderItem>Title</HeaderItem>
            <HeaderItem>Description</HeaderItem>
            <HeaderItem>Category</HeaderItem>
            <HeaderItem>Payment</HeaderItem>
            <HeaderItem>Date</HeaderItem>
            <HeaderItem>Value</HeaderItem>
            <HeaderItem>Created</HeaderItem>
            <HeaderItem>Deleted</HeaderItem>
            <HeaderItem>Actions</HeaderItem>
          </TableHeader>
          <TableBody>
            {
              expenses.map((expense) => {
                return (
                  <TableRow key={uuidv4()}>
                    <RowItem key={uuidv4()}>{expense.id}</RowItem>
                    <RowItem key={uuidv4()}>{expense.title}</RowItem>
                    <RowItem key={uuidv4()}>{expense.description}</RowItem>
                    <RowItem key={uuidv4()}>{expense.category}</RowItem>
                    <RowItem key={uuidv4()}>{expense.payment}</RowItem>
                    <RowItem key={uuidv4()}>{expense.date}</RowItem>
                    <RowItem key={uuidv4()}>{expense.value}</RowItem>
                    <RowItem key={uuidv4()}>{new Date(expense.created_at).toLocaleString('pt-br')}</RowItem>
                    <RowItem key={uuidv4()}>{expense.deleted_at ? new Date(expense.created_at).toLocaleString('pt-br') : '-'}</RowItem>
                    <RowItem key={uuidv4()}>
                      <Button type={'edit'}>
                        <FaEdit size={'17px'} />
                      </Button>
                      <Button type={'delete'} onClick={(() => deleteExpense(expense.id))}>
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