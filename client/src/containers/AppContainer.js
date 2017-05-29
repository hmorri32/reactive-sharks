import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions           from '../actions/actions.js';
import App                    from '../components/app/App';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
