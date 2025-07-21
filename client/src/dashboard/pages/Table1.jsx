import React, { useState, Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FiEye } from "react-icons/fi";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoTrash } from "react-icons/go";
import EditData from "./EditData";

export default function Table1() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const data = [
    { id: 1, name: "Product A", price: "$10", category: "Category 1" },
    { id: 2, name: "Product B", price: "$20", category: "Category 2" },
    { id: 3, name: "Product C", price: "$30", category: "Category 3" },
    { id: 4, name: "Product D", price: "$40", category: "Category 1" },
    { id: 5, name: "Product E", price: "$50", category: "Category 2" },
    { id: 6, name: "Product F", price: "$60", category: "Category 3" },
    { id: 7, name: "Product G", price: "$70", category: "Category 1" },
    { id: 8, name: "Product H", price: "$80", category: "Category 2" },
    { id: 9, name: "Product I", price: "$90", category: "Category 3" },
    { id: 10, name: "Product J", price: "$100", category: "Category 1" },
  ];

  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key] ?? ""; // Handle undefined or null values
    const bValue = b[sortConfig.key] ?? ""; // Handle undefined or null values
  
    if (sortConfig.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  const filteredData = sortedData.filter((item) =>
    Object.values(item).some((value) => {
      // Ensure value is a string before calling toLowerCase
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    })
  );
  

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded px-4 py-2 w-1/3"
        />
        <div>
          <label className="mr-2">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[5, 10, 15].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              {["name","name","name", "price", "category"].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  {sortConfig.key === key && (
                    <span>
                      {sortConfig.direction === "ascending" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
              ))}
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.price}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.category}
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => openModal({ type: "view", data: item })}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FiEye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openModal({ type: "edit", data: item })}
                      className="text-green-500 hover:text-green-700"
                    >
                      <HiOutlinePencilSquare className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => openModal({ type: "delete", data: item })}
                      className="text-red-500 hover:text-red-700"
                    >
                      <GoTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                  <DialogTitle as="h3" className="text-lg font-medium text-gray-900">
                    Modal
                  </DialogTitle>
                  <EditData data={modalData} closeModal={closeModal} />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
