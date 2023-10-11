import styles from '@/style/page.module.css';
import {STATUS} from '@/type/status';

const StatusControlButtons = (props) => {
  return (
    Object.values(STATUS).map(value => {
      return (
        <button key={value}
          className={props.status === value ? styles.selectedButton : ''}
          onClick={() => props.setStatus(value)}>{value}</button>
      );
    })

  );
};

export default StatusControlButtons;