import * as React from "react";
import "./Input.css";

//value, placeholder и onChange
export type Props = {
  value: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className="input-class"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    ></input>
  );
};

export default React.memo(Input);
