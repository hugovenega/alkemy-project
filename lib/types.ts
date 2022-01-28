import { Operation } from '@prisma/client'

export interface OperationsType {
  operations: {
    data: {
      getUserOperations: Operation[]
    }
  }
}
