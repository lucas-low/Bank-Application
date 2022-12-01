// server side code and not exposed to client side
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

// API route  
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Process a GET request
  try {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(jsonDirectory + '/bank.json', 'utf8');
  //Return the content of the data file in json format
  res.status(200).json(fileContents);
} catch (err) {
  res.status(500).json({err});
}
}
}