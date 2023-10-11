'use client';

import {ENTER_KEY} from '@/type/constant';
import {useMemo, useState} from 'react';
import {STATUS} from '@/type/status';
import {v4} from 'uuid';
import styles from '@/style/page.module.css';

const Home = () => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(STATUS.ALL);
  const onKeyDownAddItem = (event) => {
    if (event.key !== ENTER_KEY) return;

    setItems([...items, {
      id: v4(),
      label: newItem,
      status: STATUS.ACTIVE
    }]);
    setNewItem('');
  };
  const filteredItems = useMemo(() => {
    if (status === STATUS.ALL) return items;

    return items.filter(item => item.status === status);
  }, [items, status]);
  const setItemsStatus = () => {
    const toCompleteAll = !completeAllFlag;
    setItems(items => items.map(item => ({
      ...item,
      status: toCompleteAll ? STATUS.COMPLETE : STATUS.ACTIVE
    })));
  };
  const completeAllFlag = useMemo(() => {
    return items.every(item => item.status === STATUS.COMPLETE);
  }, [items]);
  const onChangeItemStatus = (id, checked) => {
    setItems(items => items.map(item => ({
      ...item,
      status: item.id === id
        ? checked ? STATUS.COMPLETE : STATUS.ACTIVE
        : item.status
    })));
  };
  const clearCompletedItems = () => {
    setItems(items => items.filter(item => item.status !== STATUS.COMPLETE));
  };

  return (
    <main>
      <h1>todos</h1>
      <div>
        <div>
          {
            items.length
              ? <input type="checkbox"
                  checked={completeAllFlag}
                  onChange={() => setItemsStatus()}/>
              : null
          }
          <input
            value={newItem}
            onKeyDown={e => onKeyDownAddItem(e)}
            onChange={e => setNewItem(e.target.value)}/>
        </div>

        <div>
          <ul>
            {
              filteredItems.map(item => {
                return <li key={item.id}>
                  <input type="checkbox"
                         checked={item.status === STATUS.COMPLETE}
                         onChange={(e) => onChangeItemStatus(item.id, e.target.checked)}/>
                  <span className={item.status === STATUS.COMPLETE ? styles.completedItem : ''}>{item.label}</span>
                </li>
              })
            }
          </ul>
        </div>
        <div>
          <span>
            {items.filter(item => item.status === STATUS.ACTIVE).length} item left
          </span>
          {
            Object.values(STATUS).map(value => {
              return <button key={value}
                className={status === value ? styles.selectedButton : ''}
                onClick={() => setStatus(value)}>{value}</button>
            })
          }
          {
            items.filter(item => item.status === STATUS.COMPLETE).length
            ? <button onClick={() => clearCompletedItems()}>Clear completed</button>
            : ''
          }

        </div>
      </div>
    </main>
  )
};

export default Home;