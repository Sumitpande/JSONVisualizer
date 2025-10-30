import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useStore, useThemeStore } from "@/store";
import { useCallback, useEffect, useRef } from "react";
import { debounce } from "lodash";
import useTreeVisualizer from "@/hooks/useTreeVisualizer";
import type { Node } from "@xyflow/react";
const Toolbar = ({ isMain }: { isMain: boolean }) => {
  const { toggleTheme, theme } = useThemeStore();
  const { searchNode } = useTreeVisualizer();
  const { search, setSearch, originalNodes } = useStore();
  const debouncedSearchNode = useRef(debounce((term: string, nodes: Node[]) => searchNode(term, nodes), 300)).current;
  const handleSearch = useCallback(
    (term: string) => {
      setSearch(term);
      debouncedSearchNode(term, originalNodes);
    },
    [debouncedSearchNode, originalNodes, setSearch]
  );
  useEffect(() => {
    return () => {
      debouncedSearchNode.cancel();
    };
  }, [debouncedSearchNode]);
  return (
    <div className="flex gap-2">
      <Input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className={`${isMain ? "hidden sm:block w-52" : "w-full"}`}
        type="string"
        placeholder="Search Node..."
      />

      <Button className={`${isMain ? "block" : "hidden"}`} onClick={toggleTheme} variant="secondary">
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </Button>
    </div>
  );
};

export default Toolbar;
