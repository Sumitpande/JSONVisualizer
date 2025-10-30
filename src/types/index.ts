export interface JsonNode {
    id: string;
    key: string;
    value: unknown;
    type: string;
    path: string;
    style?: object;
}

export type JsonNodeData = {
    id: string;
    key: string;
    value: unknown;
    type: string;
    path: string;
};
