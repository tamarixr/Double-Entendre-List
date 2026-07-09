// /api/storage.js
// Drop-in replacement for the Claude-artifact "window.storage" API,
// backed by Vercel KV (Upstash Redis under the hood).
//
// GET  /api/storage?key=demons        -> { key, value }
// POST /api/storage  { key, value }   -> { key, value }
//
// Requires a Vercel KV store attached to this project (see README.md).

import { kv } from '@vercel/kv';

// Keys this app is allowed to touch. Prevents the endpoint from being used
// as an arbitrary open key-value store for unrelated data.
const ALLOWED_KEYS = new Set([
  'demons',
  'players',
  'submissions',
  'registered_users',
  'site_settings'
]);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const key = req.query.key;
      if (!key || !ALLOWED_KEYS.has(key)) {
        return res.status(400).json({ error: 'invalid or missing key' });
      }
      const value = await kv.get(key);
      if (value === null || value === undefined) {
        return res.status(404).json({ error: 'not found' });
      }
      return res.status(200).json({ key, value });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { key, value } = body || {};
      if (!key || !ALLOWED_KEYS.has(key)) {
        return res.status(400).json({ error: 'invalid or missing key' });
      }
      await kv.set(key, value);
      return res.status(200).json({ key, value });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('storage handler error', err);
    return res.status(500).json({ error: 'internal storage error' });
  }
}
