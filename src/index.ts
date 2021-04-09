require('dotenv').config();
import 'module-alias/register';
import { Bot } from '@bot/bot';
import { env } from 'process';

//bot link https://discord.com/oauth2/authorize?client_id=829406598513426493&scope=bot&permissions=2147998784

new Bot(env.token);
