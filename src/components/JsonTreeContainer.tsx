import { cn } from "@/lib/utils";

import { ReactFlow, Background, Controls, Panel } from "@xyflow/react";

import { useThemeStore } from "../store/theme";
import { useStore } from "@/store";
import { TreeNode } from "./TreeNode";
import { Button } from "./ui/button";
import { useCallback, useRef } from "react";
import useTreeVisualizer from "@/hooks/useTreeVisualizer";
import { toast } from "sonner";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";

const nodeTypes = {
  treeNode: TreeNode,
};
const JsonTreeContainer = ({ classNames }: { classNames: string }) => {
  const { nodes, edges, layout, toggleLayout, jsonInput } = useStore();
  const flowRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const { handleVisualizeJSON } = useTreeVisualizer();
  // const { fitView } = useReactFlow();
  const handleToggleLayout = useCallback(() => {
    const l = layout === "Vertical" ? "Horizontal" : "Vertical";
    toggleLayout();
    handleVisualizeJSON(l, jsonInput);
  }, [handleVisualizeJSON, jsonInput, layout, toggleLayout]);

  // useEffect(() => {
  //   if (!flowRef.current) return;
  //   const observer = new ResizeObserver(() => {
  //     fitView({ padding: 0.2, duration: 300 });
  //   });
  //   observer.observe(flowRef.current);
  //   return () => observer.disconnect();
  // }, [fitView]);

  const handleDownload = useCallback(() => {
    if (flowRef.current) {
      toPng(flowRef.current, {
        backgroundColor: "hsl(var(--background))",
        filter: (node) => {
          if (node?.classList?.contains("react-flow__minimap") || node?.classList?.contains("react-flow__controls")) {
            return false;
          }
          return true;
        },
      })
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.download = "json-tree.png";
          link.href = dataUrl;
          link.click();
          toast.success("Image downloaded successfully!");
        })
        .catch(() => {
          toast.error("Failed to download image");
        });
    }
  }, []);
  return (
    <div className={cn("sm:flex sm:flex-col sm:border sm:border-r", classNames)}>
      <div ref={flowRef} className="p-1 sm:p-0 border-b border-border overflow-y-auto flex-1">
        <ReactFlow
          fitView
          minZoom={0.1}
          maxZoom={2}
          nodeTypes={nodeTypes}
          colorMode={theme}
          nodes={nodes}
          edges={edges}
        >
          <Panel className="hidden sm:block" position="top-left">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">JSON Tree </h2>
          </Panel>

          <Panel className="flex gap-2" position="top-right">
            <Button variant="secondary" size="sm" onClick={handleToggleLayout}>
              {layout}
            </Button>
            <Button onClick={handleDownload} className="" size="sm" variant="secondary">
              <Download className={"w-4 h-4 "} />
              <span>Download</span>
            </Button>
          </Panel>

          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};
export default JsonTreeContainer;
