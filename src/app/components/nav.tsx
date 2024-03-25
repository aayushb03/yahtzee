import React from "react";
import {IoIosHelpCircleOutline, IoIosSettings, IoIosStats, IoIosLogIn} from "react-icons/io";

const Nav = () => {
  const iconClasses = "transition transform hover:-translate-y-1 cursor-pointer";

  return (
    <nav className={"flex w-full bg-app-red justify-center items-center"}>
      <div className={"w-[22%]"}/>
      <h1 className="text-6xl text-white my-1 w-[50%] text-center [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]">YAHTZEE</h1>
      <div className={"w-[22%] flex justify-end text-3xl text-white gap-4"}>
        <IoIosHelpCircleOutline className={iconClasses}/>
        <IoIosSettings className={iconClasses}/>
        <IoIosStats className={iconClasses}/>
        <IoIosLogIn className={iconClasses}/>
      </div>
    </nav>
  );
}

export default Nav;