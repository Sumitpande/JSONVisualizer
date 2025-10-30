import { useStore } from "@/store";
import { useCallback } from "react";
import type { JsonNode } from "@/types";
import { type Node } from "@xyflow/react";
import { toast } from "sonner";

const convertJsonToFlow = (json: unknown, key = "root", parentId = "", level = 0, path = "root") => {
    const nodes: JsonNode[] = [];
    const edges = [];
    const nodeId = parentId ? `${parentId}.${key}` : key;

    const type = Array.isArray(json)
        ? "array"
        : typeof json === "object" && json !== null
            ? "object"
            : typeof json;

    nodes.push({
        id: nodeId,
        key,
        value: json,
        type,
        path,
    });

    if (parentId) {
        edges.push({
            id: `${parentId}-${nodeId}`,
            source: parentId,
            target: nodeId,
            type: "smoothstep",
            animated: true,

        });
    }

    if (typeof json === "object" && json !== null) {
        const entries = Array.isArray(json)
            ? json.map((item, index) => [index.toString(), item])
            : Object.entries(json);

        entries.forEach(([childKey, childValue]) => {
            const childPath = `${path}.${childKey}`;
            const result = convertJsonToFlow(childValue, childKey, nodeId, level + 1, childPath);

            nodes.push(...result.nodes);
            edges.push(...result.edges);
        });
    }

    return { nodes, edges };
}
const layoutNodes = (nodes: JsonNode[], layout: string) => {
    const nodeMap = new Map<string, JsonNode>();
    nodes.forEach((node) => nodeMap.set(node.id, node));

    const positioned: Node[] = [];
    const levels: Map<number, number> = new Map();

    const getLevel = (nodeId: string): number => {
        return nodeId.split(".").length - 1;
    };

    nodes.forEach((node) => {
        const level = getLevel(node.id);
        const countAtLevel = levels.get(level) || 0;
        levels.set(level, countAtLevel + 1);

        const x = layout === "Horizontal" ? level * 300 : countAtLevel * 180;
        const y = layout === "Horizontal" ? countAtLevel * 120 : level * 300;

        positioned.push({
            id: node.id,
            type: "treeNode",
            position: { x, y },
            data: {
                ...node,
                label: node.key,
                value: node.value,
                type: node.type,
                path: node.path,
                layout
            },
        });
    });

    return positioned;
}

export default function useTreeVisualizer() {

    const { setSelectedTab, setOriginalNodes, setSearch, setError, setNodes, setEdges } = useStore()

    const searchNode = (term: string, data: Node[]) => {
        const baseNodes = data;
        if (!baseNodes.length) return;

        if (!term) {
            const newNodes: Node[] = baseNodes.map((node) => ({
                ...node,
                data: { ...node.data, highlighted: false },
            }))
            setNodes(newNodes)

            return;
        }
        const newNodes: Node[] = baseNodes.map((node) => {
            // const valueStr = JSON.stringify(node.data.value).toLowerCase();
            // const keyStr = (node.data.label as string).toLowerCase();
            const pathStr = (node.data.path as string).toLowerCase();
            const searchLower = term.toLowerCase();

            const matches =
                // valueStr.includes(searchLower) ||
                // keyStr.includes(searchLower) ||
                pathStr.includes(searchLower);

            return {
                ...node,
                data: { ...node.data, highlighted: matches },
            };
        })
        setNodes(newNodes)

    }



    const handleVisualizeJSON = useCallback((layout: string, json: string) => {

        try {
            const parsed = JSON.parse(json);
            const data = convertJsonToFlow(parsed);
            const lNodes = layoutNodes(data.nodes, layout);

            setOriginalNodes(lNodes)
            setNodes(lNodes)
            setEdges(data.edges)
            setError("")
            setSearch("")
            setSelectedTab("JsonTree")
            toast.success("JSON tree generated successfully.")
        } catch (e) {
            const err = "Invalid JSON: " + (e as Error).message
            setError(err);
            setSelectedTab("JsonInput")
            toast.error(err)
        }

    }, [setOriginalNodes, setNodes, setEdges, setError, setSearch, setSelectedTab]);

    return { searchNode, handleVisualizeJSON }
}