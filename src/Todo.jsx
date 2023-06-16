import { useEffect, useState } from "react";
import "./Todo.css";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditTodo] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo !== '') {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo("");
    }

    if (editId) {
      const editTodo = todos.find((todo) => todo.id == editId)
      const updateTodo = todos.map((to) => to.id == editTodo.id
        ? (to = { id: to.id, list: todo }) : (to = { id: to.id, list: to.list }))

      setTodos(updateTodo)
      setEditTodo(0)
      setTodo('')
    }

  };
  if (todos.length != 0) {
    console.log(todos);
    localStorage.setItem("toDos", JSON.stringify(todos))
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("toDos")))

  }, [])
  
  const deleteTodo = (id) => {
    setTodos(todos.filter((to) => to.id !== id))
  }

  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return ({ ...list, status: !list.status })
      }
      return list
    })
    setTodos(complete)
  }

  const onEdit = (id) => {
    let editTodo = todos.find((to) => to.id === id)
    setTodo(editTodo.list)
    setEditTodo(editTodo.id)
  }


  return (
    <>
      <div className="container">
        <h4 className="todo text-white mb-4">todo list</h4>
        <form className="form-group" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter you todo"
            value={todo}
            className="input mb-3"
            onChange={(event) => setTodo(event.target.value)}
          />
          <button onClick={addTodo} > {editId ? 'EDIT' : 'ADD'}</button>
        </form>
        <div className="list mt-3">
          <ul>
            {todos.map((to) => (
              <li className="list-items">
                <div className="list-item-list" id={to.status ? 'list-item' : ''}>{to.list}</div>
                <span>
                  <MdOutlineDoneOutline
                    className="list-item-icons"
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(to.id)}
                  />
                  <FaRegEdit
                    className="list-item-icons"
                    id="edit"
                    title="Edit"
                    onClick={() => onEdit(to.id)}
                  />
                  <AiFillDelete
                    className="list-item-icons"
                    id="delete"
                    title="Delete"
                    onClick={() => deleteTodo(to.id)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todo;
