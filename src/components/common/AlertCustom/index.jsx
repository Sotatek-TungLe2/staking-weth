import { Alert } from 'antd';
import './styles.scss';
import images from '../../../themes/images';

const AlertCustom = ({
  type,
  message,
  bscscan,
  address,
}) => {
  const isMobile = false
  const Content = () => {
    if (!isMobile) {
      return (
        <div className={`customeAlertContent`}>
          <img
            src={type === 'error' ? images.icons.errorIcon : images.icons.successIcon}
            alt="TransactionReject"
          />
          <span>{message}</span>
          {bscscan ? (
            <div className="bscanview">
              <img src={images.icons.bscanview} alt="TransactionReject" />
              <a
                target="_blank"
                rel="noreferrer"
                href={`${process.env.REACT_APP_NETWORK_LINK}tx/${address}`}
              >
                View on etherScan
              </a>
            </div>
          ) : '' }
        </div>
      );
    } else {
      return (
        <a className={`customeAlertContent`} target="_blank"  rel="noreferrer" href={`${process.env.REACT_APP_NETWORK_LINK}tx/${address}`}>
          <img
            src={type === 'error' ? images.icons.errorIcon : images.icons.successIcon}
            alt="TransactionReject"
          />
          <span>{message}</span>
          {bscscan ? (
            <div className="bscanview">
              <img src={images.icons.bscanview} alt="TransactionReject" />
            </div>
          ) : ''}
        </a>
      )
    }
  };
  
  return (
    <Alert
      className={`customeAlert ${
        type === 'error' ? 'customeAlert__Error' : 'customeAlert__Success'
      }`}
      message={<Content />}
      closable={true}
      data-type="error"
    />
  );
};

export default AlertCustom;
