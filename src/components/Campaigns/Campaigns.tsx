import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { Container, Header, Title, Panel, SubmitButton, Input, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button } from './styles';
import { CoursesService } from '../../services';
import { HeaderStatus } from '../Users/styles';
import { Modal } from '../'

export const Campaigns = ((): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [count, setCount] = useState<number>(2);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [users, setUsers] = useState<string>('ALL');
  const [status, setStatus] = useState<string>('Created');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const toggleModalShow = ((setShowModal: React.Dispatch<React.SetStateAction<boolean>>, showModal: boolean) => {
    setShowModal(!showModal);
  });

  const deleteCampaign = (async (campaignId: number) => {
    const filtered = campaigns.filter(campaign => campaign.id !== campaignId);
    setCampaigns(filtered);
    // const response = await CoursesService.deleteCourse(courseId);

    // if (response) {
    //   const filteredCourses = courses.filter(({ id }) => id !== courseId);
    //   setCourses([...filteredCourses]);
    // }
  });

  const createCampaign = (async () => {
    // const response = await CoursesService.createCourse(name, description, duration);

    setCampaigns([...campaigns, { id: count, title, content, users, status, created_at: new Date(), updated_at: new Date(), deleted_at: null }]);
    setCount(count + 1);

    setTitle('');
    setContent('');
    setUsers('');
    setStatus('');

    // if (response) {
    //   setName('');
    //   setDescription('');
    //   setDuration(0);

    //   setCourses([...courses, response]);
    // }

    toggleModalShow(setShowCreateModal, showCreateModal);
  });

  const updateCampaign = (async () => {
    // const response = await CoursesService.updateCourse(id, name, description, duration);
    const campaign = campaigns.find(campaign => campaign.id === id);
    campaign.title = title;
    campaign.content = content;
    campaign.users = users;
    campaign.status = status;

    setTitle('');
    setContent('');
    setUsers('');
    setStatus('');

    // if (response) {
    //   const filteredCourses = courses.filter(course => course.id != id);
    //   setCourses([...filteredCourses, response]);
    // }

    toggleModalShow(setShowUpdateModal, showUpdateModal);
  });

  const setupUpdateCampaign = (async (campaignId: number, title: string, content: string, users: string, status: string) => {
    setId(campaignId);
    setTitle(title);
    setContent(content);
    setUsers(users);
    setStatus(status);

    toggleModalShow(setShowUpdateModal, showUpdateModal);
  });

  const handleOnChange = ((e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    const { target: { value } } = e;
    setState(value);
  });

  useEffect(() => {
    if (firstLoad) {
      (async () => {
        const data = [
          {
            id: 1,
            title: 'Manutenção do Sistema',
            content: 'No dia 12/11/2023 haverá manutenção',
            users: 'ALL',
            status: 'CREATED',
            created_at: new Date('2023-12-08T21:01:55.602Z'),
            updated_at: new Date('2023-12-08T21:01:55.602Z'),
            deleted_at: null
          }
        ]

        setCampaigns(data);
        // const response = await CoursesService.listCourses();

        // if (response && Array.isArray(response)) setCourses(response);
      })();

      setFirstLoad(false);
    }
  }, [campaigns]);

  const formItems = [
    { placeholder: 'Title', type: 'text', value: title, setState: setTitle },
    { placeholder: 'Content', type: 'text', value: content, setState: setContent },
    { placeholder: 'Users', type: 'text', value: users, setState: setUsers },
    { placeholder: 'Status', type: 'text', value: status, setState: setStatus },
  ];

  return (
    <Container>
      <Modal
        title={'Create Campaign'}
        saveFunction={createCampaign}
        formItems={formItems}
        toggleView={showCreateModal}
        setToggleView={setShowCreateModal}
      />
      <Modal
        title={'Update Campaign'}
        saveFunction={updateCampaign}
        formItems={formItems}
        toggleView={showUpdateModal}
        setToggleView={setShowUpdateModal}
      />
      <Header>
        <HeaderStatus>
          <Title>Campaigns</Title>
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
            placeholder={'Content'}
            type={'text'}
            value={content}
            onChange={((e) => handleOnChange(e, setContent))}
          />
          <Input
            placeholder={'Users'}
            type={'text'}
            value={users}
            onChange={((e) => handleOnChange(e, setUsers))}
          />
          <Input
            placeholder={'Status'}
            type={'text'}
            value={status}
            onChange={((e) => handleOnChange(e, setStatus))}
          />
          <SubmitButton>Filter</SubmitButton>
        </Panel>
      </Header>
      <Body>
        <Table>
          <TableHeader>
            <HeaderItem>ID</HeaderItem>
            <HeaderItem>Title</HeaderItem>
            <HeaderItem>Content</HeaderItem>
            <HeaderItem>Users</HeaderItem>
            <HeaderItem>Status</HeaderItem>
            <HeaderItem>Created</HeaderItem>
            <HeaderItem>Deleted</HeaderItem>
            <HeaderItem>Actions</HeaderItem>
          </TableHeader>
          <TableBody>
            {
              campaigns.map((campaign) => {
                return (
                  <TableRow key={uuidv4()}>
                    <RowItem key={uuidv4()}>{campaign.id}</RowItem>
                    <RowItem key={uuidv4()}>{campaign.title}</RowItem>
                    <RowItem key={uuidv4()}>{campaign.content}</RowItem>
                    <RowItem key={uuidv4()}>{campaign.users}</RowItem>
                    <RowItem key={uuidv4()}>{campaign.status}</RowItem>
                    <RowItem key={uuidv4()}>{new Date(campaign.created_at).toLocaleString('pt-br')}</RowItem>
                    <RowItem key={uuidv4()}>{campaign.deleted_at ? new Date(campaign.created_at).toLocaleString('pt-br') : '-'}</RowItem>
                    <RowItem key={uuidv4()}>
                      <Button type={'edit'}>
                        <FaEdit size={'17px'} onClick={(() => setupUpdateCampaign(campaign.id, campaign.title, campaign.content, campaign.users, campaign.status))} />
                      </Button>
                      <Button type={'delete'} onClick={(() => deleteCampaign(campaign.id))}>
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