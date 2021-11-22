import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    padding: "20px 50px",
    backgroundColor: "white",
    borderRadius: 10,
  },
};
export const ModalConfirmation = ({ setModalConfirmationOpen, modalConfimationOpen,handleDelete,id}) => {
  Modal.setAppElement("#root");

  return (
    <Modal
      isOpen={modalConfimationOpen}
      onRequestClose={setModalConfirmationOpen}
      style={customStyles}
    >
      <h1 className="primary">Delete this Category?</h1>
      <div className="w-80 d-flex justify-content-between mt-4">
        <div 
            className="btn btn-danger"
            onClick={()=>{handleDelete(id); setModalConfirmationOpen(false)}}
        >Delete</div>
        <div
            className="btn btn-primary right"
            onClick={()=>{setModalConfirmationOpen(false)}}
        >Cancel</div>
      </div>
    </Modal>
  );
};
