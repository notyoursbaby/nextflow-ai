"use client";

import { Handle, Position } from "reactflow";

export default function ImageNode() {
  return (
    <div className="bg-zinc-900 text-white rounded-lg p-3 w-52 border border-zinc-700">
      
      <div className="text-sm font-semibold mb-2">Image Node</div>

      <div className="bg-zinc-800 p-3 rounded text-xs text-center">
        Upload Image
      </div>

      {/* Output */}
      <Handle type="source" position={Position.Right} className="bg-purple-500" />
    </div>
  );
}