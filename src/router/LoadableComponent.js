import Loadable from 'react-loadable'; 
import Loading from './LoadingComponent';
const LoadableComponent = (component)=>
  Loadable({
    loader: component,
    loading: Loading,
    timeout: 2000,
    delay: 200
  });
export default LoadableComponent;