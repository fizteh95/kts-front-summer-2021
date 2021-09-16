import * as React from "react";
import "./Button.scss";

export type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ children, onClick, disabled }) => {
  return (
    <button className="search-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default React.memo(Button);
