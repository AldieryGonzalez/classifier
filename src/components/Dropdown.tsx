import React, { useState } from "react";
import classNames from "classnames";

type Props = {
  handleType: Function;
  children: React.ReactNode;
  variant: number;
};
type MenuItemProps = {
  children?: React.ReactNode;
  onClick: Function;
};

const options = [0, 1];

const Dropdown = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!e.relatedTarget) {
      setOpen(false);
    }
  };
  const handleClick = (type: number) => {
    setOpen(false);
    props.handleType(type);
  };

  return (
    <div className="relative">
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className={classNames(
          "inline-flex w-full items-center justify-around rounded-lg px-4 py-2.5 text-right text-sm font-medium text-white focus:ring-1 focus:ring-white",
          props.variant
            ? " bg-[hsl(224,76%,48%)]   hover:bg-[hsl(224,75%,41%)] "
            : " bg-[hsl(359,62%,47%)]   hover:bg-[hsl(359,63%,31%)]  "
        )}
        type="button"
        onClick={() => handleOpen()}
        onBlur={(e) => handleClose(e)}
      >
        <div className="w-1"> </div>
        {props.children}
        <svg
          className="ml-2 h-4 w-4"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {/* <!-- Dropdown menu --> */}
      <div
        id="dropdown"
        className="absolute z-10 w-full divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
        style={{ display: open ? "block" : "none" }}
      >
        <ul
          className="w-full py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          {options.map((type) => {
            return (
              <MenuItem
                onClick={() => handleClick(type)}
                key={type}
              >{`Type ${type}`}</MenuItem>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <li>
      <button
        className="block w-full py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        onClick={() => onClick()}
      >
        {children}
      </button>
    </li>
  );
};

export default Dropdown;
