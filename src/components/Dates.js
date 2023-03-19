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
    todos,
    isAllView,
    changeDone,
    deleteTodo,
  } = props;

  const [openModal, setOpenModal] = useState(false);
  const [choiceListId, setChoiceListId] = useState(0);

  const clickList = (id) => {
    setChoiceListId(id);
  };
  useEffect(() => {}, [choiceListId]);

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
        <div
          className="todoList"
          style={{
            textAlign: 'left',
            fontSize: '15px',
            color: 'black',
            backgroundColor: '#FFFFCC',
          }}
        >
          {todos
            .filter(
              (todo) =>
                todo.date.getFullYear() === year &&
                todo.date.getMonth() + 1 === month &&
                todo.date.getDate() === elm &&
                (isAllView || (!isAllView && todo.done === true)),
            )
            .slice(0, 5)
            .map((todo) => {
              if (lastDate <= idx && firstDate > idx)
                return (
                  <TodoComponent
                    key={todo.id}
                    done={todo.done}
                    onClick={() => {
                      clickList(todo.id);
                      setOpenModal(true);
                    }}
                  >
                    {todo.title}
                  </TodoComponent>
                );
            })}
        </div>
      </Form>
      {openModal && (
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          year={todos.map(
            (todo) => todo.id === choiceListId && todo.date.getFullYear(),
          )}
          month={todos.map(
            (todo) =>
              todo.id === choiceListId &&
              (todo.date.getMonth() + 1 < 10
                ? '0' + (todo.date.getMonth() + 1)
                : todo.date.getMonth() + 1),
          )}
          date={todos.map(
            (todo) =>
              todo.id === choiceListId &&
              (todo.date.getDate() < 10
                ? '0' + todo.date.getDate()
                : todo.date.getDate()),
          )}
          hours={todos.map(
            (todo) =>
              todo.id === choiceListId &&
              (todo.date.getHours() < 10
                ? '0' + todo.date.getHours()
                : todo.date.getHours()),
          )}
          minutes={todos.map(
            (todo) =>
              todo.id === choiceListId &&
              (todo.date.getMinutes() < 10
                ? '0' + todo.date.getMinutes()
                : todo.date.getMinutes()),
          )}
          title={todos.map((todo) => todo.id === choiceListId && todo.title)}
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
  ${(props) => props.idx < props.lastDate && `display : none;`};
  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `
    display : none
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
