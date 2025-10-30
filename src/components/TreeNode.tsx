import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { toast } from "sonner";
type JsonNodeData = {
  label: string;
  key: string;
  value: unknown;
  type: string;
  path: string;
  highlighted: boolean;
  layout: string;
};

export const TreeNode = memo(({ data }: { data: JsonNodeData }) => {
  const { label, value, type, path, highlighted, layout } = data;

  const getNodeColor = () => {
    switch (type) {
      case "object":
        return "bg-purple-500/20 border-purple-500";
      case "array":
        return "bg-pink-500/20 border-pink-500";
      case "string":
        return "bg-green-500/20 border-green-500";
      case "number":
        return "bg-blue-500/20 border-blue-500";
      case "boolean":
        return "bg-yellow-500/20 border-yellow-500";
      default:
        return "bg-muted border-muted-foreground";
    }
  };

  const getDisplayValue = () => {
    if (type === "object" && value !== null) {
      return `{${Object.keys(value as object).length} props}`;
    }
    if (type === "array") {
      return `[${(value as Array<unknown>).length} items]`;
    }
    if (type === "string") {
      return `"${value}"`;
    }
    return String(value);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`Path copied to clipboard.`);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getTooltipContent = () => {
    return (
      <div className=" ">
        <div className="font-semibold">Path: {path}</div>
        <div>Type: {type}</div>
        {type !== "object" && type !== "array" && (
          <div className="max-w-xs wrap-break-word">Value: {JSON.stringify(value, null, 2)}</div>
        )}
      </div>
    );
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={() => handleCopy(path)}
          className={`
              px-4 py-3 rounded-lg border-2 transition-all duration-200
              ${getNodeColor()}
              ${
                highlighted
                  ? "ring-4 ring-emerald-400/60 bg-linear-to-r from-pink-400 via-purple-400 to-indigo-400 "
                  : ""
              }
              hover:shadow-lg hover:scale-105
              min-w-[150px]
            `}
        >
          <Handle
            type="target"
            position={layout === "Horizontal" ? Position.Left : Position.Top}
            className="w-2 h-2 bg-primary!"
          />
          <div className="text-center">
            <div className="font-semibold text-foreground text-sm mb-1">{label}</div>
            <div className="text-xs text-muted-foreground font-mono truncate">{getDisplayValue()}</div>
          </div>
          <Handle
            type="source"
            position={layout === "Horizontal" ? Position.Right : Position.Bottom}
            className="w-2 h-2 bg-primary!"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent className="border-border">{getTooltipContent()}</TooltipContent>
    </Tooltip>
  );
});
