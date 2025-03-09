import React from 'react';
import './App.css';
import { useState } from 'react';

function Header() {
  return (
    <>
      <h1 className="header-title text-center">my notes list</h1>
    </>
  );
}
function Body({ onCreate }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [count, setCount] = useState(1);
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          const titleInput = title.trim() === '' ? `임시 제목 ${count}` : title;
          const bodyInput = body.trim() === '' ? `임시 본문 ${count}` : body;
          const countInput = count;
          onCreate(titleInput, bodyInput, countInput);
          setTitle('');
          setBody('');
          setCount(count + 1);
        }}
      >
        <fieldset className="memo-container d-flex flex-column mx-auto">
          <legend>메모 노트</legend>
          <input
            type="text"
            className="my-1"
            name="title"
            id="title"
            placeholder="memo title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            style={{ maxWidth: '400px' }}
            name="body"
            id="body"
            cols="30"
            rows="5"
            placeholder="memo text"
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
          <div className="d-flex gap-1 justify-end">
            <button type="button" className="memo-del">
              취소
            </button>
            <button type="submit" className="memo-create">
              기록
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
function Footer({ memos }) {
  console.log(memos);
  return (
    <>
      <ul className="memos-area d-flex">
        {memos.map(memo => {
          return (
            <li key={memo.id} className="memo-box posi-relative">
              <div className="memo-title d-flex items-center justify-between posi-relative">
                <h3>{memo.title}</h3>
                <img
                  src="../images/edit-icon.png"
                  alt="edit-icon"
                  className="edit-title-icon posi-absolute"
                />
              </div>
              <div className="memo-body">
                <p>{memo.body}</p>
              </div>
              <img
                src="../images/edit-icon.png"
                alt="edit-icon"
                className="edit-body-icon posi-absolute"
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

function App() {
  const [memos, setMemos] = useState([]);
  const [id, setId] = useState(1);
  function onCreate(title, body, count) {
    // console.log('제목에', title, '내용에', body);
    const newMemo = { id: count, title: title, body: body };
    setMemos([...memos, newMemo]);
    setId(count);
  }
  return (
    <>
      <Header Header={Header} />
      <Body Body={Body} onCreate={onCreate} />
      <Footer memos={memos} />
    </>
  );
}

export default App;
