import React from "react";
import useTheme from "../context/Theme.js";

function ThemeBtn({size=24,channel=""}) {
    
    const { themeMode, toggle } = useTheme();
    return (
        <button
            className={`dark:bg-[var(--bg)] bg-[var(--bg)] dark:text-[var(--text)] text-[var(--text)] ${channel} cursor-pointer p-4 rounded-2xl hover:bg-[var(--bg-light)] dark:hover:bg-[var(--bg-light)]`}
            id="dark-mode-toggle"
            onClick={() => {
                toggle(themeMode);
            }}
        >
            <svg
                className={themeMode?"hidden":"spin-left"}
                id="icon-moon"
                width={`${size}px`}
                height={`${size}px`}
                stroke-width="1.49"
                viewBox="0 0 24 24"
                fill="none"
                color="var(--color-light, #0f0)"
            >
                <path
                    d="M3 11.507a9.493 9.493 0 0018 4.219c-8.507 0-12.726-4.22-12.726-12.726A9.494 9.494 0 003 11.507z"
                    stroke="var(--color-light, #ccc)"
                    stroke-width="1.49"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </svg>
            <svg
                className={themeMode?`spin-right`:`hidden`}
                id="icon-sun"
                width={`${size}px`}
                height={`${size}px`}
                stroke-width="1.49"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                color="var(--color-dark, #333)"
            >
                <path
                    d="M12 18a6 6 0 100-12 6 6 0 000 12zM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1"
                    stroke="var(--color-dark, #333)"
                    stroke-width="1.49"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="var(--color-dark, #333)"
                ></path>
            </svg>
        </button>
    );
}

export default ThemeBtn;
