import { hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToMongoDB } from '#/lib/mongodb';
import { Users } from '#/models/Schema';

const createUser = async (
  username: string,
  email: string,
  password: string,
) => {
  // check existing user
  const checkExisting = await Users.findOne({ email });
  if (checkExisting) throw new Error('Email already exist');
  // hashPassword
  return Users.create({
    username,
    email,
    password: await hash(password, 12),
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await connectToMongoDB();
  } catch (err) {
    return res.status(500).json({ error: 'Connection Failed!' });
  }

  if (req.method === 'POST') {
    if (!req.body)
      return res.status(404).json({ error: "Don't have Data Form" });

    const { username, email, password } = req.body;

    try {
      const user = await createUser(username, email, password);
      return res.status(201).json({ status: true, user });
    } catch (error: any) {
      return res.status(422).json({ error: error.message });
    }
  } else {
    return res
      .status(405)
      .json({ message: 'HTTP method not valid only POST Accepted' });
  }
}
