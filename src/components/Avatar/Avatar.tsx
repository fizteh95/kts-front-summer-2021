import * as React from "react";
import "./Avatar.css";

export type Props = {
  src?: string;
  alt?: string;
  letter?: string;
};

const Avatar: React.FC<Props> = ({ src, alt, letter }) => {
  if (src) {
    return (
      <div
        className="logo"
        style={{ backgroundImage: "url(" + src + ")" }}
      ></div>
    );
  } else {
    return (
      <div className="logo">
        <span className="logo-text">{letter}</span>
      </div>
    );
  }
};

export default Avatar;
