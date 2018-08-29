import {
	createMigrate,
	persistReducer,
	persistCombineReducers,
	persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sampleReducer from "./reducers/sampleReducer";

import {applyMiddleware, combineReducers, createStore} from "redux";
import AppNavigator from "./navigation/AppNavigator";
import {createEpicMiddleware} from "redux-observable";
import rootEpic from "./epics";
import {isDebug} from "./utils/debugUtils";
import treeSate from "./reducers/treeState";

export default navigationService => {
	const persistConfig = {
		key: "rootReducer",
		storage,
		whitelist: [""],
		version: 1
	};

	const appReducer = persistCombineReducers(persistConfig, {
		treeSate
	});

	const persistedReducer = appReducer;

	const dependencies = {
		navigationService
	};

	const epicMiddleware = createEpicMiddleware(rootEpic, {dependencies});
	const middlewares = [epicMiddleware];
	if (isDebug()) {
		middlewares.push(require("redux-logger").default);
	}

	const store = createStore(persistedReducer, applyMiddleware(...middlewares));

	const persistor = persistStore(store);

	return {
		store,
		persistor
	};
};
