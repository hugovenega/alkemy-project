import { Operation } from '@prisma/client'

interface OperationsType {
  operations: {
    data: {
      getUserOperations: Operation[]
    }
  }
}

export default function CardBalance({ operations }: OperationsType) {
  const filteredIncomeOperations = operations.data.getUserOperations.filter(
    (operation: Operation) => {
      return operation.type === 'IN'
    }
  )

  const filteredOutOperations = operations.data.getUserOperations.filter(
    (operation: Operation) => {
      return operation.type === 'OUT'
    }
  )

  const totalIn = filteredIncomeOperations.reduce(
    (sum: number, current: Operation) =>
      sum + parseInt(current.amount as unknown as string),
    0
  )
  const totalOut = filteredOutOperations.reduce(
    (sum: number, current: Operation) =>
      sum + parseInt(current.amount as unknown as string),
    0
  )
  const balance = totalIn - totalOut
  return (
    <div>
      <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white justify-center items-center h-36">
        <div className="p-4 flex items-center justify-center w-80">
          <div className="p-3 rounded-full text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-500 mr-4">
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Account balance
            </p>
            <p className="text-6xl font-bold text-gray-700 flex-auto ml-2">
              ${balance}
            </p>
            <div className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                stroke="green"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7l4-4m0 0l4 4m-4-4v18"
                />
              </svg>
              <p className="text-lg font-bold text-green-600 w-24">{totalIn}</p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox=""
                stroke="red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 17l-4 4m0 0l-4-4m4 4V3"
                />
              </svg>
              <p className="text-lg font-bold text-red-600 w-24">{totalOut}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
