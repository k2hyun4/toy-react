'use client';

import {useMemo, useState} from 'react';
import {STATUS} from '@/type/status';
import TodoItem from '@/container/TodoItem';
import StatusControlButtons from '@/container/StatusControlButtons';
import NewItemInput from '@/container/NewItemInput';
import AllCompleteCheckbox from '@/container/AllCompleteCheckbox';

const Home = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(STATUS.ALL);
  const filteredItems = useMemo(() => {
    if (status === STATUS.ALL) return items;

    return items.filter(item => item.status === status);
  }, [items, status]);
  const onChangeItemStatus = (id, newStatus) => {
    const newItems = [...items];
    newItems.find(item => item.id === id)
      .status = newStatus;
    setItems(newItems);
  };
  const clearCompletedItems = () => {
    setItems(items => items.filter(item => item.status !== STATUS.COMPLETE));
  };
  const setAllStatus = (status) => {
    setItems(items => items.map(item => ({
      ...item,
      status: status
    })));
  };

  return (
    <main>
      <h1>todos</h1>
      <div>
        <div>
          <AllCompleteCheckbox
            items={items}
            updateAll={setAllStatus}/>
          <NewItemInput addItem={(newItem) => setItems([...items, newItem])}/>
        </div>

        <div>
          <ul>
            {
              filteredItems.map(item => {
                return (
                  <TodoItem {...item}
                    key={item.id}
                    onChangeStatus={onChangeItemStatus}/>
                );
              })
            }
          </ul>
        </div>
        <div>
          <span>
            {items.filter(item => item.status === STATUS.ACTIVE).length} item left
          </span>
          <StatusControlButtons
            status={status}
            setStatus={setStatus}
          />
          {
            items.some(item => item.status === STATUS.COMPLETE)
            ? <button onClick={() => clearCompletedItems()}>Clear completed</button>
            : ''
          }

        </div>
      </div>
    </main>
  )
};

export default Home;