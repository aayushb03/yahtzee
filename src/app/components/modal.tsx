import React, { useEffect } from "react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode; 
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleBackdropClick = (event: MouseEvent) => {
      // Check if the click is on the backdrop (and not the modal content)
      if ((event.target as HTMLElement).id === "modal-backdrop") {
        onClose(); // Close the modal if the backdrop is clicked
      }
    };

    // Add click event listener to the window to detect clicks on the backdrop
    window.addEventListener("click", handleBackdropClick);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener("click", handleBackdropClick);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1050,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px", 
          borderRadius: "8px",
          position: "relative",
          minWidth: "600px", 
          minHeight: "300px", 
          color: "black", // Ensure text color is black
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red", 
          }}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
