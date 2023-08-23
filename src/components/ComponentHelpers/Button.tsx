import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = {
  small?: boolean;
  blue?: boolean;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({
  small = false,
  blue = false,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClasses = small ? "" : "px-4 py-2 font-bold";
  const colorClasses = blue
    ? "bg-[#4682B4] hover:bg-gray-300 focus-visible:bg-gray-300"
    : null;

  return (
    <button
      className={`rounded text-white transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses} ${colorClasses} ${className}`}
      {...props}
    ></button>
  );
}
