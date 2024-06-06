// src/lib/notionClient.js
import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_API_KEY });
