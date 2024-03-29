import styled from 'styled-components';
import Dates from './Dates';

const Body = (props) => {
  const {
    totalDate,
    today,
    month,
    year,
    todos,
    isAllView,
    changeDone,
    deleteTodo,
  } = props;
  const lastDate = totalDate.indexOf(1);
  const firstDate = totalDate.indexOf(1, 7);

  //today
  const findToday = totalDate.indexOf(today);
  const getMonth = new Date().getMonth() + 1;
  return (
    <Form>
      {totalDate.map((elm, idx) => {
        return (
          <Dates
            key={idx}
            idx={idx}
            lastDate={lastDate}
            firstDate={firstDate}
            elm={elm}
            findToday={findToday === idx && month === getMonth && findToday}
            month={month}
            year={year}
            todos={todos}
            isAllView={isAllView}
            changeDone={changeDone}
            deleteTodo={deleteTodo}
          ></Dates>
        );
      })}
    </Form>
  );
};

const Form = styled.div`
  display: flex;
  flex-flow: row wrap;
`;
export default Body;
