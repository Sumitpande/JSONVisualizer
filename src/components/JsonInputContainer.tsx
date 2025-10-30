import { useCallback, useState } from "react";
import InputToolBar from "./InputToolBar";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import useTreeVisualizer from "@/hooks/useTreeVisualizer";
import { toast } from "sonner";

const JsonInputContainer = ({ classNames }: { classNames: string }) => {
  const { error, setJsonInput, setError, setSearch, setNodes, setOriginalNodes, layout } = useStore();
  const { handleVisualizeJSON } = useTreeVisualizer();
  const [localJson, setLocalJson] = useState("");
  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(localJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setLocalJson(formatted);
      setError("");
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      toast.error("Invalid JSON: " + (err as Error).message);
    }
  }, [localJson, setError]);

  const handleClear = () => {
    setJsonInput("");
    setLocalJson("");
    setError("");
    setNodes([]);
    setOriginalNodes([]);
    setSearch("");
    toast.info("Canvas cleared.");
  };

  const handleVisualize = useCallback(() => {
    setJsonInput(localJson);
    handleVisualizeJSON(layout, localJson);
  }, [handleVisualizeJSON, layout, localJson, setJsonInput]);
  return (
    <div className={cn("sm:flex sm:flex-col h-[calc(100vh-108px)] sm:h-[calc(100vh-89px)]", classNames)}>
      <div className="flex flex-col h-full overflow-auto p-3 sm:p-4">
        <h2 className="hidden sm:block text-base sm:text-lg font-semibold text-foreground mb-2">JSON Input</h2>

        <Textarea
          placeholder='{"firstName": "John", "lastName": "Doe"}'
          value={localJson}
          onChange={(e) => setLocalJson(e.target.value)}
          id="json-input"
          className={
            "h-full w-full scrollbar-none p-2 sm:p-3 bg-background border border-border rounded-lg text-foreground font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          }
        />
        {error && <p className=" text-red-300 text-sm">{error}</p>}
      </div>
      <div className="p-3 mt-auto  border-t border-border">
        <button
          onClick={handleVisualize}
          className="w-full mt-3 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity text-sm sm:text-base"
        >
          Visualize
        </button>
        <InputToolBar onClear={handleClear} onFormat={handleFormat} />
      </div>
    </div>
  );
};

export default JsonInputContainer;
