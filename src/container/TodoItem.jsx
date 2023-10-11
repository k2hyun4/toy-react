import {STATUS} from '@/type/status';
import styles from '@/style/page.module.css';

const TodoItem = (props) => {
  const {id, status, label} = props;

  return (
    <li>
      <input type="checkbox"
             checked={status === STATUS.COMPLETE}
             onChange={(e) => props.onChangeStatus(id, e.target.checked ? STATUS.COMPLETE : STATUS.ACTIVE)}/>
      <span className={status === STATUS.COMPLETE ? styles.completedItem : ''}>{label}</span>
    </li>
  )
};

export default TodoItem;