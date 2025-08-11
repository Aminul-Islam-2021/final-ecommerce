import React from "react";
import { FiEye } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";
import { useGetProductsQuery } from "../../store/features/products/productApi";

const AllProducts = () => {
  const { data: products } = useGetProductsQuery();
  console.log(products);
  return (
    <div className="bg-white rounded-lg shadow mb-4 overflow-hidden">
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3 gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            All Products
          </h2>
          <div>
            <input
              className=" border border-gray-300 p-2 rounded-md outline-teal-200"
              placeholder="search..."
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <div className="min-w-[600px] sm:min-w-full">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                 stock
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.products?.map((item) => (
                <tr key={item._id}>
                  <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                    <img
                      src={item?.images[0]?.secure_url}
                      alt={item.title}
                      className=" h-15 w-15 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    {item.title}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <span className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                      tk/-{item.price}
                    </span>

                    {/* <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                           ${
                             item % 3 === 0
                               ? "bg-green-100 text-green-800"
                               : item % 2 === 0
                               ? "bg-yellow-100 text-yellow-800"
                               : "bg-blue-100 text-blue-800"
                           }`}
                    >
                      {item % 3 === 0
                        ? "Delivered"
                        : item % 2 === 0
                        ? "Processing"
                        : "Shipped"}
                    </span> */}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500"></td>
                  <td className="px-3 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                    ${item.price}
                  </td>
                  <td className="flex gap-2 py-7 content-center whitespace-nowrap">
                    <button className="text-blue-500 hover:text-blue-700">
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button className="text-green-500 hover:text-green-700">
                      <HiOutlinePencilSquare className="h-5 w-5" />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
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
  );
};

export default AllProducts;
