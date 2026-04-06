"use client";

import Canvas from "@/components/layout/canvas";
import { useFlowStore } from "@/store/useFlowStore";
import { runLLM } from "@/lib/runLLM";

import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Plus, Brain, Image } from "lucide-react";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const updateNodeData = useFlowStore((s) => s.updateNodeData);
  const setNodeStatus = useFlowStore((s) => s.setNodeStatus);
  const addNode = useFlowStore((s) => s.addNode);

  const runWorkflow = async () => {
    for (const node of nodes) {
      setNodeStatus(node.id, "running");

      if (node.type === "llmNode") {
        const output = await runLLM("Explain briefly");
        updateNodeData(node.id, { output });
      }

      setNodeStatus(node.id, "success");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-black text-white">

      {/* 🔥 TOP BAR */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-white/10">
        <div className="text-sm font-semibold tracking-wide">
          NextFlow
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-white/10 px-3 py-1 text-xs rounded hover:bg-white/20 transition">
            Save
          </button>

          <button
            onClick={runWorkflow}
            className="bg-purple-600 px-3 py-1 text-xs rounded hover:bg-purple-500 transition"
          >
            Run
          </button>

          {!isLoaded ? null : !isSignedIn ? (
            <SignInButton mode="modal">
              <button className="bg-white text-black px-3 py-1 rounded text-xs">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <UserButton />
          )}
        </div>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex flex-1 relative overflow-hidden">

        {/* 🔥 FLOATING SIDEBAR */}
        <div
  className="
  absolute left-4 top-1/2 -translate-y-1/2
  bg-zinc-900/50 backdrop-blur-xl
  border border-white/10
  rounded-lg p-1.5
  flex flex-col gap-2
  shadow-md z-50
"
>
          <button onClick={() => addNode("Text")} className="p-2 rounded-lg hover:bg-white/10">
            <Plus size={18} />
          </button>

          <button onClick={() => addNode("LLM")} className="p-2 rounded-lg hover:bg-white/10">
            <Brain size={18} />
          </button>

          <button onClick={() => addNode("Upload Image")} className="p-2 rounded-lg hover:bg-white/10">
            <Image size={18} />
          </button>
        </div>

        {/* 🔥 CANVAS */}
        <Canvas />
      </div>
    </div>
  );
}
