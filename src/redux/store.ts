import { applyMiddleware, createStore } from 'redux';
import { enhancer, importModules, initialState, middlewares, onStoreCreate, reducer, reducerEnhancers } from './index';

export function configureStore() {
    const store = createStore(reducerEnhancers ? reducerEnhancers(reducer) : reducer, initialState, enhancer(applyMiddleware(...middlewares)));
    if (onStoreCreate) {
        onStoreCreate.forEach((o) => {
            if (typeof o === 'function') {
                o(importModules);
            }
        });
    }
    if ((module as any).hot) {
        (module as any).hot.accept('./index', () => {
            store.replaceReducer(require('./index').reducer);
        });
    }
    return store;
}

export default configureStore();