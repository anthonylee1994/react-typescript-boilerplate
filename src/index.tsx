import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import './global.css';
import Router from './pages';
import { enhanceComponent } from './redux';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';

const render = (Component: React.ComponentType) => {
  const EnhancedComponent = enhanceComponent(Component);
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <EnhancedComponent />
      </Provider>
    </AppContainer>,
    document.getElementById('root') as HTMLElement,
  );
};

render(Router as any);

registerServiceWorker();
if ((module as any).hot) {
  (module as any).hot.accept('./pages', () => render(require('./pages').default));
}