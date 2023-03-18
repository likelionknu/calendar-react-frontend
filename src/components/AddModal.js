import { useCallback, useState } from 'react';
import styled from 'styled-components';

const AddModal = ({ setModalOpen, concatTodo, nextId }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const closeModal = () => {
    setModalOpen(false);
  };
  const inputTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);
  const inputDate = useCallback((e) => {
    setDate(new Date(e.target.value));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    concatTodo({ id: nextId, title, date, done: false });
    closeModal();
  };
  return (
    <AddInterface>
      <form onSubmit={handleSubmit}>
        <div className="modalTitle">새로운 일정</div>
        <textarea
          className="inputTitle"
          type="textarea"
          placeholder="추가할 일정"
          onChange={inputTitle}
          required
        />
        <input
          className="inputDate"
          type="datetime-local"
          onChange={inputDate}
          required
        />
        <button type="submit">등록</button>
        <button onClick={closeModal}>취소</button>
      </form>
    </AddInterface>
  );
};

/*-----------------[styled-component]-----------------*/
const AddInterface = styled.div`
  width: 400px;
  height: 300px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background: #dce1f2;
  border-radius: 25px;
  overflow: hidden;
  text-align: center;
  .modalTitle {
    display: flex;
    height: 70px;
    justify-content: center;
    align-items: center;
    color: #112667;
    font-size: 1.7em;
  }
  .inputTitle {
    display: block;
    margin: auto;
    width: 320px;
    height: 100px;
    font-size: 1.7em;
    resize: none;
  }
  .inputDate {
    display: block;
    margin: 30px auto;
    width: 180px;
  }
  Button {
    margin: 5px 40px;
    width: 100px;
    font-size: 1.2em;
    border-radius: 25px;
    border: none;
    background: white;
    box-shadow: 2px 3px rgba(0, 0, 0, 0.16);
    color: #112667;
    transition: 0.5s;
    &:hover {
      background: #112667;
      color: white;
    }
  }
`;
export default AddModal;
