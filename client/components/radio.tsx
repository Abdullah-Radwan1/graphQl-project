const RadioButton = ({
 id,
 label,
 onChange,
 value,
 checked,
}: {
 id: string;
 label: string;
 onChange: any;
 value: string;
 checked: boolean;
 name: string;
}) => {
 return (
  <div className="inline-flex items-center">
   <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={id}>
    <input name="type" type="radio" id={id} value={value} onChange={onChange} checked={checked} />
   </label>
   <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor={id}>
    {label}
   </label>
  </div>
 );
};

export default RadioButton;
