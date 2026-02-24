/**
 * 读取与 Vite 相同的 .env.[mode] 文件，供 Webpack 构建时使用（如 VITE_AES_KEY）
 * 不依赖 dotenv，与 .env.development / .env.production / .env.test 格式一致
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @param {string} mode - development | production | test
 * @returns {Record<string, string>}
 */
export function loadEnv(mode) {
  const envPath = path.resolve(__dirname, "..", `.env.${mode}`);
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf8");
  const env = {};
  content.split("\n").forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith("#")) return;
    const i = line.indexOf("=");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    )
      value = value.slice(1, -1);
    env[key] = value;
  });
  return env;
}
