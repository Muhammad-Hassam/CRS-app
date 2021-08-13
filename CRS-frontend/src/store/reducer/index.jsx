import Status from './loginstatus';
import { combineReducers } from 'redux';

const rootreducer = combineReducers({
  status: Status,
});

export default rootreducer;
