import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';

const Dates = (props) => {
  const {
    lastDate,
    firstDate,
    elm,
    findToday,
    month,
    year,
    idx,
    holiday,
    todos,
    isAllView,
    changeDone,
    deleteTodo,
  } = props;

  const [userInput, setUserInput] = useState({});
  const [evtList, setEvtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [choiceListId, setChoiceListId] = useState(0);

  useEffect(() => {}, [todos]);

  let dateKey = `${month}` + `${elm}`;
  const registEvent = (value) => {
    setEvtList([...evtList, value]);
    setUserInput('');
    setOpenModal(false);
  };

  const clickList = (id) => {
    setChoiceListId(id);
  };

  return (
    <>
      <Form>
        <DateNum
          idx={idx}
          lastDate={lastDate}
          firstDate={firstDate}
          findToday={findToday}
        >
          <TodayCSS findToday={findToday}>{elm}</TodayCSS>일
        </DateNum>
        <div className="todoList">
          {todos
            .filter(
              (todo) =>
                todo.date.getFullYear() === year &&
                todo.date.getMonth() + 1 === month &&
                todo.date.getDate() === elm &&
                todo.done === isAllView,
            )
            .map((todo) => {
              return (
                <TodoComponent
                  key={todo.id}
                  done={todo.done}
                  onClick={() => {
                    clickList(todo.id);
                    setOpenModal(true);
                    console.log(todos);
                  }}
                >
                  {todo.title}
                </TodoComponent>
              );
            })}
        </div>
        {holiday !== undefined && (
          <Holidays>
            {holiday !== undefined &&
              holiday.map((evt, index) => {
                return (
                  Number(
                    `${year}${month}${elm.length < 2 ? '' : '0'}${elm}`,
                  ) === evt.locdate && (
                    <Holiday key={index}>{evt.dateName}</Holiday>
                  )
                );
              })}
          </Holidays>
        )}
        {Boolean(evtList[0]) && (
          <Lists>
            {evtList.map((list, index) => {
              return (
                list.slice(0, list.indexOf('_')) === dateKey && (
                  <List
                    key={index}
                    onClick={() => {
                      setOpenModal(true);
                    }}
                  >
                    {list.slice(list.indexOf('_') + 1, list.length)}
                  </List>
                )
              );
            })}
          </Lists>
        )}
      </Form>
      {openModal && (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          year={todos[choiceListId].date.getFullYear()}
          month={
            todos[choiceListId].date.getMonth() + 1 < 10
              ? '0' + (todos[choiceListId].date.getMonth() + 1)
              : todos[choiceListId].date.getMonth() + 1
          }
          date={
            todos[choiceListId].date.getDate() < 10
              ? '0' + todos[choiceListId].date.getDate()
              : todos[choiceListId].date.getDate()
          }
          hours={
            todos[choiceListId].date.getHours() < 10
              ? '0' + todos[choiceListId].date.getHours()
              : todos[choiceListId].date.getHours()
          }
          minutes={
            todos[choiceListId].date.getMinutes() < 10
              ? '0' + todos[choiceListId].date.getMinutes()
              : todos[choiceListId].date.getMinutes()
          }
          title={todos[choiceListId].title}
          choiceListId={choiceListId}
          changeDone={changeDone}
          deleteTodo={deleteTodo}
          todos={todos}
        />
      )}
    </>
  );
};
const Form = styled.li`
  position: relative;
  padding: 0 0.6vw;
  width: calc(100% / 7);
  height: 9vw;
  text-align: right;
  border-bottom: 1px solid #e4e3e6;
  border-left: 1px solid #e4e3e6;
  :nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
    background-color: #f5f5f5;
  }
`;

const DateNum = styled.div`
  padding: 1vw 0.9vw 0 0;
  ${(props) => props.idx < props.lastDate && `color: #ffffff;`};
  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    color: #ffffff;
  `};
`;

const TodayCSS = styled.span`
  ${(props) =>
    props.findToday &&
    ` position: relative;
    padding: .5vw;
    border-radius: 50%;
    font-size: 1.2vw;
    font-weight: 700;
    color: #FFFFFF;
    background-color:red
 `}
`;

const Lists = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const List = styled.span`
  margin-top: 0.3vw;
  padding-left: 0.5vw;
  background-color: #f7ced9;
  border-radius: 5px;
`;
const Holidays = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;
const Holiday = styled.div`
  margin-top: 0.3vw;
  padding-left: 0.5vw;
  color: red;
  font-weight: 700;
  background-color: skyblue;
  border-radius: 5px;
`;
const TodoComponent = styled.div`
  cursor: pointer;
  ${(props) =>
    props.done &&
    `
      color: #969696;
      text-decoration: line-through;
    `}
`;
export default Dates;
