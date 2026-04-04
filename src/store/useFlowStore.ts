import { create } from "zustand";
import { Edge } from "reactflow";

export type NodeType = {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
};

type RunType = {
  id: string;
  timestamp: number;
  status: string;
};

type FlowState = {
  nodes: NodeType[];
  edges: Edge[];
  history: RunType[];

  addNode: (type: string) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (id: string, data: any) => void;
  getNodeData: (id: string) => any;
  setNodeStatus: (id: string, status: string) => void;
  addRun: (run: RunType) => void;
};

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  history: [],

  addNode: (type) =>
    set((state) => {
      let nodeType = "textNode";

      if (type === "LLM") nodeType = "llmNode";
      else if (type === "Upload Image") nodeType = "imageNode";

      return {
        nodes: [
          ...state.nodes,
          {
            id: crypto.randomUUID(),
            type: nodeType,
            position: {
  x: 300 + (state.nodes.length % 3) * 250,
  y: 150 + Math.floor(state.nodes.length / 3) * 180,
},
            data: {
              value: "",
              output: "",
              status: "idle",
            },
          },
        ],
      };
    }),

  setEdges: (edges) => set({ edges }),

  updateNodeData: (id, newData) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    })),

  getNodeData: (id) => {
    const node = get().nodes.find((n) => n.id === id);
    return node?.data;
  },

  setNodeStatus: (id, status) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, status } }
          : node
      ),
    })),

  addRun: (run) =>
    set((state) => ({
      history: [run, ...state.history],
    })),
}));