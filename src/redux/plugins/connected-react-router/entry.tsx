import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';
import * as React from 'react';
import history from '../../history';
export const moduleName = 'connected-react-router';

const reduxModule: IReduxModule = {
    middlewares: [routerMiddleware(history)],
    moduleName,
    reducerEnhancers: [connectRouter(history)],
    render: (Component) => {
        return class ConnectedRouterHoc extends React.Component<undefined, undefined> {
            public render() {
                return (
                    <ConnectedRouter history={history}>
                        <Component />
                    </ConnectedRouter>
                );
            }
        };
    },
};

export default reduxModule;