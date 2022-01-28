import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const idOperation = req.body.data.idOperation

  if (!idOperation) {
    throw new Error('operation is undefined')
  }

  const data = req.body.data.modifyData
  const updatedOperation = await prisma.operation.update({
    where: {
      id: idOperation,
    },
    data,
  })

  return !updatedOperation
    ? res.status(409).json({ message: 'operation does not exist' })
    : res.status(200).json({ updatedOperation })
}
