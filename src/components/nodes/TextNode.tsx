"use client";

import { Handle, Position } from "reactflow";
import { useFlowStore } from "@/store/useFlowStore";

export default function TextNode({ id, data }: any) {
  const updateNodeData = useFlowStore((s) => s.updateNodeData);

  return (
    <div className="
      bg-zinc-900/80 backdrop-blur-2xl
      rounded-2xl px-4 py-3 w-64
      border border-white/10
      shadow-[0_0_40px_rgba(0,0,0,0.6)]
    ">
      <textarea
        value={data.value || ""}
        onChange={(e) =>
          updateNodeData(id, { value: e.target.value })
        }
        placeholder="Enter text..."
        className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none resize-none"
      />

      <Handle type="source" position={Position.Right} />
    </div>
  );
}