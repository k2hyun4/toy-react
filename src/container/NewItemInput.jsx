import {useState} from 'react';
import {ENTER_KEY} from '@/type/constant';
import {v4} from 'uuid';
import {STATUS} from '@/type/status';

const NewItemInput = (props) => {
  const [newItem, setNewItem] = useState('');
  const onKeyDown = (event) => {
    if (!newItem.trim() || event.key !== ENTER_KEY) return;
    props.addItem({
      id: v4(),
      label: newItem,
      status: STATUS.ACTIVE
    });
    setNewItem('');
  };

  return (
    <input
      value={newItem}
      onKeyDown={e => onKeyDown(e)}
      onChange={e => setNewItem(e.target.value)}/>
  );
};

export default NewItemInput;