import type { Edge, Node } from '@xyflow/react';
import { create } from 'zustand'
export type Tab = "JsonInput" | "JsonTree";

interface StoreState {
    search: string;
    setSearch: (term: string) => void;

    selectedTab: Tab;
    setSelectedTab: (t: Tab) => void;

    jsonInput: string;
    error: string;
    setJsonInput: (i: string) => void;
    setError: (e: string) => void

    layout: string;
    toggleLayout: () => void;

    originalNodes: Node[];
    setOriginalNodes: (data: Node[]) => void;

    nodes: Node[];
    edges: Edge[];
    setNodes: (data: Node[]) => void;
    setEdges: (data: Edge[]) => void
}

export const useStore = create<StoreState>((set) => ({
    search: "",
    setSearch: (term: string) => set({ search: term }),

    selectedTab: "JsonInput" as Tab,
    setSelectedTab: (tab: Tab) => set({ selectedTab: tab }),
    jsonInput: "",
    setJsonInput: (input: string) => set({ jsonInput: input }),

    error: "",
    setError: (e: string) => set({ error: e }),

    layout: "Vertical",
    toggleLayout: () => set((state) => ({ layout: state.layout === "Vertical" ? "Horizontal" : "Vertical" })),

    originalNodes: [],
    setOriginalNodes: (data: Node[]) => set({ originalNodes: data }),

    nodes: [],
    edges: [],
    setNodes: (data: Node[]) => set({ nodes: data }),
    setEdges: (data: Edge[]) => set({ edges: data }),
}))