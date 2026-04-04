"use client";

import { useState } from "react";
import { useFlowStore } from "@/store/useFlowStore";

import {
  Type,
  Image,
  Video,
  Brain,
  Crop,
  Scissors,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Sidebar() {
  const addNode = useFlowStore((state) => state.addNode);
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { label: "Text", icon: Type },
    { label: "Upload Image", icon: Image },
    { label: "Upload Video", icon: Video },
    { label: "LLM", icon: Brain },
    { label: "Crop Image", icon: Crop },
    { label: "Extract Frame", icon: Scissors },
  ];

  return (
    <div
      className={`h-full bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Toggle */}
      <div className="p-2 flex justify-end">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-zinc-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nodes */}
      <div className="flex-1 px-2 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => addNode(item.label)}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-zinc-800 transition-all"
            >
              <Icon size={18} className="text-zinc-300" />

              {!collapsed && (
                <span className="text-sm text-zinc-200">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
