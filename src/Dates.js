import React, { useState } from 'react';
import styled from 'styled-components';

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
  } = props;

  const [userInput, setUserInput] = useState({});
  const [evtList, setEvtList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  let dateKey = `${month}` + `${elm}`;
  const registEvent = (value) => {
    setEvtList([...evtList, value]);
    setUserInput('');
    setOpenModal(false);
  };

  return (
    <>
      <Form
        onDoubleClick={() => {
          setOpenModal(true);
        }}
      >
        <DateNum
          idx={idx}
          lastDate={lastDate}
          firstDate={firstDate}
          findToday={findToday}
        >
          <TodayCSS findToday={findToday}>{elm}</TodayCSS>일
        </DateNum>
        <div className="todoList" style={{ textAlign: 'left', fontSize: '15px'}}>
          {todos
            .filter(
              (todo) =>
                todo.date.getFullYear() === year &&
                todo.date.getMonth() + 1 === month &&
                todo.date.getDate() === elm,
            )
            .slice(0,7).map((todo) => {
              return <div>{todo.title}</div>;
            })}
        </div>
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
  ${(props) => props.idx < props.lastDate && `display : none`};
  ${(props) =>
    props.firstDate > 0 &&
    props.idx > props.firstDate - 1 &&
    `display : none`};
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

export default Dates;
