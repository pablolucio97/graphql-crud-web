import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <button
      className="h-[3rem] rounded-md text-white bg-blue-500 px-4 disabled:opacity-75"
      {...rest}
    >
      {label}
    </button>
  );
};
