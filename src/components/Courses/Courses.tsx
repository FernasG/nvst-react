import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { Container, Header, Title, Panel, SubmitButton, Input, Body, Table, TableHeader, HeaderItem, TableBody, TableRow, RowItem, Button } from './styles';
import { CoursesService } from '../../services';

export const Courses = ((): JSX.Element => {
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [courses, setCourses] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);

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


  return (
    <Container>
      <Header>
        <Title>Courses</Title>
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
                        <FaEdit size={'17px'} />
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