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
function Body({ onCreate, notes }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [count, setCount] = useState(notes.length + 1);
  return (
    <>
      <form
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          const titleInput = title.trim() === '' ? `임시 제목 ${count}` : title;
          const bodyInput = body.trim() === '' ? `임시 본문 ${count}` : body;
          // gpt 추천 : trim() 은 공백을 제거하고 남는것을 물어봄
          // title.trim()은 title을 공백을 제거하고 봣을때
          // 공백(빈 값)이면 임시 제목을, 외에는 title 값을 그대로 입력한다
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
            name="body"
            id="body"
            cols="30"
            rows="5"
            placeholder="note text"
            value={body}
            onChange={e => setBody(e.target.value)}
          ></textarea>
          <div className="text-end">
            <button type="submit" className="note-create">
              기록
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
function Footer({ notes, onDelNote }) {
  // console.log(notes);
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
                  className="edit-icon posi-absolute"
                  onClick={() => {
                    onEditNote(note);
                  }}
                />
              </div>
              <div className="note-body">
                <p>{note.body}</p>
              </div>
              <img
                src="../images/delete-note-icon.png"
                alt="del-icon"
                className="delete-note-icon posi-absolute"
                onClick={() => onDelNote(note.id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
function onEditNote(note) {
  console.log(note);
}
function App() {
  const [notes, setNotes] = useState([]);
  const [id, setId] = useState(1);
  function onCreate(title, body, count) {
    // console.log('제목에', title, '내용에', body);
    const newNote = { id: count, title: title, body: body };
    setNotes([...notes, newNote]);
    setId(count);
  }
  function onDelNote(id) {
    setNotes(notes.filter(note => note.id !== id))
  }
  return (
    <>
      <Header />
      <Body notes={notes} onCreate={onCreate} />
      <Footer notes={notes} onDelNote={onDelNote} />
    </>
  );
}

export default App;
