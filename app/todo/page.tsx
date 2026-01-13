'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function TodoApp() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [network, setNetwork] = useState<string>('eip155:84532'); // Default to Base Sepolia
  const [isConnected, setIsConnected] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock wallet connection for demo
  const connectWallet = () => {
    // In a real app, use Wagmi or Solana adapter
    // For this demo, we ask for an address or generate one
    const addr = window.prompt("Enter your wallet address for this session:", "0x123...");
    if (addr) {
      setWalletAddress(addr);
      setIsConnected(true);
      fetchTodos(addr, network);
    }
  };

  const fetchTodos = async (wallet: string, net: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos', {
        headers: {
          'x-user-wallet': wallet,
          'x-user-network': net
        }
      });
      if (res.ok) {
        const data = await res.json();
        setTodos(data.todos);
      } else {
        const err = await res.text();
        setError(`Failed to load todos: ${res.statusText}`);
        console.error("Fetch error:", err);
      }
    } catch (e) {
      setError("Network error loading todos");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-wallet': walletAddress,
          'x-user-network': network
        },
        body: JSON.stringify({ text: newTodo })
      });

      if (res.ok) {
        const data = await res.json();
        setTodos([...todos, data.todo]);
        setNewTodo('');
      }
    } catch (e) {
      console.error("Add failed", e);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    // Optimistic update
    const updatedTodos = todos.map(t => t.id === id ? { ...t, completed: !completed } : t);
    setTodos(updatedTodos);

    try {
      await fetch('/api/todos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-wallet': walletAddress,
          'x-user-network': network
        },
        body: JSON.stringify({ id, completed: !completed })
      });
    } catch (e) {
      console.error("Toggle failed", e);
      // Revert on failure
      fetchTodos(walletAddress, network);
    }
  };

  const deleteTodo = async (id: string) => {
    // Optimistic update
    setTodos(todos.filter(t => t.id !== id));

    try {
      await fetch(`/api/todos?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-user-wallet': walletAddress,
          'x-user-network': network
        }
      });
    } catch (e) {
      console.error("Delete failed", e);
      fetchTodos(walletAddress, network);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-2xl p-8 shadow-xl text-center border border-gray-700">
           <h2 className="text-3xl font-bold mb-6 text-purple-400">Connect Wallet</h2>
           <p className="text-gray-400 mb-8">
             To access your encrypted Magic To Do list, please connect your wallet.
           </p>

           <div className="mb-6 text-left">
             <label className="block text-sm font-medium text-gray-400 mb-2">Network</label>
             <select
               value={network}
               onChange={(e) => setNetwork(e.target.value)}
               className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-500 outline-none"
             >
               <option value="eip155:84532">Base Sepolia (EVM)</option>
               <option value="solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1">Solana Devnet</option>
             </select>
           </div>

           <button
             onClick={connectWallet}
             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
           >
             Connect Wallet
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Magic To Do
          </h1>
          <div className="text-sm text-gray-400 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </div>
        </header>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className="mb-8 relative">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What magic needs to happen?"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-6 py-4 text-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none shadow-lg transition-all"
          />
          <button
            type="submit"
            disabled={!newTodo.trim()}
            className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:hover:bg-purple-600 text-white p-3 rounded-lg transition-colors"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </form>

        {/* Todo List */}
        {loading && todos.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Loading magic...</div>
        ) : todos.length === 0 ? (
          <div className="text-center text-gray-500 py-12 bg-gray-800/30 rounded-xl border border-dashed border-gray-700">
            No tasks yet. Create some magic! ✨
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`group flex items-center gap-4 bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-all ${todo.completed ? 'opacity-60' : ''}`}
              >
                <button
                  onClick={() => toggleTodo(todo.id, todo.completed)}
                  className={`flex-shrink-0 transition-colors ${todo.completed ? 'text-green-500' : 'text-gray-500 hover:text-purple-500'}`}
                >
                  {todo.completed ? (
                    <CheckCircleSolidIcon className="h-7 w-7" />
                  ) : (
                    <CheckCircleIcon className="h-7 w-7" />
                  )}
                </button>

                <span className={`flex-grow text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                  {todo.text}
                </span>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-all p-2 rounded-lg hover:bg-gray-700/50"
                  title="Delete"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
