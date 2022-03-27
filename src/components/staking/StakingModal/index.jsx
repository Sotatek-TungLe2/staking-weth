import { Input } from "antd";
import React, { useState } from "react";
import CustomModal from "../../common/CustomModal";

const StakingModal = (props) => {
  const { onStake, onClose,wethBalance,visible,loading } = props;
  const [amount, setAmount] =  useState(null)
  const [inputStatus,setInputError] = useState({
    isErr:false,
    messageErr:''
  })

  const pressOk = () => {
    if (onStake) onStake(amount);
  };
  const pressCancel = () => {
    if (loading) return
    setAmount(0)
    setInputError({
      isErr:false,
      messageErr:''
    })
    if (onClose) onClose();
  };
  const handleChangeAmount = (e) => {
    const value = e.target.value
    console.log(value);
    if(!value || parseFloat(value) === 0){
      setInputError({
        isErr:true,
        messageErr:'Amount is required'
      })
    }
    else if(parseFloat(value) > parseFloat(wethBalance)){
      setInputError({
        isErr:true,
        messageErr:'Insufficient funds'
      })
    }
    else{
      setInputError({
        isErr:false,
        messageErr:''
      })
    }
    setAmount(value)
  }
  return (
    <CustomModal
      onOk={pressOk}
      onCancel={pressCancel}
      titleButtonOK="Stake"
      modalTitle="Stake Modal"
      visible={visible}
      loading={loading}
      disabled={inputStatus.isErr}
    >
      <>
          <Input
          disabled={loading}
            placeholder="Input your amount"
            value={amount}
            onChange={handleChangeAmount}
            type="number"
            className={inputStatus.isErr ? 'input-err':''}
          />
          {inputStatus.isErr && <div className="input-error">{inputStatus.messageErr}</div>}
          <div className="balance-modal">Your WETH balance: <span>{wethBalance}</span> WETH</div>
        </>
    </CustomModal>
  );
};

StakingModal.propTypes = {};

export default StakingModal;
