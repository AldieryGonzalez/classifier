import React from "react";
import { urlToHttpOptions } from "url";

const options = [
  { id: "fast", text: "Fast" },
  { id: "slow", text: "Slow" },
  { id: "instant", text: "Instantaneous" },
];

const RadioGroup = () => {
  return (
    <div className="text-start text-sm">
      Speed
      <ul>
        {options.map((option) => {
          return (
            <RadioOption key={option.id} id={option.id}>
              {option.text}
            </RadioOption>
          );
        })}
      </ul>
    </div>
  );
};

type RadioOptionProps = {
  children: React.ReactNode;
  id: string;
};

const RadioOption: React.FC<RadioOptionProps> = ({ children, id }) => {
  return (
    <li className="flex w-full items-center rounded-t-lg border-b border-gray-200 py-2 dark:border-gray-600">
      <label className="flex w-full items-center justify-start gap-5 pr-6 pl-3 text-sm font-normal text-white">
        <input
          id={`list-radio-${id}`}
          type="radio"
          value=""
          name="list-radio"
          className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-blue-600"
        />
        {children}
      </label>
    </li>
  );
};

export default RadioGroup;
