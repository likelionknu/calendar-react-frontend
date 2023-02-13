import React, { useState, useEffect } from 'react';
import Head from './components/Head';
import Body from './components/Body';
import AddModal from './components/AddModal';

const Main = () => {
  const TODAY = new Date();
  const YEAR = TODAY.getFullYear();
  const MONTH = TODAY.getMonth() + 1;
  const DATE = TODAY.getDate();
  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [totalDate, setTotalDate] = useState([]);

  const changeDate = (month) => {
    //이전 날짜
    const PVLastDate = new Date(YEAR, month - 1, 0).getDate();
    const PVLastDay = new Date(YEAR, month - 1, 0).getDay();
    //다음 날짜
    const ThisLasyDay = new Date(YEAR, month, 0).getDay();
    const ThisLasyDate = new Date(YEAR, month, 0).getDate();

    //이전 날짜 만들기
    let PVLD = [];
    if (PVLastDay !== 6) {
      for (let i = 0; i < PVLastDay + 1; ++i) {
        PVLD.unshift(PVLastDate - i);
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
    setTotalDate(changeDate(month));
  }, [month]);

  const [today, setToday] = useState(0);

  const selectToday = () => {
    setMonth(MONTH);
    setToday(DATE);
  };
  const [addModalOpen, setAddModalOpen] = useState(false);
  return (
    <div>
      <Head year={year} month={month} setYear={setYear} setMonth={setMonth} selectToday={selectToday} />
      <Body totalDate={totalDate} today={today} month={month} year={year} />
      <div className='menu'>
        <button className='addBtn' onClick = {()=>setAddModalOpen(true)}>add</button>
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
