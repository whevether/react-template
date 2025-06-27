import {exec} from 'child_process';

exec('node -v', function (err, stdout) {
  if (err) throw err;

  if (parseFloat(stdout.slice(1)) < 20) {
    throw new Error('node.js版本不正确，必须大于20以上...');
  }
});
