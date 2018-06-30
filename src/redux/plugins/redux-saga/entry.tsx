import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

const middleware = createSagaMiddleware();
const reduxModule: IReduxModule = {
    middlewares: [middleware],
    moduleName: 'redux-saga',
    onStoreCreate: (modules) => {
        middleware.run(function* rootSaga() {
            yield all([
                ...modules.filter((m) => m.saga).map((m) => {
                    return fork(m.saga);
                }),
            ]);
        });
    },
};

export default reduxModule;