import router from 'next/router'
import React, { useState } from 'react'

const NewOperationComponent = () => {
  const [data, setData] = useState({
    concept: '',
    amount: 0,
    type: '',
    Date: '',
  })

  const handleInputChange = (event: {
    target: { name: string; value: unknown }
  }) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }
  const submitData = async () => {
    const response = await fetch('/api/newOperation.controller', {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const resData = await response.json()
    console.log(resData)
    if (resData) {
      router.push('/')
    }
  }

  return (
    <div className="flex  items-center justify-center">
      <form onSubmit={submitData} className="w-64">
        <h2 className="font-sans text-2xl font-bold text-white justify-center">
          New operation
        </h2>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          ></label>
          <input
            type="Concept"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="ex. Food"
            style={{ transition: 'all .15s ease' }}
            onChange={handleInputChange}
            name="concept"
            required
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          ></label>
          <input
            type="number"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="amount"
            style={{ transition: 'all .15s ease' }}
            onChange={handleInputChange}
            name="amount"
            required
          />
        </div>
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-password"
          ></label>
          <input
            type="datetime-local"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            style={{ transition: 'all .15s ease' }}
            onChange={handleInputChange}
            name="Date"
            required
          />
        </div>

        <div className="relative w-full mb-3">
          <select
            className="form-select appearance-none
      block
      w-full
      px-3
      py-3
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            name="type"
            onChange={handleInputChange}
          >
            <option selected value="IN">
              Select type Operation
            </option>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-black text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
            type="submit"
            style={{ transition: 'all .15s ease' }}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}
export default NewOperationComponent
