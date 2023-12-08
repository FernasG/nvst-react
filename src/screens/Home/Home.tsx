import { useEffect, useState } from 'react';
import { Courses, Dashboard, Expenses, Revenues, Sidebar, Users, Campaigns } from '../../components';
import { Container, Panel } from './styles';

export const Home = ((): JSX.Element => {
  const [screen, setScreen] = useState<string>('users');
  const ScreensMap = new Map<string, (() => JSX.Element)>([
    ['users', Users],
    ['revenues', Revenues],
    ['expenses', Expenses],
    ['dashboard', Dashboard],
    ['courses', Courses],
    ['campaigns', Campaigns]
  ]);

  const selectScreen = ((): JSX.Element => {
    const ScreenTag = ScreensMap.get(screen);

    if (ScreenTag) return (<ScreenTag />);

    return (<Users />);
  });

  useEffect(() => { }, [screen]);

  return (
    <Container>
      <Sidebar setScreen={setScreen} />
      <Panel>
        {selectScreen()}
      </Panel>
    </Container>
  );
});