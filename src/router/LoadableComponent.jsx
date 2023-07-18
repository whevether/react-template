import Loadable from '@loadable/component';
import React from 'react';
const LoadableComponent = (component) =>
  Loadable(component, { fallback: <div>加载中...</div> });
export default LoadableComponent;