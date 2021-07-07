import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CardsAction from '../store/action/card';

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators({...CardsAction}, dispatch)
}