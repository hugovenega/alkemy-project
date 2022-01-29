import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function operationHistory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.json({ message: 'Method not allowed' })
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: 1, //change for req.body.id
    },
  })

  if (!getUser) {
    return res.json({ message: 'username not found' })
  }
  const getUserOperations = await prisma.operation.findMany({
    where: {
      authorId: 1, //change for req.body.id
    },
    orderBy: {
      Date: 'desc',
    },
  })
  return res.status(200).json({ getUserOperations })
}
