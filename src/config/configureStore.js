import { createStore, combineReducers, applyMiddleware } from "redux";
import reducers from "../reducer";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSagas from "../sagas/rootSagas";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const logger = createLogger({
    collapsed: true,
  });

  const reducer = combineReducers(reducers);

  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  );

  sagaMiddleware.run(rootSagas);

  return store;
}
