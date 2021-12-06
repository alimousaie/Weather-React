import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

jest.mock('axios');
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

export default store;

export { axios };