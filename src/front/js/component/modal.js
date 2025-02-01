import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import "../../styles/welcome.css"

export const Modal = (props) => {
  if (!props.isOpen) return null; // No renderiza el modal si `isOpen` es falso

  return (
    <div className={props.className} style={{ display: "flex" }}>
      <div className='wrapper'>
        <CloseIcon className="close" onClick={props.close} />
        <h5>{props.title}</h5>
        {props.children}
      </div>
    </div>
  );
};