import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Modal = ({
  openModal,
  setOpenModal,
  year,
  month,
  date,
  hours,
  minutes,
  title,
  choiceListId,
  changeDone,
  deleteTodo,
  todos,
}) => {
  const [isDelete, setIsDelete] = useState(false);

  // 모달 끄기
  const closeModal = () => {
    if (isDelete) {
      deleteTodo(choiceListId);
      setIsDelete(false);
    }
    setOpenModal(false);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const wrapperRef = useRef();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <Container ref={wrapperRef} value={openModal}>
      <div className="list">
        <p className="title">예정된 일정</p>
        <p className="date">
          {year}-{month}-{date}
        </p>
        <p className="time">
          {hours}:{minutes}
        </p>
        <p className="todo">{title}</p>
        <p className="btn">
          <p
            className="delete"
            onClick={() => (isDelete ? setIsDelete(false) : setIsDelete(true))}
          >
            {isDelete ? '삭제 취소' : '삭제'}
          </p>
          <p className="done" onClick={() => changeDone(choiceListId)}>
            {todos[choiceListId].done ? '미완료' : '완료'}
          </p>
        </p>
      </div>
      <button className="close" onClick={closeModal}>
        Confirm
      </button>
    </Container>
  );
};

const Container = styled.div`
  /* 모달창 크기 */
  width: 500px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  border: 1px solid black;
  border-radius: 8px;
  background-color: white;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    margin: auto;
    padding: 1rem;
  }

  .date {
    padding: 1rem;
    display: flex;
    justify-content: center;
    margin: auto;
  }

  .time {
    padding: 0.5rem;
    margin: auto;
    display: flex;
    justify-content: center;
  }

  .todo {
    padding: 0.75rem;
    margin: auto;
    display: flex;
    justify-content: center;
    font-weight: bold;
  }

  .btn {
    display: inline-block;
    margin: auto;
    padding: 0 0 0.75rem 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .delete {
      display: inline-block;
      background-color: lightgray;
      border-radius: 4px 0px 0px 4px;
      padding: 0 1rem;

      &:hover {
        border: 1px solid black;
        cursor: pointer;
      }
      &:visited {
        border: 1px solid black;
      }
    }

    .done {
      display: inline-block;
      background-color: lightgray;
      border-radius: 0px 4px 4px 0px;
      padding: 0 1rem;

      &:hover {
        border: 1px solid black;
        cursor: pointer;
      }
      &:visited {
        border: 1px solid black;
      }
    }
  }
  .close {
    width: 100%;
    padding: 0.5rem;
    margin: auto;
    color: white;
    display: flex;
    justify-content: center;
    background-color: rgb(95, 0, 95);
    text-align: center;
    border-radius: 0px 0px 8px 8px;

    &:hover {
      background-color: rgb(172, 3, 172);
      cursor: pointer;
    }
  }
`;

export default Modal;
