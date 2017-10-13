import React from 'react';
import { renderToString } from 'react-dom/server';
import { Switch,StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { ConnectedRouter } from 'react-router-redux';
import {RouteWithSubRoutes,routes} from '../../src/router/router';
import App from '../../src/containers/app';
import { Helmet } from 'react-helmet';
const index = routes.map((route, i) => (
  <RouteWithSubRoutes key={i} {...route}/>
));
export default (req, store, context,history) => {
  const content = renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <StaticRouter location={req.path} context={context}>
          <App>
            <Switch>
              {index}
            </Switch>
          </App>
        </StaticRouter>
      </ConnectedRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="/app.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="/vendor.js"></script>
        <script src="/app.js"></script>
      </body>
    </html>
  `;
};