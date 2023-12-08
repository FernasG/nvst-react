import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { Container, Header, Title, Panel, SubmitButton, Input, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button } from './styles';
import { ExpensesService } from '../../services';
import { HeaderStatus } from '../Users/styles';
import { Modal } from '../'

export const Expenses = ((): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [payment, setPayment] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const toggleModalShow = ((setShowModal: React.Dispatch<React.SetStateAction<boolean>>, showModal: boolean) => {
    setShowModal(!showModal);
  });

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

    toggleModalShow(setShowCreateModal, showCreateModal);
  });

  const updateExpense = (async () => {
    const response = await ExpensesService.updateExpense(id, title, description, category, payment, date, value);

    setTitle('');
    setDescription('');
    setCategory('');
    setPayment('');
    setDate('');
    setValue(0);

    if (response) {
      const filteredUsers = expenses.filter(expense => expense.id != id);
      setExpenses([...filteredUsers, response]);
    }

    toggleModalShow(setShowUpdateModal, showUpdateModal);
  });

  const setupUpdateExpesnse = (async (expenseId: number, title: string, description: string, category: string, payment: string, date: string, value: number) => {
    setId(expenseId);
    setTitle(title);
    setDescription(description);
    setCategory(category);
    setPayment(payment);
    setDate(date);
    setValue(value);

    toggleModalShow(setShowUpdateModal, showUpdateModal);
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

  const formItems = [
    { placeholder: 'Title', type: 'text', value: title, setState: setTitle },
    { placeholder: 'Description', type: 'text', value: description, setState: setDescription },
    { placeholder: 'Category', type: 'text', value: category, setState: setCategory },
    { placeholder: 'Payment', type: 'text', value: payment, setState: setPayment },
    { placeholder: 'Data', type: 'text', value: date, setState: setDate },
    { placeholder: 'Value', type: 'number', value: value, setState: setValue }
  ];

  return (
    <Container>
      <Modal
        title={'Create Expense'}
        saveFunction={createExpense}
        formItems={formItems}
        toggleView={showCreateModal}
        setToggleView={setShowCreateModal}
      />
      <Modal
        title={'Update Expense'}
        saveFunction={updateExpense}
        formItems={formItems}
        toggleView={showUpdateModal}
        setToggleView={setShowUpdateModal}
      />
      <Header>
        <HeaderStatus>
          <Title>Expenses</Title>
          <SubmitButton onClick={((_) => toggleModalShow(setShowCreateModal, showCreateModal))}>Add</SubmitButton>
        </HeaderStatus>
        <Panel>
          <Input
            placeholder={'Title'}
            type={'text'}
            value={title}
            onChange={((e) => handleOnChange(e, setTitle))}
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
          <SubmitButton>Filter</SubmitButton>
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
                    <RowItem key={uuidv4()}>{new Date(expense.date).toLocaleString('pt-br')}</RowItem>
                    <RowItem key={uuidv4()}>{expense.value}</RowItem>
                    <RowItem key={uuidv4()}>{new Date(expense.created_at).toLocaleString('pt-br')}</RowItem>
                    <RowItem key={uuidv4()}>{expense.deleted_at ? new Date(expense.created_at).toLocaleString('pt-br') : '-'}</RowItem>
                    <RowItem key={uuidv4()}>
                      <Button type={'edit'}>
                        <FaEdit size={'17px'} onClick={(() => setupUpdateExpesnse(expense.id, expense.title, expense.description, expense.category, expense.payment, expense.date, expense.value))} />
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