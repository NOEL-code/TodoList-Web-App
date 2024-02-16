import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeButton() {
    const {theme, toggleTheme} = useTheme();

    return(
        <button onClick={toggleTheme}>
            현재 테마: {theme === "light" ? "밝은 모드" : "어두운 모드"}
        </button>
    )
}