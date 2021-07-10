import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CardsAction from '../store/action/card';
import * as StatisticAction from '../store/action/statistic';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({...CardsAction, ...StatisticAction}, dispatch)
}
