/* eslint-disable @typescript-eslint/no-explicit-any */

const Modal = ({ show, toggleModal, children }: any) => {
  if (!show) {
    return null;
  }

  return (
    <>
      {show && (
        <div
          className="fixed inset-0 bg-transparent bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={toggleModal}
        ></div>
      )}

      <div className="fixed inset-0 bg-transparent bg-opacity-50  flex items-center justify-center z-50">
        {/* <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto p-4 relative"> */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={toggleModal}
        >
          &times;
        </button>
        {children}
        {/* </div> */}
      </div>
    </>
  );
};

export default Modal;
