"use client";

import { Handle, Position } from "reactflow";
import { useFlowStore } from "@/store/useFlowStore";

export default function LLMNode({ id }: any) {
  const nodes = useFlowStore((s) => s.nodes);
  const node = nodes.find((n) => n.id === id);

  return (
    <div className="
      bg-zinc-900/80 backdrop-blur-2xl
      rounded-2xl px-4 py-3 w-64
      border border-white/10
      shadow-[0_0_40px_rgba(0,0,0,0.6)]
    ">
      <div className="text-xs text-zinc-400 mb-2">
        LLM Output
      </div>

      <div className="text-sm">
        {node?.data?.output || "Run workflow..."}
      </div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}