import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'todos.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize DB file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({}), 'utf-8');
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface DB {
  [key: string]: Todo[]; // key is "network:walletAddress"
}

const getDB = (): DB => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const saveDB = (db: DB) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
};

const getKey = (network: string, wallet: string) => `${network}:${wallet.toLowerCase()}`;

export const getTodos = (network: string, wallet: string): Todo[] => {
  const db = getDB();
  const key = getKey(network, wallet);
  return db[key] || [];
};

export const createTodo = (network: string, wallet: string, text: string): Todo => {
  const db = getDB();
  const key = getKey(network, wallet);
  const newTodo: Todo = {
    id: Date.now().toString(),
    text,
    completed: false,
    createdAt: Date.now(),
  };

  if (!db[key]) {
    db[key] = [];
  }

  db[key].push(newTodo);
  saveDB(db);
  return newTodo;
};

export const updateTodo = (network: string, wallet: string, todoId: string, updates: Partial<Todo>): Todo | null => {
  const db = getDB();
  const key = getKey(network, wallet);
  const todos = db[key] || [];

  const index = todos.findIndex((t) => t.id === todoId);
  if (index === -1) return null;

  const updatedTodo = { ...todos[index], ...updates };
  todos[index] = updatedTodo;
  db[key] = todos;
  saveDB(db);
  return updatedTodo;
};

export const deleteTodo = (network: string, wallet: string, todoId: string): boolean => {
  const db = getDB();
  const key = getKey(network, wallet);
  const todos = db[key] || [];

  const initialLength = todos.length;
  const newTodos = todos.filter((t) => t.id !== todoId);

  if (newTodos.length === initialLength) return false;

  db[key] = newTodos;
  saveDB(db);
  return true;
};
