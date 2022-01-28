import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export default async function NewOperation(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const operationData = {
    authorId: 1,
    concept: req.body.data.concept,
    amount: req.body.data.amount,
    type: req.body.data.type,
    Date: req.body.data.Date,
  }

  const operation: Prisma.OperationCreateInput = operationData
  const savedOperation = await prisma.operation.create({ data: operation })
  res.status(201).json(savedOperation)
}
