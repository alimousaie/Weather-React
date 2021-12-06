import React from 'react';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { createStore } from 'redux';
import reducer from '../store/rootReducer';

function render(
	ui,
	{
		initialState,
		store = createStore(reducer, initialState),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };