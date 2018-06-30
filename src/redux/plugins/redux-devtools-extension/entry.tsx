import { composeWithDevTools } from 'redux-devtools-extension';

const reduxModule: IReduxModule = {
    enhancers: [composeWithDevTools({})],
    moduleName: 'redux-devtools-extension',
    order: -999,
};

export default reduxModule;