import Dropdown from "./Dropdown";

type SidebarProps = {
  handleSetBounds: Function;
  handleTrain: Function;
  handleClear: Function;
  handleType: Function;
};

const Sidebar: React.FC<SidebarProps> = ({
  handleSetBounds,
  handleTrain,
  handleType,
  handleClear,
}) => {
  return (
    <div className="shadow-2x z-10 w-48  bg-[hsl(191,19%,16%)] p-6 text-lg text-white shadow-amber-200">
      Classifier
      <button
        className="rounded bg-[hsl(205,26%,49%)] py-2 px-4 font-bold text-white hover:bg-[hsl(205,26%,25%)]"
        onClick={() => handleTrain()}
      >
        TRAIN!
      </button>
      <button
        className="rounded bg-[hsl(205,26%,49%)] py-2 px-4 font-bold text-white hover:bg-[hsl(205,26%,25%)]"
        onClick={() => handleSetBounds()}
      >
        Set Bound
      </button>
      <button
        className="rounded bg-[hsl(205,26%,49%)] py-2 px-4 font-bold text-white hover:bg-[hsl(205,26%,25%)]"
        onClick={() => handleClear()}
      >
        Clear all points
      </button>
      <Dropdown handleType={handleType} />
    </div>
  );
};

export default Sidebar;
