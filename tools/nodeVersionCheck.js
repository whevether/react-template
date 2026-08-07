import {exec} from 'child_process';

exec('node -v', function (err, stdout) {
  if (err) throw err;

  const version = stdout.trim().slice(1);
  const [major, minor] = version.split('.').map(Number);
  const ok =
    (major === 22 && minor >= 18) ||
    (major === 24 && minor >= 11) ||
    major > 24;

  if (!ok) {
    throw new Error('node.js版本不正确，必须为 ^22.18.0 或 >=24.11.0（Babel 8 要求）...');
  }
});
