import React from "react";
import ThemeBtn from "./ThemeBtn";

function Footer() {
    return (
        <div className="flex items-center justify-between w-full px-6 py-4 dark:bg-[var(--bg-dark)] bg-[var(--bg-dark)] dark:text-[var(--text)] text-[var(--text)] fixed bottom-0">
            <div className="w-[40px]"></div>
            <h1 className="font-Asimovian font-extrabold text-xl text-center">
                Anonymous file sharing. Files disappear in 24 hours
            </h1>
            <ThemeBtn />
        </div>
    );
}

export default Footer;
