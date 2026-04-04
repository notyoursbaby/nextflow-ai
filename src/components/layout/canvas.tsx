"use client";

import ReactFlow, { Background, addEdge } from "reactflow";
import "reactflow/dist/style.css";

import { useFlowStore } from "@/store/useFlowStore";
import TextNode from "@/components/nodes/TextNode";
import LLMNode from "@/components/nodes/LLMNode";

const nodeTypes = {
  textNode: TextNode,
  llmNode: LLMNode,
};

export default function Canvas() {
  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const setEdges = useFlowStore((s) => s.setEdges);

  return (
    <div className="w-full h-full relative bg-black">

      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.15),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(59,130,246,0.1),transparent_40%)]" />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={(params) => setEdges(addEdge(params, edges))}
        fitView
        nodeTypes={nodeTypes}
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: "#a855f7",
            strokeWidth: 2,
            strokeDasharray: "6 4",
          },
        }}
      >
        <Background gap={30} size={1} color="#222" />
      </ReactFlow>
    </div>
  );
}