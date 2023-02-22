import React, { useState, useEffect } from "react";
import Head from "./components/Head";
import Body from "./components/Body";
import AddModal from "./components/AddModal";
import "./App.css";

const Main = () => {
  const TODAY = new Date();
  const TODAY_YEAR = TODAY.getFullYear();
  const TODAY_MONTH = TODAY.getMonth() + 1;
  const TODAY_DATE = TODAY.getDate();
  const [selectMonth, setSelectMonth] = useState(TODAY_MONTH);
  const [selectYear, setSelectYear] = useState(TODAY_YEAR);

  const [totalDate, setTotalDate] = useState([]);
  const checkNextMonth = (nextMonth) => {
    return nextMonth === 0 ? 12 : nextMonth === 13 ? 1 : nextMonth;
  };
  const changeDate = (month) => {
    //이전 날짜
    /*
    변수명은 다른사람이 한눈에 알아 볼 수 있게 정확히 무엇을 의미하는지 자세히 작성 부탁드립니다.
    const PVLastDate = new Date(TODAY_YEAR, month - 1, 0).getDate();
    */
    const prevMonthLastDate = new Date(selectYear, month - 1, 0).getDate();
    const prevMonthLastDay = new Date(selectYear, month - 1, 0).getDay(); // return day num (sun ~ sat : 0 ~ 6)
    //다음 날짜
    const ThisLasyDay = new Date(selectYear, month, 0).getDay();
    const ThisLasyDate = new Date(selectYear, month, 0).getDate();

    //이전 날짜 만들기
    let PVLD = [];
    console.log(selectYear);
    if (prevMonthLastDay !== 6) {
      console.log(selectMonth);
      for (let i = 0; i < prevMonthLastDay + 1; ++i) {
        PVLD.unshift(prevMonthLastDate - i);
      }
    }
    //다음 날짜 만들기
    let TLD = [];
    for (let i = 1; i < 7 - ThisLasyDay; ++i) {
      if (i === 0) {
        return TLD;
      }
      TLD.push(i);
    }

    //현재날짜
    let TD = [];

    TD = [...Array(ThisLasyDate + 1).keys()].slice(1);

    return PVLD.concat(TD, TLD);
  };

  useEffect(() => {
    setTotalDate(changeDate(selectMonth));
  }, [selectMonth]);

  const [today, setToday] = useState(0);

  const selectToday = () => {
    setSelectMonth(TODAY_MONTH);
    setToday(TODAY_DATE);
  };
  const [addModalOpen, setAddModalOpen] = useState(false);
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
      />
      <div className="menu">
        <button className="addBtn" onClick={() => setAddModalOpen(true)}>
          add
        </button>
        {addModalOpen && (
          <AddModal
            todos={totalDate}
            setTodos={setTotalDate}
            setModalOpen={setAddModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
