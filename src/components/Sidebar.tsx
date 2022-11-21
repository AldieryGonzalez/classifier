import Dropdown from "./Dropdown";
import classnames from "classnames";
import RadioGroup from "./RadioGroup";

import { useAlert } from "../contexts/AlertContext";

type SidebarProps = {
  handleSetBounds: Function;
  handleTrain: Function;
  handleClear: Function;
  handleType: Function;
  mouseData: { x: number; y: number };
  type: number;
  vector: number[];
  canTrain: boolean;
};

type SectionHeaderProps = {
  children: React.ReactNode;
};

type ButtonProps = {
  onClick: Function;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  handleSetBounds,
  handleTrain,
  handleType,
  handleClear,
  mouseData,
  type,
  vector,
  canTrain,
}) => {
  const setAlert = useAlert()?.setAlert;

  const handleAlert = () => {
    if (setAlert) {
      setAlert("subject", "message", 2000, "success");
    }
  };

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
        <section className="flex flex-col gap-3">
          <SectionHeader>Options</SectionHeader>
          <Dropdown
            handleType={handleType}
            variant={type}
          >{`Type ${type}`}</Dropdown>
          <RadioGroup />
        </section>
        <section>
          <SectionHeader>Data</SectionHeader>
          <div className="text-left">{`MouseX: ${mouseData.x}`}</div>
          <div className="text-left">{`MouseY: ${mouseData.y}`}</div>
          {vector && (
            <div className="text-left">
              Weight Vector:
              <div className="text-center text-xs">{`${vector[0]}x+${vector[1]}y+${vector[2]}`}</div>
            </div>
          )}
        </section>
        <section className="relative flex flex-col gap-2">
          <SectionHeader>Controls</SectionHeader>
          <Button onClick={() => handleAlert()}>Tutorial</Button>
          <Button onClick={() => handleClear()}>Clear All</Button>
          <Button
            disabled={!canTrain}
            className={classnames(
              "mt-auto h-28 disabled:cursor-not-allowed disabled:bg-disabled"
            )}
            onClick={() => handleTrain()}
          >
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
      disabled={props.disabled ? true : undefined}
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
