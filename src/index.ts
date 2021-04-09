if (!process.argv.some((arg) => arg.includes('index.ts'))) {
  // this should only run when the code is compiled to .js
  require('module-alias/register');
}
require('dotenv').config();
import { Bot } from '@bot/bot';
import { env } from 'process';

//bot link https://discord.com/oauth2/authorize?client_id=829406598513426493&scope=bot&permissions=2147998784

new Bot(env.token);
