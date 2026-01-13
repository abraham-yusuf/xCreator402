import { createTodo, getTodos, updateTodo, deleteTodo } from '../lib/db';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

// Setup test environment
const TEST_DATA_DIR = path.join(process.cwd(), 'data');
const TEST_DB_FILE = path.join(TEST_DATA_DIR, 'todos.json');

// Mock wallet info
const TEST_WALLET = '0xTestWallet123';
const TEST_NETWORK = 'eip155:84532';

console.log("Starting Persistence Test...");

// 1. Reset DB
if (fs.existsSync(TEST_DB_FILE)) {
  fs.writeFileSync(TEST_DB_FILE, JSON.stringify({}));
}

// 2. Test Create
console.log("Testing Create...");
const todo = createTodo(TEST_NETWORK, TEST_WALLET, "Buy magic wand");
assert.strictEqual(todo.text, "Buy magic wand");
assert.strictEqual(todo.completed, false);
console.log("✅ Create passed");

// 3. Test Read
console.log("Testing Read...");
let todos = getTodos(TEST_NETWORK, TEST_WALLET);
assert.strictEqual(todos.length, 1);
assert.strictEqual(todos[0].id, todo.id);
console.log("✅ Read passed");

// 4. Test Update
console.log("Testing Update...");
const updated = updateTodo(TEST_NETWORK, TEST_WALLET, todo.id, { completed: true });
assert.strictEqual(updated?.completed, true);

todos = getTodos(TEST_NETWORK, TEST_WALLET);
assert.strictEqual(todos[0].completed, true);
console.log("✅ Update passed");

// 5. Test Delete
console.log("Testing Delete...");
const deleted = deleteTodo(TEST_NETWORK, TEST_WALLET, todo.id);
assert.strictEqual(deleted, true);

todos = getTodos(TEST_NETWORK, TEST_WALLET);
assert.strictEqual(todos.length, 0);
console.log("✅ Delete passed");

// 6. Test Isolation (Different Wallet)
console.log("Testing Isolation...");
createTodo(TEST_NETWORK, "0xOtherWallet", "Secret plan");
const myTodos = getTodos(TEST_NETWORK, TEST_WALLET);
const otherTodos = getTodos(TEST_NETWORK, "0xOtherWallet");
assert.strictEqual(myTodos.length, 0);
assert.strictEqual(otherTodos.length, 1);
console.log("✅ Isolation passed");

console.log("🎉 All persistence tests passed!");
