import React, { useState, useEffect } from 'react';
import "./style.css";
const ToDo = () => {
  const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");
    if (lists) {
      return JSON.parse(lists);
    }
    else {
      return [];
    }
  }

  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const handleInputChange = (event) => {
    setInputData(event.target.value);
  }
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    }
    else if (inputdata && toggleButton) {
      setItems(
        items.map((curEle) => {
          if (curEle.id === isEditItem) {
            return { ...curEle, name: inputdata }
          }
          return curEle;
        })
      );
      setInputData("")
      setIsEditItem(null);
      setToggleButton(false);

    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, myNewInputData])
      setInputData("")
    }
  }
  //edit items
  const editItem = (index) => {
    const item_todo_edited = items.find((curEle) => {
      return curEle.id === index;
    });
    setInputData(item_todo_edited.name)
    setIsEditItem(index);
    setToggleButton(true);
  }
  //delete items
  const deleteItem = (index) => {
    const updatedItem = items.filter((curEle) => {
      return curEle.id !== index
    });
    setItems(updatedItem)

  }
  const removeAll = () => {
    setItems([]);
  }
  //adding local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items))
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/image1.jpg" alt="ToDoLogo" />
            <figcaption>ToDo List ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input type="text"
              placeholder="✍️Add Items"
              className="form-control"
              value={inputdata}
              onChange={handleInputChange}
            />
            {toggleButton ?
              (<i className="fa fa-edit add-btn" onClick={addItem}></i>)
              :
              (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
            }
          </div>
          <div className="showItems">
            {items.map((curEle) => {
              return (
                <div className="eachItem" key={curEle.id}>
                  <h3>
                    {curEle.name}
                  </h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={() => {
                      editItem(curEle.id)
                    }}></i>
                    <i className="far fa-trash-alt add-btn" onClick={() => {
                      deleteItem(curEle.id)
                    }}></i>
                  </div>

                </div>
              )
            })}
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
              <span>Check List</span>
            </button>
          </div>
          <div className="github-link">
            <p>View the <a href="https://github.com/your-username/your-repo"><i className="fab fa-github"></i> Source Code</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToDo