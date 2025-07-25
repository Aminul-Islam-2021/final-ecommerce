import React from 'react'

const TopProducts = () => {
    return (
        <div className="bg-white rounded-lg shadow p-3 overflow-hidden">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Top Products</h2>
            <div className="space-y-2">
                {['Smartphone X', 'Wireless Earbuds', 'Fitness Tracker', 'Bluetooth Speaker', 'Laptop Pro'].map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center min-w-0">
                            <div className="h-8 w-8 rounded bg-gray-200 flex items-center justify-center mr-2 flex-shrink-0">
                                <span className="text-gray-500 text-xs">IMG</span>
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{product}</p>
                                <p className="text-xs text-gray-500 truncate">Category {index + 1}</p>
                            </div>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900 ml-2 flex-shrink-0">${(index + 1) * 199}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TopProducts
