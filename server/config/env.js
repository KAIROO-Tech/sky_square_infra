// Loads the root .env file. Import this FIRST in any entry point: ES module
// imports are evaluated before the importing file's body, so calling
// dotenv.config() inside index.js would run after route modules already read process.env.
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
