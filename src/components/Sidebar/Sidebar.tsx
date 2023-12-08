import { Container, Header, Title, Body, Item, Text } from './styles';
import { FaUsers, FaMoneyBill, FaShoppingCart, FaPaperPlane } from 'react-icons/fa';
import { FaMobileScreen } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';

interface Props {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar = (({ setScreen }: Props): JSX.Element => {
  const handleOnClick = ((item: string) => setScreen(item));

  return (
    <Container>
      <Header>
        <Title>NVST</Title>
      </Header>
      <Body>
        <Item onClick={(() => handleOnClick('users'))}>
          <FaUsers />
          <Text>Users</Text>
        </Item>

        <Item onClick={(() => handleOnClick('revenues'))}>
          <FaMoneyBill />
          <Text>Revenues</Text>
        </Item>

        <Item onClick={(() => handleOnClick('courses'))}>
          <FaMobileScreen />
          <Text>Courses</Text>
        </Item>

        <Item onClick={(() => handleOnClick('expenses'))}>
          <FaShoppingCart />
          <Text>Expenses</Text>
        </Item>

        <Item onClick={(() => handleOnClick('campaigns'))}>
          <FaPaperPlane />
          <Text>Campaigns</Text>
        </Item>

        <Item onClick={(() => handleOnClick('dashboard'))}>
          <MdDashboard />
          <Text>Dashboard</Text>
        </Item>
      </Body>
    </Container>
  );
});