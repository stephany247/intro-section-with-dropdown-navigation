import { useEffect, useState } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  status: string;
}

interface TodoListProps {
  userId: string;
}

export default function TodoList({ userId }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost/intro-section-backend/apis/getUserTodos.php', {
          params: { user_id: userId },
          withCredentials: true,
        });
        if (Array.isArray(res.data)) {
          setTodos(res.data);
        } else {
          console.error('Unexpected response format:', res.data);
        }
      } catch (error) {
        console.error('Failed to fetch todos', error);
      }
    };
    fetchTodos();
  }, [userId]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost/intro-section-backend/apis/addTodo.php', {
        user_id: userId,
        title: newTodo,
      }, { withCredentials: true });
      if (res.data && res.data.id) {
        setTodos([...todos, res.data]);
        setNewTodo('');
      } else {
        console.error('Unexpected response format:', res.data);
      }
    } catch (error) {
      console.error('Failed to add todo', error);
    }
  };

  const handleToggleTodo = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    try {
      await axios.post('http://localhost/intro-section-backend/apis/updateTodoStatus.php', {
        id,
        status: newStatus,
      }, { withCredentials: true });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, status: newStatus } : todo));
    } catch (error) {
      console.error('Failed to update todo status', error);
    }
  };

  const pendingTodos = todos.filter(todo => todo.status === 'pending');

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Todo List</h2>
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border p-2 rounded mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
      <ul>
        {pendingTodos.map((todo) => (
          <li key={todo.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              checked={todo.status === 'completed'}
              onChange={() => handleToggleTodo(todo.id, todo.status)}
              className="mr-2"
            />
            <span className={todo.status === 'completed' ? 'line-through text-green-600' : 'text-yellow-600'}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
