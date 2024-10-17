import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
 icon: React.ElementType; // For passing the icon component
 label: string;
 name: string;
 value: string; // or 'any' if value types may vary, like number or string
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Ensuring the type matches event signature
}

const Input: React.FC<InputProps> = ({ icon: Icon, label, ...props }) => {
 return (
  <div className="relative py-4">
   <label className="text-sm text-gray-500">{label}</label>
   {Icon && (
    <div className="flex items-center pl-3">
     <Icon className="size-5 absolute bottom-7  text-black" />
    </div>
   )}
   <input {...props} className="w-full p-3 pl-10" />
  </div>
 );
};

export default Input;
