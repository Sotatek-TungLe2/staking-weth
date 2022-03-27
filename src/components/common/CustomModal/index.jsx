import { Button } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import './styles.scss'
const CustomModal = (props) => {
  const { onOk, onCancel, children, titleButtonOK, loading, modalTitle,visible,disabled } =
    props;

  const pressOk = () => {
    if (onOk) onOk();
  };
  const pressCancel = () => {
    if (onCancel) onCancel();
  };
  return (
    <Modal
      title={modalTitle}
      loading={loading}
      centered
      visible={visible}
      onOk={pressOk}
      onCancel={pressCancel}
      className="custom-modal"
      footer={[
        <Button disabled={disabled} key="submit" type="primary" loading={loading} onClick={pressOk}>
          {titleButtonOK}
        </Button>,
      ]}
    >
      {children}
    </Modal>
  );
};

CustomModal.propTypes = {};

export default CustomModal;
