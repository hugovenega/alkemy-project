import moment from 'moment'
import router from 'next/router'
import { useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Modal({ closeModal, dataIn }: any) {
  const [modifyData, setModifyData] = useState({
    concept: '',
    amount: 0,
    Date: '',
  })

  const handleInputChange = (event: {
    target: { name: string; value: unknown }
  }) => {
    setModifyData({
      ...modifyData,
      [event.target.name]: event.target.value,
    })
  }

  const show = dataIn.visible ? '' : 'hidden'
  const operation = dataIn.operation
  const handleOnClick = () => {
    closeModal({
      operation: {},
      visible: false,
    })
  }

  const handleClickEdit = async () => {
    const response = await fetch('/api/operationUpdate.controller', {
      method: 'POST',
      body: JSON.stringify({ data: { idOperation: operation.id, modifyData } }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const resData = await response.json()
    console.log({ resData })
    if (resData) {
      router.reload()
    }
  }

  const handleClickDelete = async () => {
    const response = await fetch('/api/operationDelete.controller', {
      method: 'POST',
      body: JSON.stringify({ data: { idOperation: operation.id } }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const resData = await response.json()
    console.log({ resData })
    if (resData) {
      router.reload()
    }
  }
  return (
    <div
      id="defaultModal"
      aria-hidden="true"
      className={`${show} overflow-y-auto overflow-x-hidden fixed justify-center items-center top-2 ms:w-full ms:bg-white`}
    >
      <div className="relative px-4 w-full max-w-2xl md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex justify-between items-start p-5 rounded-t border-b bg-black ">
            <h3 className="text-xl font-semibold text-white lg:text-2xl">
              Operation
            </h3>
            <button
              type="button"
              onClick={() => {
                handleOnClick()
              }}
              className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  "
              data-modal-toggle="defaultModal"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <form className="w-64 px-3">
            <div className="whitespace-nowrap text-sm font-medium text-gray-600">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              ></label>
              <input
                type="text"
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-xl"
                placeholder={operation.concept}
                style={{ transition: 'all .15s ease' }}
                onChange={handleInputChange}
                name="concept"
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              ></label>
              <input
                type="number"
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-xl"
                placeholder={operation.amount as unknown as string}
                style={{ transition: 'all .15s ease' }}
                onChange={handleInputChange}
                name="amount"
              />
            </div>
            <div className="relative w-4xl mb-3">
              <label
                className="block text-gray-700 text-xs mb-2"
                htmlFor="grid-password"
              >
                Date of operation:{' '}
                {moment(operation.Date).format('MMMM Do h:mm a')}
              </label>
              <input
                type="datetime-local"
                className="border-0 py-3 w-full placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring"
                style={{ transition: 'all .15s ease' }}
                onChange={handleInputChange}
                name="Date"
              />
            </div>
          </form>

          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
            <button
              data-modal-toggle="defaultModal"
              type="button"
              onClick={handleClickEdit}
              className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Edit
            </button>
            <button
              data-modal-toggle="defaultModal"
              type="button"
              onClick={handleClickDelete}
              className="text-white bg-red-600 hover:bg-red-900 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
