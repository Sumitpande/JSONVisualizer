import { Trash2, FileJson2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  onClear: () => void;
  onFormat: () => void;
}

const InputToolBar = ({ onClear, onFormat }: ToolbarProps) => {
  return (
    <div className="flex gap-2 my-2">
      <Button onClick={onClear} variant="secondary" size="sm" className="flex-1">
        <Trash2 className="w-4 h-4 mr-2" />
        Clear
      </Button>
      <Button onClick={onFormat} variant="secondary" size="sm" className="flex-1">
        <FileJson2 className="w-4 h-4 mr-2" />
        Format JSON
      </Button>
    </div>
  );
};

export default InputToolBar;
