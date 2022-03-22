import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as echarts from 'echarts';
const Chart = (props) => {
  const node = useRef(null);
  let chart = null;
  const renderChart = () => {
    if (props?.typeObj?.type === 'map' && props?.mapData) {
      echarts.registerMap(props?.typeObj?.value, props?.mapData);
    }
    chart = echarts.init(node.current, 'macarons');
    if (chart != null && props?.options) {
      chart.setOption(props.options, true);
      if (props?.onChartClick) {
        chart.on('click', props?.onChartClick);
      }
    }
  };
  const resize = () => {
    if (chart != null) {
      chart.resize();
    }
  };
  useEffect(() => {
    renderChart();
    resize();
    window.addEventListener('resize', resize);
    return () =>{
      window.removeEventListener('resize', resize);
      if(chart){
        chart.dispose();
      }
      chart = null;
    };
  }, []);
  return (
    <div className="chart" ref={node} />
  );
};
Chart.propTypes = {
  typeObj: PropTypes.object.isRequired,
  mapData: PropTypes.object,
  options: PropTypes.object.isRequired,
  onChartClick: PropTypes.func
};
export default Chart;