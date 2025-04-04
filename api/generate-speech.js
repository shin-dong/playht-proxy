import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { text, output_format = 'mp3', quality = 'draft' } = req.body;

  try {
    const response = await axios.post('https://play.ht/api/v2/tts', {
      text,
      output_format,
      quality
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.PLAYHT_API_KEY}`,
        'X-User-Id': process.env.PLAYHT_USER_ID,
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({
      error: 'TTS generation failed',
      details: err.response?.data || err.message
    });
  }
}
