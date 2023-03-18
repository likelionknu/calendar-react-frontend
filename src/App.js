import React, { useState, useEffect } from 'react';
import Head from './components/Head';
import Body from './components/Body';
import AddModal from './components/AddModal';
import './App.css';

const Main = () => {
  const TODAY = new Date();
  const TODAY_YEAR = TODAY.getFullYear();
  const TODAY_MONTH = TODAY.getMonth() + 1;
  const TODAY_DATE = TODAY.getDate();
  const [selectMonth, setSelectMonth] = useState(TODAY_MONTH);
  const [selectYear, setSelectYear] = useState(TODAY_YEAR);

  const [totalDate, setTotalDate] = useState([]);
  const changeDate = (month) => {
    const prevMonthLastDate = new Date(selectYear, month - 1, 0).getDate();
    const prevMonthLastDay = new Date(selectYear, month - 1, 0).getDay();
    const selectMonthLastDate = new Date(selectYear, month, 0).getDate();
    const selectMonthLastDay = new Date(selectYear, month, 0).getDay();

    let prevMonthLastDates = [];
    if (prevMonthLastDay !== 6) {
      // 토요일이 아닌 경우에만
      for (let i = 0; i <= prevMonthLastDay; ++i)
        prevMonthLastDates.unshift(prevMonthLastDate - i);
    }

    let nextMonthFirstDates = [];
    for (let i = 1; i < 7 - selectMonthLastDay; ++i) {
      nextMonthFirstDates.push(i);
    }

    let selectMonthDates = [];
    selectMonthDates = [...Array(selectMonthLastDate + 1).keys()];
    selectMonthDates.shift();
    return prevMonthLastDates.concat(selectMonthDates, nextMonthFirstDates);
  };

  useEffect(() => {
    setTotalDate(changeDate(selectMonth));
  }, [selectMonth]);

  const [today, setToday] = useState(0);

  const selectToday = () => {
    setSelectMonth(TODAY_MONTH);
    setToday(TODAY_DATE);
  };
  const [todos, setTodos] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isAllView, setIsAllView] = useState(true); // 일정 완료 여부 표시 버튼, 기능 미구현

  const [nextId, setNextId] = useState(0);
  const concatTodo = (todo) => {
    setNextId(nextId + 1);
    setTodos(todos.concat(todo));
  };
  // 완료버튼
  const changeDone = (id) => {
    const changeTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.done ? (todo.done = false) : (todo.done = true);
      }
      return todo;
    });
    setTodos(changeTodos);
  };
  // 삭제버튼
  const deleteTodo = (id) => {
    const changeTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(changeTodos);
  };
  return (
    <div>
      <Head
        year={selectYear}
        month={selectMonth}
        setYear={setSelectYear}
        setMonth={setSelectMonth}
        selectToday={selectToday}
      />
      <Body
        totalDate={totalDate}
        today={today}
        month={selectMonth}
        year={selectYear}
        todos={todos}
        isAllView={isAllView}
        changeDone={changeDone}
        deleteTodo={deleteTodo}
      />
      <div className="menu">
        <button
          className="toggleViewBtn"
          onClick={() => setIsAllView(!isAllView)}
        >
          {isAllView ? 'Hidden' : 'All'}
        </button>
        <button className="addBtn" onClick={() => setAddModalOpen(true)}>
          add
        </button>
        {addModalOpen && (
          <AddModal
            todos={todos}
            setTodos={setTodos}
            setModalOpen={setAddModalOpen}
            concatTodo={concatTodo}
            nextId={nextId}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
