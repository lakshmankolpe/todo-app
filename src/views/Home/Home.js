import React, { useEffect, useState } from 'react';
import "./Home.css";
import Addicon from "./add.png";
import ToDoCard from '../../components/ToDoCard/ToDoCard';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

function Home() {
    const [todolist, setTodolist] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const savedTodoList = localStorage.getItem("todoList");
        if (savedTodoList) {
            setTodolist(JSON.parse(savedTodoList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todolist));
    }, [todolist]);

    function deletItem(index) {
        Swal.fire({
            title: "Are your sure?",
            text: "You want to delete this task",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (!result.isConfirmed) {
                return
            }
            const newTodoList = todolist.filter((item, i) => {
                if (i !== index) {
                    return true;
                } else {
                    return false;
                }
            });
            setTodolist(newTodoList);
        });

    }
    return (
        <div className='todo-app-main-container'>
            <h1 className='app-title'>ToDo App 📝</h1>
            <div className='todo-list-container'>
                {todolist.map((todoItem, i) => {
                    const { task, category } = todoItem;

                    return <ToDoCard key={i} index={i} task={task} category={category}
                        deletItem={deletItem} />;
                })}
                {
                    todolist.length === 0 ?
                        <p style={{ textAlign: "center" }}>No task to show, please add a new task</p>
                        :
                        null
                }
            </div>

            <div className='add-todo-item-container'>
                <input
                    type='text'
                    className='add-input'
                    placeholder='Add a New Task'
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value);
                    }}
                />

                <select
                    className='category-select'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">None</option>
                    <option value="learning">Learning</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">other</option>
                </select>

                <img
                    src={Addicon}
                    className='add-icon'
                    alt='add'
                    onClick={() => {
                        if (newTask === "") {
                            toast.error("Task cannot be empty!");
                            return;
                        }
                        if (category === "") {
                            toast.error("Please select a category");
                            return;
                        }
                        setTodolist([...todolist, { task: newTask, category }]);
                        setNewTask("");
                        setCategory("");
                        toast.success("Task added successfully!");
                    }}
                />
            </div>
            <Toaster />
        </div>
    );
}

export default Home;
