import { useContext } from "react";
import IconButton from "../IconButton";
import styles from "./index.module.css";
import SunIcon from "src/assets/sun.svg?react";
import MoonIcon from "src/assets/moon.svg?react";
import QuestionMarkIcon from "src/assets/question-mark.svg?react";
import ChartIcon from "src/assets/chart.svg?react";
import SettingsIcon from "src/assets/settings.svg?react";
import GithubIcon from "src/assets/github.svg?react";
import { ThemeContext } from "../Root/ThemeContext";
import Text from "../Text";

const Header = () => {
  const { theme, switchTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <IconButton onClick={switchTheme}>
        {theme === "light" ? (
          <SunIcon />
        ) : (
          <MoonIcon className={styles.Header_icon} />
        )}
      </IconButton>

      <Text variant="large" fontWeight="600" className={styles.Header_title}>
        Wooordle
      </Text>

      <nav className={styles.Header_nav}>
        <IconButton>
          <QuestionMarkIcon className={styles.Header_icon} />
        </IconButton>

        <IconButton>
          <ChartIcon className={styles.Header_icon} />
        </IconButton>

        <IconButton>
          <SettingsIcon className={styles.Header_icon} />
        </IconButton>

        <IconButton>
          <GithubIcon className={styles.Header_icon} />
        </IconButton>
      </nav>
    </header>
  );
};

export default Header;
