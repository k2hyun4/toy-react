import {STATUS} from '@/type/status';
import {useMemo} from 'react';

const AllCompleteCheckbox = (props) => {
  const {items} = props;
  const updateAll = () => {
    const toCompleteAll = !completeAllFlag;
    props.updateAll(toCompleteAll ? STATUS.COMPLETE : STATUS.ACTIVE);
  };

  const completeAllFlag = useMemo(() => {
    return items.every(item => item.status === STATUS.COMPLETE);
  }, [items]);

  return (
      items.length
      ? <input type="checkbox"
               checked={completeAllFlag}
               onChange={updateAll}/>
      : null
  );
};

export default AllCompleteCheckbox;