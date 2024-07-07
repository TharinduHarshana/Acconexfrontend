// import React from 'react';
// import "../../styles/model.css"

// const Modal = ({ show, handleClose, children }) => {
//   if (!show) {
//     return null;
//   }

//   return (
//     <div className="modal-backdrop">
//       <div className="modal-container">
//         <div className="modal-header">
//           <span>Items in this kit,you can remove if don't want it</span>
//           <button className="modal-close" onClick={handleClose}>
//             &times;
//           </button>
//         </div>
//         <div className="modal-body">
//           {children}
//         </div>
//         <div className="modal-footer">
//           <span></span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

//old
// import React from "react";
// import "../../styles/model.css"; 

// const Modal = ({ show, handleClose, children }) => {
//   if (!show) return null;

//   return (
//     <div className="modal-backdrop" onClick={handleClose}>
//       <div className="modal-container" onClick={e => e.stopPropagation()}>
//         <div className="modal-header">
//           <p>Items in this kit, you can remove if you don't want it</p>
//           <button className="modal-close" onClick={handleClose}>
//             &times;
//           </button>
//         </div>
//         <div className="modal-body">
//           <div className="table-container">
//             {children}
//           </div>
//         </div>
//         <div className="modal-footer">
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import React from 'react';
import "../../styles/model.css"

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <div className="modal-header">
          <p>Items in this kit, you can remove if you don't want it</p>
          <button className="modal-close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
        <div className="footer-close-box">
            <button className="modal-close" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
