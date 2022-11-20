import Dropdown from "./Dropdown";
import classnames from "classnames";

type SidebarProps = {
  handleSetBounds: Function;
  handleTrain: Function;
  handleClear: Function;
  handleType: Function;
  mouseData: { x: number; y: number };
  type: number;
};

type SectionHeaderProps = {
  children: React.ReactNode;
};

type ButtonProps = {
  onClick: Function;
  children: React.ReactNode;
  className?: string;
};

const Sidebar: React.FC<SidebarProps> = ({
  handleSetBounds,
  handleTrain,
  handleType,
  handleClear,
  mouseData,
  type,
}) => {
  return (
    <div className="shadow-2x z-10 flex w-48 flex-col bg-[hsl(191,19%,16%)] py-3 text-center text-lg font-medium text-white shadow-amber-200">
      2D Linear Classifier
      {/* <button
        className="rounded bg-[hsl(205,26%,49%)] py-2 px-4 font-bold text-white hover:bg-[hsl(205,26%,25%)]"
        onClick={() => handleSetBounds()}
      >
        Set Bound
      </button> */}
      <div className="flex grow flex-col justify-between p-3 pb-6">
        <section>
          <SectionHeader>Options</SectionHeader>
          <Dropdown
            handleType={handleType}
            variant={type}
          >{`Type ${type}`}</Dropdown>
        </section>
        <section>
          <SectionHeader>Data</SectionHeader>
          <div className="text-left">{`MouseX: ${mouseData.x}`}</div>
          <div className="text-left">{`MouseY: ${mouseData.y}`}</div>
        </section>
        <section className="relative flex flex-col gap-2">
          <SectionHeader>Controls</SectionHeader>
          <Button onClick={() => handleClear()}>Clear All</Button>
          <Button className="mt-auto h-28" onClick={() => handleTrain()}>
            TRAIN
          </Button>
        </section>
      </div>
    </div>
  );
};

const Button: React.FC<ButtonProps> = ({ onClick, children, ...props }) => {
  let dStyles = "";
  if (props.className) {
    dStyles = props.className;
  }
  return (
    <button
      className={classnames(
        "w-full rounded bg-[hsl(205,26%,49%)] py-2 px-4 font-bold text-white hover:bg-[hsl(205,26%,25%)]",
        dStyles
      )}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

const SectionHeader: React.FC<SectionHeaderProps> = ({
  children,
  ...props
}) => {
  return (
    <div className="relative my-2 font-normal after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:rounded-full after:bg-slate-500 after:bg-opacity-50 after:content-['']">
      {children}
    </div>
  );
};

export default Sidebar;
