import React, { useState } from 'react'
import moment from 'moment'
import Modal from './Modal'
import { Operation, Type } from '@prisma/client'
import { OperationsType } from '../lib/types'

function HistoryComponent({ operations }: OperationsType) {
  if (!operations) {
    operations = {
      data: {
        getUserOperations: [],
      },
    }
  }

  const [data, SetData] = useState({
    operation: {},
    visible: false,
  })

  const getColor = (typeOperation: Type) => {
    if (typeOperation === 'IN') {
      return 'text-green-700'
    } else {
      return 'text-red-700'
    }
  }
  return (
    <div className="bg-white min-w-0 rounded-lg shadow-xs overflow-hidden bg-white  ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py- inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-black">
                <tr>
                  <th
                    scope="col"
                    className="text-md text-center font-bold text-gray-100 px-6 py-4 text-left"
                  >
                    Concept
                  </th>
                  <th
                    scope="col"
                    className="text-md text-center font-bold text-gray-100 px-6 py-4 text-left"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="text-md text-center font-bold text-gray-100 px-6 py-4 text-left"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="text-md text-center font-bold text-gray-100 px-6 py-4 text-left"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {operations.data.getUserOperations.map(
                  (e: Operation, index: number) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-200"
                      onClick={() =>
                        SetData({
                          operation: operations.data.getUserOperations[index],
                          visible: true,
                        })
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                        {e.concept}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                        {e.amount}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${getColor(
                          e.type
                        )}`}
                      >
                        {e.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">
                        {moment(e.Date).fromNow()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {data.visible && <Modal closeModal={SetData} dataIn={data} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryComponent
