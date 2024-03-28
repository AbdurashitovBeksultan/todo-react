import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const TodoList = () => {
	const [todos, setTodos] = useState([])
	const [newTodo, setNewTodo] = useState('')

	const fetchTodos = async () => {
		try {
			const response = await axios.get(
				'https://api.elchocrud.pro/api/v1/30dc2d240902da6f6786e8a0e41fdd1d/todolist',
			)
			setTodos(response.data)
		} catch (error) {
			console.error('Ошибка при загрузке ToDo:', error)
		}
	}

	useEffect(() => {
		fetchTodos()
	}, [])

	const addTodo = async () => {
		try {
			const response = await axios.post(
				'https://api.elchocrud.pro/api/v1/30dc2d240902da6f6786e8a0e41fdd1d/todolist',
				{
					title: newTodo,
					completed: false,
				},
			)

			setTodos([...todos, response.data])
			setNewTodo('')
			fetchTodos()
		} catch (error) {
			console.error('Ошибка при добавлении ToDo:', error)
		}
	}

	const deleteTodo = async (_id) => {
		try {
			await axios.delete(
				`https://api.elchocrud.pro/api/v1/30dc2d240902da6f6786e8a0e41fdd1d/todolist/${_id}`,
			)
			setTodos(todos.filter((todo) => todo._id !== _id))
		} catch (error) {
			console.error('Ошибка при удалении ToDo:', error)
		}
	}

	return (
		<div>
			<h1 className='h1'>ToDo List</h1>
			<input
				type='text'
				placeholder='Добавить новую задачу'
				value={newTodo}
				onChange={(e) => setNewTodo(e.target.value)}
			/>
			
			<button className='add' onClick={addTodo}>
				<FontAwesomeIcon icon={faUpload} />
			</button>
			<ul>
				{todos.map((todo) => (
					<li key={todo._id}>
						{todo.title}
						<button onClick={() => deleteTodo(todo._id)}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default TodoList
