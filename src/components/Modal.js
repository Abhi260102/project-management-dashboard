import React, { useState } from "react";
import { Button, Modal } from "antd";

const ModalConatiner = () => {
  console.log("hello");
  const [modelOpen, setModelOpen] = useState(true);
  return (
    <>
      <Modal
        title="Basic Modal"
        open={modelOpen}
        onOk={() => {
          setModelOpen(false);
        }}
        onCancel={() => {
          setModelOpen(false);
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ModalConatiner;
