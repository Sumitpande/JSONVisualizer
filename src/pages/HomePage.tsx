import Header from "@/components/Header";
import JsonInputContainer from "@/components/JsonInputContainer";
import JsonTreeContainer from "@/components/JsonTreeContainer";
import Toolbar from "@/components/Toolbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/store";
import type { Tab } from "@/store/store";
import { Braces, Network } from "lucide-react";

export default function HomePage() {
  const { selectedTab, setSelectedTab } = useStore();
  return (
    <div className="h-screen flex flex-col  bg-background">
      <Header />

      <div className="px-3 block sm:hidden">
        <div className="tabs flex gap-2 my-2">
          <Tabs value={selectedTab} defaultValue={selectedTab} onValueChange={(tab) => setSelectedTab(tab as Tab)}>
            <TabsList className="w-full">
              <TabsTrigger className="gap-2" value="JsonInput">
                <Braces />
                Json Input
              </TabsTrigger>
              <TabsTrigger className="gap-2" value="JsonTree">
                <Network />
                Json Tree
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {selectedTab === "JsonTree" && <Toolbar isMain={false} />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 h-[calc(100vh-60px)] sm:h-[calc(100vh-89px)] overflow-hidden">
        <JsonInputContainer classNames={`${selectedTab === "JsonInput" ? "flex flex-col" : "hidden"}`} />
        <JsonTreeContainer classNames={`sm:col-span-2 ${selectedTab === "JsonTree" ? "flex flex-col" : "hidden"}`} />
      </div>
    </div>
  );
}
