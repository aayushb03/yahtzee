import React, {useState} from "react";
import {IoIosHelpCircleOutline, IoIosSettings, IoIosStats, IoIosLogIn} from "react-icons/io";
import Modal from "./modal";

const Nav = () => {
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const iconClasses = "transition transform hover:-translate-y-1 cursor-pointer";

  return (
    <>
      <nav className="flex w-full bg-app-red justify-center items-center">
        <div className="w-[22%]"/>
        <h1 className="text-6xl text-white my-1 w-[50%] text-center [text-shadow:_0_4px_0_rgb(0_0_0_/_40%)]">YAHTZEE</h1>
        <div className="w-[22%] flex justify-end text-3xl text-white gap-4">
          {/* When this button is clicked, isHelpModalOpen becomes true, which should show the Modal */}
          <button onClick={() => setHelpModalOpen(true)} className={iconClasses}>
            <IoIosHelpCircleOutline />
          </button>
          <IoIosSettings className={iconClasses}/>
          <IoIosStats className={iconClasses}/>
          <IoIosLogIn className={iconClasses}/>
        </div>
      </nav>

      {/* This Modal should appear when isHelpModalOpen is true */}
      <Modal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)}>
        <p>Modal content goes here. This should be visible when the modal is open.</p>
        {/* xxxxxx texts goes here  */}
      </Modal>
    </>
  );
};

export default Nav;