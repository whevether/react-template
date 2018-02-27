import React from 'react';
import { renderToString } from 'react-dom/server';
// import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../../src/router/routes';
import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';
export default (req, store, context,history) => {
  const content = renderToString(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>{renderRoutes(Routes)}</div>
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
        <div id="app">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="runtime~app.bundle.js"></script>
        <script src="app.bundle.js"></script>
      </body>
    </html>
  `;
};