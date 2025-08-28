'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

interface Tool {
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'tested' | 'published' | 'promotion-requested';
}

const initialTools: Tool[] = [
  { id: 1, name: 'Sample Tool', description: 'Example published tool', status: 'published' }
];

export default function Page() {
  const [server, setServer] = useState('playground-1');
  const [tools, setTools] = useState<Tool[]>(initialTools);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [testing, setTesting] = useState<number | null>(null);

  const registerTool = (e: React.FormEvent) => {
    e.preventDefault();
    setTools([...tools, { id: Date.now(), name, description, status: 'draft' }]);
    setName('');
    setDescription('');
  };

  const testTool = (id: number) => {
    setTesting(id);
    setTimeout(() => {
      setTools(ts => ts.map(t => t.id === id ? { ...t, status: 'tested' } : t));
      setTesting(null);
    }, 1000);
  };

  const publishTool = (id: number) => {
    setTools(ts => ts.map(t => t.id === id ? { ...t, status: 'published' } : t));
  };

  const promoteTool = (id: number) => {
    setTools(ts => ts.map(t => t.id === id ? { ...t, status: 'promotion-requested' } : t));
  };

  return (
    <main className="container mx-auto p-4 space-y-8">
      <section className="space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Server className="h-6 w-6" /> MCP Tool Registration & Management
        </h1>
        <div className="flex flex-col gap-2 max-w-sm">
          <label className="text-sm font-medium">Playground Server</label>
          <select
            className="border rounded p-2"
            value={server}
            onChange={e => setServer(e.target.value)}
          >
            <option value="playground-1">Playground 1</option>
            <option value="playground-2">Playground 2</option>
          </select>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Register New Tool</h2>
        <form className="space-y-2 max-w-md" onSubmit={registerTool}>
          <Input
            placeholder="Tool Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <Button type="submit">Save</Button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Tools</h2>
        <ul className="space-y-4">
          {tools.map(tool => (
            <li key={tool.id} className="p-4 border rounded">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-gray-500">{tool.description}</p>
                  <p className="text-xs mt-1">Status: {tool.status}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => testTool(tool.id)}>
                    Test
                  </Button>
                  <Button
                    onClick={() => publishTool(tool.id)}
                    disabled={tool.status !== 'tested'}
                  >
                    Publish
                  </Button>
                  <Button
                    onClick={() => promoteTool(tool.id)}
                    disabled={tool.status !== 'published'}
                  >
                    Promote
                  </Button>
                </div>
              </div>
              {testing === tool.id && (
                <motion.div
                  className="h-1 bg-blue-500 mt-2"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1 }}
                />
              )}
              {tool.status === 'published' && (
                <div className="mt-2 flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-4 w-4" /> Published
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
