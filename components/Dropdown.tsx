import { useState } from "react";

type Props = {
  handleType: Function;
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
  const handleClick = (type: number) => {
    setOpen(false);
    props.handleType(type);
  };

  return (
    <div>
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className="inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={handleOpen}
      >
        Select Type
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
      {open && (
        <div
          id="dropdown"
          className="z-10  w-24 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
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
      )}
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
