import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [input, setInput] = useState('');
  const [listAdd, setListAdd] = useState([{'name': 'Breakfast', 'edit': false}, {'name': 'Code', 'edit': false}]);
  const [listDone, setListDone] = useState([{'name': 'Wake up!', 'edit': false}]);
  const [edit, setEdit] = useState('');
  const [indexEdit, setIndexEdit] = useState('');

  useEffect(() => {
    console.log(input);
  }, [input]);

  useEffect(() => {
    
    if(localStorage.getItem('listAdd') && localStorage.getItem('listDone')) {
      setListAdd(JSON.parse(localStorage.getItem('listAdd')));
      setListDone(JSON.parse(localStorage.getItem('listDone')));
    } else {
      localStorage.setItem('listAdd', JSON.stringify(listAdd));
      localStorage.setItem('listDone', JSON.stringify(listDone));
    }
  }, []);

  const addNewPlan = (e) => {

    const afterTrim = input.trim();
    if(e.keyCode === 13) {
      if(afterTrim) {
        const newValue = [...listAdd];
        newValue.unshift({'name': input, 'edit': false});
        setListAdd(newValue);
        localStorage.setItem('listAdd', JSON.stringify(newValue));
        setInput('');
      }
    }
  }

  const setDonePlan = (e) => {
    let setDoneValue = [];
    let deleteDoneValue = [];

    deleteDoneValue = [...listAdd];

    setDoneValue = [...listDone];
    setDoneValue.push(deleteDoneValue[e]);

    deleteDoneValue.splice(e,1);

    localStorage.setItem('listAdd', JSON.stringify(deleteDoneValue));
    localStorage.setItem('listDone', JSON.stringify(setDoneValue));

    setListDone(setDoneValue);
    setListAdd(deleteDoneValue);
  }

  const deletePlan = (e) => {
    console.log(e);
    const findValueAdd =  listAdd.find(item => {
      return item.name === e;
    })

    const findValueDone =  listDone.find(item => {
      return item.name === e;
    })

    console.log(findValueAdd);
    console.log(findValueDone);

    if(findValueAdd) {
      console.log('add');
      let setNewValue = [...listAdd];
      let findIndex = setNewValue.indexOf(findValueAdd);
      setNewValue.splice(findIndex, 1);
      setListAdd(setNewValue);
      localStorage.setItem('listAdd', JSON.stringify(setNewValue));
    } 

    if(findValueDone) {
      console.log('done');
      let setNewValue = [...listDone];
      let findIndex = setNewValue.indexOf(findValueDone);
      setNewValue.splice(findIndex, 1);
      setListDone(setNewValue);
      localStorage.setItem('listDone', JSON.stringify(setNewValue));
    }
    console.log(e);
  }

  const editPlan = (e) => {
    setIndexEdit(e);
    const bool = listAdd[e].edit;
    console.log(listAdd[e]);
    const cloneAdd = [...listAdd];
    cloneAdd[e].edit = !bool;
    setListAdd(cloneAdd);
    localStorage.setItem('listAdd', JSON.stringify(cloneAdd));
    console.log(listAdd);
  }

  const editName = (e) => {
    const afterTrim = edit.trim();
    if(e.keyCode === 13) {
      if(afterTrim) {
        console.log("In if trim");
        const newValue = [...listAdd];
        newValue[indexEdit] = {'name': edit, 'edit': false};
        setListAdd(newValue);
        localStorage.setItem('listAdd', JSON.stringify(newValue));
        console.log(newValue);
      }
    }
  }

  return (
    <div className="app">
      <h1 className="app-title">TODO App</h1>

      <div className="app-layout">
        <div className="app-layoutInput">
          <input type="text" placeholder="Type you plan" className="inputAdd" value={input} onChange={ e => setInput(e.target.value) } onKeyDown={addNewPlan}/>
          {/* <span className="iconAdd">
            <i class="fas fa-plus"></i>
          </span> */}
        </div>
        {
          listAdd.length > 0 && listAdd.map( (list, index) => (
              <div className="app-layoutList" key={index}>
                <span className="iconCircle" onClick={() => setDonePlan(index)}>
                  <span className="emptyCircle">
                    <i class="far fa-circle"></i>
                  </span>
                  <span className="checkCircle">
                    <i class="far fa-check-circle"></i>
                  </span>
                </span>
                <div className="listName">
                  {
                    (list.edit) ? 
                      <input type="text" placeholder={list.name} className="editInput" value={edit.name} onChange={ e => setEdit(e.target.value) } onKeyDown={editName}/>
                    : 
                      <p onClick={() => editPlan(index)}>{list.name}</p>
                  }
                </div>
                <div className="list-rightModule">
                  <span className="iconEdit" onClick={() => editPlan(index)}>
                    {
                      (list.edit) ?
                      <i class="fas fa-check"></i>
                      :
                      <i class="far fa-edit" ></i>
                    }
                  </span>
                  <span className="iconMinus" onClick={() => deletePlan(list.name)}>
                    <i class="fas fa-minus"></i>
                  </span>
                </div>
              </div>
            )
          )
        }
        {
          listDone.length > 0 && listDone.map( (list, index) => (
            <div className="app-layoutDone" key={index}>
              <span className="iconCircle">
                <i class="far fa-check-circle"></i>
              </span>
              <p className="listName">{list.name}</p>
              <span className="iconMinus" onClick={() => deletePlan(list.name)}>
                <i class="fas fa-minus"></i>
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
