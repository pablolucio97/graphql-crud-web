import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...rest }) => {
  return (
    <div className="flex flex-col">
      <span className="m-1">{label}</span>
      <input
        className="h-[3rem] rounded-md border-2 border-gray-400 bg-gray-50 px-4"
        {...rest}
      ></input>
    </div>
  );
};
