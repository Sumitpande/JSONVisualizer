import Toolbar from "./Toolbar";

const Header = () => {
  return (
    <header className="border-b border-border bg-card px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">JSON Tree Visualizer</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 hidden sm:block">
            Visualize and explore JSON data
          </p>
        </div>
        <Toolbar isMain={true} />
      </div>
    </header>
  );
};
export default Header;
