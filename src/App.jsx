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
        <fieldset className="note-container d-flex flex-column mx-auto">
          <legend>메모 노트</legend>
          <input
            type="text"
            className="my-1"
            name="title"
            id="title"
            placeholder="note title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            style={{ maxWidth: '400px' }}
            name="body"
            id="body"
            cols="30"
            rows="5"
            placeholder="note text"
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
          <div className="d-flex gap-1 justify-end">
            <button type="button" className="note-del">
              취소
            </button>
            <button type="submit" className="note-create">
              기록
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
function Footer({ notes }) {
  console.log(notes);
  return (
    <>
      <ul className="notes-area d-flex">
        {notes.map(note => {
          return (
            <li key={note.id} className="note-box posi-relative">
              <div className="note-title d-flex items-center justify-between posi-relative">
                <h3>{note.title}</h3>
                <img
                  src="../images/edit-icon.png"
                  alt="edit-icon"
                  className="edit-title-icon posi-absolute"
                />
              </div>
              <div className="note-body">
                <p>{note.body}</p>
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
  const [notes, setnotes] = useState([]);
  const [id, setId] = useState(1);
  function onCreate(title, body, count) {
    // console.log('제목에', title, '내용에', body);
    const newNote = { id: count, title: title, body: body };
    setnotes([...notes, newNote]);
    setId(count);
  }
  return (
    <>
      <Header Header={Header} />
      <Body Body={Body} onCreate={onCreate} />
      <Footer notes={notes} />
    </>
  );
}

export default App;
