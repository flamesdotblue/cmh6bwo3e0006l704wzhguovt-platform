import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Play, PlusCircle, Database, Globe, MessageSquare, Timer, GitBranch, Webhook, Settings } from 'lucide-react';

const NODE_TYPES = [
  { type: 'trigger', label: 'Trigger (Webhook)', icon: Webhook, color: 'from-emerald-500/20 to-emerald-500/10', border: 'border-emerald-400/30' },
  { type: 'llm', label: 'AI Model', icon: MessageSquare, color: 'from-cyan-500/20 to-cyan-500/10', border: 'border-cyan-400/30' },
  { type: 'http', label: 'HTTP Request', icon: Globe, color: 'from-blue-500/20 to-blue-500/10', border: 'border-blue-400/30' },
  { type: 'db', label: 'Database', icon: Database, color: 'from-purple-500/20 to-purple-500/10', border: 'border-purple-400/30' },
  { type: 'delay', label: 'Delay', icon: Timer, color: 'from-amber-500/20 to-amber-500/10', border: 'border-amber-400/30' },
];

let idCounter = 1;
const createNode = (type) => {
  const def = NODE_TYPES.find((n) => n.type === type);
  return {
    id: `node-${idCounter++}`,
    type,
    x: 80,
    y: 60,
    data: { name: def?.label || 'Node', config: {} },
  };
};

function NodeCard({ node, onDragStart, onRemove, selected, onSelect }) {
  const def = NODE_TYPES.find((n) => n.type === node.type);
  const Icon = def?.icon || Settings;
  return (
    <div
      className={`absolute rounded-lg border ${def?.border} bg-gradient-to-b ${def?.color} backdrop-blur-sm shadow-lg cursor-grab active:cursor-grabbing select-none min-w-[180px] max-w-[240px]`}
      style={{ left: node.x, top: node.y }}
      onMouseDown={(e) => onDragStart(e, node.id)}
      onClick={(e) => { e.stopPropagation(); onSelect(node.id); }}
    >
      <div className={`px-3 py-2 flex items-center justify-between ${selected ? 'ring-2 ring-cyan-400/70' : ''} rounded-lg`}>
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{node.data.name}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onRemove(node.id); }} className="text-white/60 hover:text-white/90 text-xs px-2">
          ✕
        </button>
      </div>
      <div className="px-3 pb-3 text-xs text-white/70">
        <p>Type: <span className="text-white/90 font-mono">{node.type}</span></p>
      </div>
    </div>
  );
}

export default function WorkflowBuilder() {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState(() => [
    { id: 'node-0', type: 'trigger', x: 80, y: 80, data: { name: 'Incoming Webhook' } },
    { id: 'node-1', type: 'llm', x: 380, y: 160, data: { name: 'AI Reasoner' } },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [logs, setLogs] = useState([]);
  const dragInfo = useRef({ id: null, offsetX: 0, offsetY: 0 });

  const addLog = useCallback((text) => {
    setLogs((l) => [{ id: crypto.randomUUID(), text, ts: new Date().toLocaleTimeString() }, ...l].slice(0, 50));
  }, []);

  const handleAddNode = (type) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const baseX = rect ? rect.width / 2 - 90 : 120;
    const baseY = rect ? rect.height / 2 - 40 : 120;
    const n = createNode(type);
    n.x = baseX + Math.round(Math.random() * 60 - 30);
    n.y = baseY + Math.round(Math.random() * 60 - 30);
    setNodes((ns) => [...ns, n]);
    setSelectedId(n.id);
    addLog(`Added ${n.data.name}`);
  };

  const onDragStart = (e, id) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const node = nodes.find((n) => n.id === id);
    if (!rect || !node) return;
    dragInfo.current = { id, offsetX: e.clientX - rect.left - node.x, offsetY: e.clientY - rect.top - node.y };
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', onDragEnd);
  };

  const onDrag = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const { id, offsetX, offsetY } = dragInfo.current;
    if (!rect || !id) return;
    const x = Math.max(0, Math.min(e.clientX - rect.left - offsetX, rect.width - 160));
    const y = Math.max(0, Math.min(e.clientY - rect.top - offsetY, rect.height - 60));
    setNodes((ns) => ns.map((n) => (n.id === id ? { ...n, x, y } : n)));
  };

  const onDragEnd = () => {
    dragInfo.current = { id: null, offsetX: 0, offsetY: 0 };
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onDragEnd);
  };

  const removeNode = (id) => {
    setNodes((ns) => ns.filter((n) => n.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const ordered = useMemo(() => {
    return [...nodes].sort((a, b) => (a.x - b.x) || (a.y - b.y));
  }, [nodes]);

  const runFlow = async () => {
    addLog('Starting run...');
    for (const n of ordered) {
      await new Promise((r) => setTimeout(r, 300));
      addLog(`Executed ${n.data.name}`);
    }
    addLog('Run complete.');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <aside className="lg:col-span-1">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Nodes</h3>
            <GitBranch className="w-4 h-4 text-white/50" />
          </div>
          <div className="space-y-2">
            {NODE_TYPES.map((n) => (
              <button
                key={n.type}
                onClick={() => handleAddNode(n.type)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition"
              >
                <n.icon className="w-4 h-4 text-white/80" />
                <span className="text-sm flex-1 text-left">{n.label}</span>
                <PlusCircle className="w-4 h-4 text-cyan-400" />
              </button>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={runFlow} className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-medium">
              <Play className="w-4 h-4" /> Run
            </button>
            <button onClick={() => { setNodes([]); addLog('Cleared canvas'); }} className="px-3 py-2 rounded-lg border border-white/10 hover:border-white/20">
              Clear
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5">
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <span className="text-sm font-medium">Execution Log</span>
          </div>
          <div className="p-3 h-48 overflow-auto space-y-2 text-xs font-mono">
            {logs.length === 0 && <div className="text-white/50">No logs yet. Add nodes and run.</div>}
            {logs.map((l) => (
              <div key={l.id} className="text-white/80">
                <span className="text-white/40">[{l.ts}]</span> {l.text}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="lg:col-span-3">
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">Canvas</span>
              <span className="text-xs text-white/50">Drag nodes, click to select</span>
            </div>
            <div className="text-xs text-white/50">{nodes.length} node{nodes.length !== 1 ? 's' : ''}</div>
          </div>
          <div
            ref={canvasRef}
            className="relative h-[560px] bg-gradient-to-b from-black to-black/80"
            onMouseDown={() => setSelectedId(null)}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {ordered.map((n, idx) => {
                if (idx === 0) return null;
                const prev = ordered[idx - 1];
                const x1 = (prev.x || 0) + 160;
                const y1 = (prev.y || 0) + 30;
                const x2 = (n.x || 0);
                const y2 = (n.y || 0) + 30;
                const mx = (x1 + x2) / 2;
                return (
                  <path key={`${prev.id}-${n.id}`} d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`} stroke="rgba(59,130,246,0.5)" strokeWidth="2" fill="none" />
                );
              })}
            </svg>

            {nodes.map((node) => (
              <NodeCard
                key={node.id}
                node={node}
                onDragStart={onDragStart}
                onRemove={removeNode}
                selected={selectedId === node.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
