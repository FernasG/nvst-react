import { useEffect, useState } from 'react';
import { Container, Header, Title, Body, Chart } from './styles';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpensesService, RevenuesService } from '../../services';

export const Dashboard = ((): JSX.Element => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [revenuesData, setRevenuesData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (isFirstLoad) {
        const revenues = await RevenuesService.listRevenues();
        const revenuesArray = revenues.map((revenue: any) => ({ Title: revenue.title, Value: parseInt(revenue.value) }));
        setRevenuesData(revenuesArray);
        
        const expenses = await ExpensesService.listExpenses();
        const expensesArray = expenses.map((expense: any) => ({ Title: expense.title, Value: parseInt(expense.value) }));
        setExpensesData(expensesArray);

        setIsFirstLoad(false);
      }
    })();
  });

  return (
    <Container>
      <Header>
        <Title>Dashboard</Title>
      </Header>
      <Body>
        <h2>Revenues Chart</h2>
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={revenuesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>

        <h2>Expenses Chart</h2>
        <Chart>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={expensesData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Value" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
      </Body>
    </Container>
  );
});