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

export default function Table2() {
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
    { id: 4, name: "Product A", price: "$10", category: "Category 1" },
    { id: 5, name: "Product B", price: "$20", category: "Category 2" },
    { id: 6, name: "Product C", price: "$30", category: "Category 3" },
  ];

  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="p-4">
      {/* Table */}
      <div className="overflow-x-auto overflow-y-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Category
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.price}
                </td>
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
                  <DialogTitle className="text-lg font-medium text-gray-900">
                    {modalData?.type === "view" && "View Details"}
                    {modalData?.type === "edit" && "Edit Item"}
                    {modalData?.type === "delete" && "Delete Confirmation"}
                  </DialogTitle>
                  <div className="mt-4">
                    {modalData?.type === "view" && (
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>Name:</strong> {modalData.data.name}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Price:</strong> {modalData.data.price}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Category:</strong> {modalData.data.category}
                        </p>
                      </div>
                    )}
                    {modalData?.type === "edit" && (
                      <EditData data={modalData} />
                    )}
                    {modalData?.type === "delete" && (
                      <p>
                        Are you sure you want to delete {modalData.data.name}?
                      </p>
                    )}
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={closeModal}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
