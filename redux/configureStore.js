import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishes'
import { comments } from './comments'
import { promotions } from './promotions'
import { leaders } from './leaders'
import { favorites } from './favorites';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export const ConfigureStore = () => {
	
	const persistConfig = {
		key: 'root',
		storage: AsyncStorage,
		debug: true
	};

	const store = createStore(
		persistCombineReducers(persistConfig, {
			dishes,
			comments,
			promotions,
			leaders,
			favorites
		}),
		applyMiddleware(thunk, logger)
	);

	const persistor = persistStore(store);

	return { persistor, store };
}