import React from 'react'
import { FiEye } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";

const OrderTable = () => {
    return (
        <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
            <div className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <button className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 text-right">View all</button>
                </div>
            </div>

            <div className="overflow-x-auto w-full">
                <div className="min-w-[600px] sm:min-w-full">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <tr key={item}>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">#ORD-{item}00{item}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">Customer {item}</td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${item % 3 === 0 ? 'bg-green-100 text-green-800' :
                                                item % 2 === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {item % 3 === 0 ? 'Delivered' : item % 2 === 0 ? 'Processing' : 'Shipped'}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">2023-05-{10 + item}</td>
                                    <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">${(item * 125).toFixed(2)}</td>
                                    <td className="flex gap-2 py-2">
                                        <button

                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <FiEye className="h-5 w-5" />
                                        </button>
                                        <button

                                            className="text-green-500 hover:text-green-700"
                                        >
                                            <HiOutlinePencilSquare className="h-5 w-5" />
                                        </button>
                                        <button

                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <GoTrash className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OrderTable
