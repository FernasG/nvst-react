import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { Container, Header, Title, Panel, SubmitButton, Input, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button } from './styles';
import { CoursesService } from '../../services';
import { HeaderStatus } from '../Users/styles';
import { Modal } from '../'

export const Courses = ((): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const toggleModalShow = ((setShowModal: React.Dispatch<React.SetStateAction<boolean>>, showModal: boolean) => {
    setShowModal(!showModal);
  });

  const deleteCourse = (async (courseId: number) => {
    const response = await CoursesService.deleteCourse(courseId);

    if (response) {
      const filteredCourses = courses.filter(({ id }) => id !== courseId);
      setCourses([...filteredCourses]);
    }
  });

  const createCourse = (async () => {
    const response = await CoursesService.createCourse(name, description, duration);

    if (response) {
      setName('');
      setDescription('');
      setDuration(0);

      setCourses([...courses, response]);
    }

    toggleModalShow(setShowCreateModal, showCreateModal);
  });

  const updateCourse = (async () => {
    const response = await CoursesService.updateCourse(id, name, description, duration);

    setName('');
    setDescription('');
    setDuration(0);

    if (response) {
      const filteredCourses = courses.filter(course => course.id != id);
      setCourses([...filteredCourses, response]);
    }

    toggleModalShow(setShowUpdateModal, showUpdateModal);
  });

  const setupUpdateCourse = (async (courseId: number, name: string, description: string, duration: number) => {
    setId(courseId);
    setName(name);
    setDescription(description);
    setDuration(duration);

    toggleModalShow(setShowUpdateModal, showUpdateModal);
  });

  const handleOnChange = ((e: ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<any>>) => {
    const { target: { value } } = e;
    setState(value);
  });

  useEffect(() => {
    if (firstLoad) {
      (async () => {
        const response = await CoursesService.listCourses();

        if (response && Array.isArray(response)) setCourses(response);
      })();

      setFirstLoad(false);
    }
  }, [courses]);

  const formItems = [
    { placeholder: 'Name', type: 'text', value: name, setState: setName },
    { placeholder: 'Description', type: 'text', value: description, setState: setDescription },
    { placeholder: 'Duration', type: 'number', value: duration, setState: setDuration }
  ];

  return (
    <Container>
      <Modal
        title={'Create Course'}
        saveFunction={createCourse}
        formItems={formItems}
        toggleView={showCreateModal}
        setToggleView={setShowCreateModal}
      />
      <Modal
        title={'Update Course'}
        saveFunction={updateCourse}
        formItems={formItems}
        toggleView={showUpdateModal}
        setToggleView={setShowUpdateModal}
      />
      <Header>
        <HeaderStatus>
          <Title>Courses</Title>
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
            placeholder={'Description'}
            type={'text'}
            value={description}
            onChange={((e) => handleOnChange(e, setDescription))}
          />
          <Input
            placeholder={'Duration'}
            type={'number'}
            value={duration}
            onChange={((e) => handleOnChange(e, setDuration))}
          />
          <SubmitButton onClick={(() => createCourse())}>Add</SubmitButton>
        </Panel>
      </Header>
      <Body>
        <Table>
          <TableHeader>
            <HeaderItem>ID</HeaderItem>
            <HeaderItem>Name</HeaderItem>
            <HeaderItem>Description</HeaderItem>
            <HeaderItem>Duration</HeaderItem>
            <HeaderItem>Created</HeaderItem>
            <HeaderItem>Deleted</HeaderItem>
            <HeaderItem>Actions</HeaderItem>
          </TableHeader>
          <TableBody>
            {
              courses.map((course) => {
                return (
                  <TableRow key={uuidv4()}>
                    <RowItem key={uuidv4()}>{course.id}</RowItem>
                    <RowItem key={uuidv4()}>{course.name}</RowItem>
                    <RowItem key={uuidv4()}>{course.description}</RowItem>
                    <RowItem key={uuidv4()}>{course.duration}</RowItem>
                    <RowItem key={uuidv4()}>{new Date(course.created_at).toLocaleString('pt-br')}</RowItem>
                    <RowItem key={uuidv4()}>{course.deleted_at ? new Date(course.created_at).toLocaleString('pt-br') : '-'}</RowItem>
                    <RowItem key={uuidv4()}>
                      <Button type={'edit'}>
                        <FaEdit size={'17px'} onClick={(() => setupUpdateCourse(course.id, course.name, course.description, course.duration))} />
                      </Button>
                      <Button type={'delete'} onClick={(() => deleteCourse(course.id))}>
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