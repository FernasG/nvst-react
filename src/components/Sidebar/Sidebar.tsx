import { Container, Header, Title, Body, Item, Text } from './styles';
import { FaUsers, FaMoneyBill, FaShoppingCart } from 'react-icons/fa';
import { FaMobileScreen } from "react-icons/fa6";


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
      </Body>
    </Container>
  );
});