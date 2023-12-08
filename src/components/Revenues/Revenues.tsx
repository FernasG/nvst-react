import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { Container, Header, Title, Panel, SubmitButton, Input, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button } from './styles';
import { RevenuesService } from '../../services';
import { HeaderStatus } from '../Users/styles';
import { Modal } from '../'

export const Revenues = ((): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [revenues, setRevenues] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [recurrence, setRecurrence] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const toggleModalShow = ((setShowModal: React.Dispatch<React.SetStateAction<boolean>>, showModal: boolean) => {
    setShowModal(!showModal);
  });

  const deleteRevenue = (async (revenueId: number) => {
    const response = await RevenuesService.deleteRevenue(revenueId);

    if (response) {
      const filteredRevenues = revenues.filter(({ id }) => id !== revenueId);
      setRevenues([...filteredRevenues]);
    }
  });

  const createRevenue = (async () => {
    const response = await RevenuesService.createRevenue(title, description, recurrence, value);

    if (response) {
      setTitle('');
      setDescription('');
      setRecurrence('');
      setValue(0);

      setRevenues([...revenues, response]);
    }

    toggleModalShow(setShowCreateModal, showCreateModal);
  });

  const updateRevenue = (async () => {
    const response = await RevenuesService.updateRevenue(id, title, description, recurrence, value);

    setTitle('');
    setDescription('');
    setRecurrence('');
    setValue(0);

    if (response) {
      const filteredRevenues = revenues.filter(revenue => revenue.id != id);
      setRevenues([...filteredRevenues, response]);
    }

    toggleModalShow(setShowUpdateModal, showUpdateModal);
  });

  const setupUpdateRevenue = (async (revenueId: number, title: string, description: string, recurrence: string, value: number) => {
    setId(revenueId);
    setTitle(title);
    setDescription(description);
    setRecurrence(recurrence);
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
        const response = await RevenuesService.listRevenues();

        if (response && Array.isArray(response)) setRevenues(response);
      })();

      setFirstLoad(false);
    }
  }, [revenues]);

  const formItems = [
    { placeholder: 'Title', type: 'text', value: title, setState: setTitle },
    { placeholder: 'Description', type: 'text', value: description, setState: setDescription },
    { placeholder: 'Recurrence', type: 'text', value: recurrence, setState: setRecurrence },
    { placeholder: 'Value', type: 'number', value: value, setState: setValue },
  ];

  return (
    <Container>
      <Modal
        title={'Create Revenue'}
        saveFunction={createRevenue}
        formItems={formItems}
        toggleView={showCreateModal}
        setToggleView={setShowCreateModal}
      />
      <Modal
        title={'Update Revenue'}
        saveFunction={updateRevenue}
        formItems={formItems}
        toggleView={showUpdateModal}
        setToggleView={setShowUpdateModal}
      />
      <Header>
        <HeaderStatus>
          <Title>Revenues</Title>
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
            placeholder={'Description'}
            type={'text'}
            value={description}
            onChange={((e) => handleOnChange(e, setDescription))}
          />
          <Input
            placeholder={'Recurrence'}
            type={'text'}
            value={recurrence}
            onChange={((e) => handleOnChange(e, setRecurrence))}
          />
          <SubmitButton onClick={(() => createRevenue())}>Filter</SubmitButton>
        </Panel>
      </Header>
      <Body>
        <Table>
          <TableHeader>
            <HeaderItem>ID</HeaderItem>
            <HeaderItem>Title</HeaderItem>
            <HeaderItem>Description</HeaderItem>
            <HeaderItem>Recurrence</HeaderItem>
            <HeaderItem>Value</HeaderItem>
            <HeaderItem>Created</HeaderItem>
            <HeaderItem>Deleted</HeaderItem>
            <HeaderItem>Actions</HeaderItem>
          </TableHeader>
          <TableBody>
            {
              revenues.map((revenue) => {
                return (
                  <TableRow key={uuidv4()}>
                    <RowItem key={uuidv4()}>{revenue.id}</RowItem>
                    <RowItem key={uuidv4()}>{revenue.title}</RowItem>
                    <RowItem key={uuidv4()}>{revenue.description}</RowItem>
                    <RowItem key={uuidv4()}>{revenue.recurrence}</RowItem>
                    <RowItem key={uuidv4()}>{revenue.value}</RowItem>
                    <RowItem key={uuidv4()}>{new Date(revenue.created_at).toLocaleString('pt-br')}</RowItem>
                    <RowItem key={uuidv4()}>{revenue.deleted_at ? new Date(revenue.created_at).toLocaleString('pt-br') : '-'}</RowItem>
                    <RowItem key={uuidv4()}>
                      <Button type={'edit'}>
                        <FaEdit size={'17px'} onClick={(() => setupUpdateRevenue(revenue.id, revenue.title, revenue.description, revenue.recurrence, revenue.value))} />
                      </Button>
                      <Button type={'delete'} onClick={(() => deleteRevenue(revenue.id))}>
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