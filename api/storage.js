import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

const ALLOWED_KEYS = new Set([
  'demons',
  'players',
  'submissions',
  'registered_users',
  'site_settings',
  'upcoming',
  'profiles',
  'chat_messages',
  'changelog',
  'snapshots',
  'challenges',
  'platformers',
  'level_submissions'
]);

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const key = req.query.key;
      if (!key || !ALLOWED_KEYS.has(key)) {
        return res.status(400).json({ error: 'invalid or missing key' });
      }
      const value = await redis.get(key);
      if (value === null || value === undefined) {
        return res.status(404).json({ error: 'not found' });
      }
      return res.status(200).json({ key, value });
    }

    if (req.method === 'POST') {
      // req.body is usually pre-parsed on Vercel when Content-Type is
      // application/json, but handle raw string/Buffer defensively too.
      let body = req.body;
      if (Buffer.isBuffer(body)) body = body.toString('utf8');
      if (typeof body === 'string') body = JSON.parse(body);

      const { key, value } = body || {};
      if (!key || !ALLOWED_KEYS.has(key)) {
        return res.status(400).json({ error: 'invalid or missing key' });
      }
      if (value === undefined) {
        return res.status(400).json({ error: 'missing value' });
      }

      const result = await redis.set(key, value);
      if (result !== 'OK') {
        return res.status(500).json({ error: 'redis did not confirm the write', result });
      }
      return res.status(200).json({ key, value });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    console.error('storage handler error', err);
    return res.status(500).json({ error: 'internal storage error', message: err.message });
  }
}
