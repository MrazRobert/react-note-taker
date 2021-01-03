import './App.css';
import React, {useState, useEffect, useRef} from 'react';
import Note from './Note';
import Modal from './Modal';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) {
    return (JSON.parse(list));
  }else {
    return [];
  }
}

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [note, setNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [alert, setAlert] = useState({show: false, type: "", msg: ""});
  const inputField = useRef('');

  useEffect(() => {
    inputField.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!note) {
      showAlert(true, "danger", "Please enter value!")
    }else {
      const newItem = {
        id: new Date().getTime().toString(),
        note: note
      }
      showAlert(true, "success", "Note added to the list!");
      setList([...list, newItem]);
      setNote('');
    }
  }

  const openModal = (text) => {
    setIsModalOpen(true);
    setModalContent(text);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const removeItem = (id) => {
    showAlert(true, "danger", "Note deleted from the list!");
    setList(list.filter((item) => {
      return item.id !== id;
    }));
  }

  const showAlert = (show=false, type="", msg="") => {
    setAlert({show, type, msg});
  }

  return (
    <section>
      <h1>Note Taker</h1>
      <h2>Add A New Note:</h2>
      <div className="alert-container">
        {alert.show && <Alert 
                          {...alert} 
                          removeAlert={showAlert} 
                          list={list}
                        />
        }
      </div>
      <form className="form">
        <div>
          <label htmlFor="note" className="note-label">Note:</label>
          <textarea 
            name="note" 
            id="note" 
            cols="100" 
            rows="3" 
            value={note}
            ref={inputField}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <div className="button-container">
            <button 
              type="submit" 
              className="btn" 
              onClick={handleSubmit}
            >
              Add Note
            </button>
          </div> 
        </div>
      </form>
      <div className="notes">
        {list.map((item, index) => {
          return (
            <Note 
              key={item.id} 
              item={item} 
              index={index} 
              openModal={openModal}
              removeItem={removeItem}
            />
          )
        })}
      </div>
      <Modal 
        isModalOpen={isModalOpen} 
        modalContent={modalContent}
        closeModal={closeModal}
      />
    </section>
  );
}

export default App;
