import React from "react";
import ThemeBtn from "./ThemeBtn";

function Footer() {
    return (
        <div className="flex justify-around items-center w-full  dark:bg-[var(--bg-dark)] bg-[var(--bg-dark)] dark:text-[var(--text)] text-[var(--text)] content-center sticky bottom-0 mb-5">
            {/* <div className=" col-span-1"> </div> */}
            <h1 className=" font-Asimovian font-extrabold text-xl  ">
                Anonymous file sharing. Files that disappears in 24 hours
            </h1>
            <ThemeBtn/>
        </div>
    );
}

export default Footer;
