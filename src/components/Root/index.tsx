import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Root = () => {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <div>
      <div className="container">Root</div>
      <button onClick={switchTheme}>{theme}</button>
    </div>
  );
};

export default Root;
