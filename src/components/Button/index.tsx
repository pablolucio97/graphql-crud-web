import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: React.FC<ButtonProps> = ({ label, ...rest }) => {
  return (
    <button
      className="max-w-[16rem] h-[3rem] rounded-md border-2 border-gray-400 bg-gray-50"
      {...rest}
    >
      {label}
    </button>
  );
};
