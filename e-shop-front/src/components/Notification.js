import React from 'react';

const Notification = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-0 right-0 m-4 bg-white p-4 rounded shadow-lg">
      <p>{message}</p>
      <button onClick={onClose} className="text-red-600 font-bold mt-2">Close</button>
    </div>
  );
};

export default Notification;
