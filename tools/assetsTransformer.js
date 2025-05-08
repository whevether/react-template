//---------------------------------------------------------------------
// This is a fix for jest handling static assets like imported images
// when running tests. It's configured in jest section of package.json 
//
// See:
// https://github.com/facebook/jest/issues/2663#issuecomment-317109798
//---------------------------------------------------------------------
import path from 'node:path'; // 显式指定 node 协议

// 修改点 2: 替换 module.exports 为 export default
export default {
  process(src, filename /*, config, options */) {
    // 修改点 3: 生成 ESM 标准的导出语句
    return `export default ${JSON.stringify(path.basename(filename))};`;
  }
};