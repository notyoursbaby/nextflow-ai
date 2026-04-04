"use client";

import { useFlowStore } from "@/store/useFlowStore";

export default function RightPanel() {
  const history = useFlowStore((state) => state.history);

  return (
    <div className="w-72 bg-zinc-900 text-white p-4 border-l border-zinc-800">
      <h2 className="text-sm font-semibold mb-4 text-zinc-300">
        Workflow History
      </h2>

      <div className="space-y-2">
        {history.length === 0 && (
          <p className="text-xs text-zinc-500">No runs yet</p>
        )}

        {history.map((run) => (
          <div
            key={run.id}
            className="bg-zinc-800 p-2 rounded text-xs flex justify-between items-center"
          >
            <span>
              {new Date(run.timestamp).toLocaleTimeString()}
            </span>

            <span className="text-green-400">
              {run.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}