import React, { useState, useCallback } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
  FiSave,
  FiX,
  FiFolder,
  FiFolderPlus,
  FiList,
} from "react-icons/fi";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../store/features/category/categoryApi";
import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesQuery,
  useUpdateSubcategoryMutation,
} from "../../store/features/subCategory/subCategoryApi";

const Category = () => {
  // State
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingSubcategory, setIsAddingSubcategory] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [editingItem, setEditingItem] = useState({
    id: null,
    type: null,
    name: "",
  });

  // API Queries
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    error: categoryError,
    refetch: refetchCategories,
  } = useGetCategoriesQuery();
  const categories = categoriesData?.categories || [];

  // API Mutations
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createSubcategory] = useCreateSubCategoryMutation();
  const [updateSubcategory] = useUpdateSubcategoryMutation();
  const [deleteSubcategory] = useDeleteSubCategoryMutation();

  // Handlers
  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await createCategory({ name: newCategoryName }).unwrap();
      setNewCategoryName("");
      setIsAddingCategory(false);
    } catch (error) {
      alert(error.data?.message || "Failed to create category");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingItem.name.trim()) return;
    try {
      await updateCategory({
        id: editingItem.id,
        name: editingItem.name,
      }).unwrap();
      setEditingItem({ id: null, type: null, name: "" });
    } catch (error) {
      alert(error.data?.message || "Failed to update category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      await deleteCategory(id).unwrap();
      // Force refetch when deleting the last category
      if (categories.length <= 1) {
        refetchCategories();
      }
    } catch (error) {
      alert(error.data?.message || "Failed to delete category");
    }
  };

  const handleAddSubcategory = async (categoryId) => {
    if (!newSubcategoryName.trim()) return;
    try {
      await createSubcategory({
        categoryId,
        name: newSubcategoryName,
      }).unwrap();
      setNewSubcategoryName("");
    } catch (error) {
      alert(error.data?.message || "Failed to create subcategory");
    }
  };

  const handleUpdateSubcategory = async (categoryId) => {
    if (!editingItem.name.trim()) return;
    try {
      await updateSubcategory({
        categoryId,
        id: editingItem.id,
        name: editingItem.name,
      }).unwrap();
      setEditingItem({ id: null, type: null, name: "" });
    } catch (error) {
      alert(error.data?.message || "Failed to update subcategory");
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    if (!window.confirm("Are you sure you want to delete this subcategory?"))
      return;
    try {
      await deleteSubcategory({ categoryId, id: subcategoryId }).unwrap();
    } catch (error) {
      alert(error.data?.message || "Failed to delete subcategory");
    }
  };

  const startEditing = (id, type, name) => setEditingItem({ id, type, name });
  const cancelEditing = () =>
    setEditingItem({ id: null, type: null, name: "" });
  const saveEdit = (categoryId) => {
    editingItem.type === "category"
      ? handleUpdateCategory()
      : handleUpdateSubcategory(categoryId);
  };

  if (categoryLoading)
    return <div className="text-center py-8">Loading...</div>;
  if (categoryError)
    return (
      <div className="text-center py-8 text-red-500">
        Error loading categories
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className=" flex justify-between bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
          <h2 className="text-xl md:text-2xl font-bold flex items-center">
            <FiFolder className="mr-2" /> Product Categories
          </h2>
          <button
            onClick={() => setIsAddingCategory(true)}
            className="flex items-center bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-50 transition"
          >
            <FiPlus className="mr-1" /> Add Category
          </button>
        </div>

        {/* Empty State */}
        {categories.length === 0 && !isAddingCategory && (
          <div className="p-4 text-center">
            <div className="text-gray-500 mb-4">No categories found.</div>
          </div>
        )}

        {/* Add Category Form (only shown when explicitly adding) */}
        {isAddingCategory && (
          <div className="p-4 border-b">
            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCategory}
                  className="flex items-center bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition"
                >
                  <FiSave className="mr-1" /> Save
                </button>
                <button
                  onClick={() => setIsAddingCategory(false)}
                  className="flex items-center bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  <FiX className="mr-1" /> Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="divide-y">
          {categories.map((category) => (
            <div key={category._id} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {editingItem.id === category._id &&
                  editingItem.type === "category" ? (
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) =>
                        startEditing(category._id, "category", e.target.value)
                      }
                      className="px-2 py-1 border rounded mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  ) : (
                    <h3 className="font-medium text-lg flex items-center">
                      <FiFolder className="mr-2 text-blue-500" />
                      {category.name}
                    </h3>
                  )}
                  <button
                    onClick={() => toggleCategory(category._id)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    {expandedCategories[category._id] ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                </div>

                <div className="flex gap-2">
                  {editingItem.id === category._id &&
                  editingItem.type === "category" ? (
                    <>
                      <button
                        onClick={() => saveEdit(category._id)}
                        className="text-green-600 hover:text-green-800 p-1"
                        title="Save"
                      >
                        <FiSave />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        title="Cancel"
                      >
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          setIsAddingSubcategory((prev) => ({
                            ...prev,
                            [category._id]: true,
                          }))
                        }
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Add subcategory"
                      >
                        <FiFolderPlus />
                      </button>
                      <button
                        onClick={() =>
                          startEditing(category._id, "category", category.name)
                        }
                        className="text-yellow-600 hover:text-yellow-800 p-1"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Subcategories */}
              {expandedCategories[category._id] && (
                <SubcategoryList
                  categoryId={category._id}
                  isAddingSubcategory={isAddingSubcategory[category._id]}
                  onAddSubcategory={() =>
                    setIsAddingSubcategory((prev) => ({
                      ...prev,
                      [category._id]: true,
                    }))
                  }
                  onCancelAddSubcategory={() =>
                    setIsAddingSubcategory((prev) => ({
                      ...prev,
                      [category._id]: false,
                    }))
                  }
                  newSubcategoryName={newSubcategoryName}
                  onSubcategoryNameChange={setNewSubcategoryName}
                  onAddSubcategorySubmit={() =>
                    handleAddSubcategory(category._id)
                  }
                  onDeleteSubcategory={(subId) =>
                    handleDeleteSubcategory(category._id, subId)
                  }
                  editingItem={editingItem}
                  onStartEdit={startEditing}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEditing}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SubcategoryList = ({
  categoryId,
  isAddingSubcategory,
  onAddSubcategory,
  onCancelAddSubcategory,
  newSubcategoryName,
  onSubcategoryNameChange,
  onAddSubcategorySubmit,
  onDeleteSubcategory,
  editingItem,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) => {
  const {
    data: subcategories,
    isLoading,
    error,
  } = useGetSubCategoriesQuery({ categoryId }, { skip: !categoryId });

  return (
    <div className="mt-2 ml-8 pl-4 border-l-2 border-blue-200">
      {/* Add Subcategory Form */}
      {isAddingSubcategory && (
        <div className="mb-3">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={newSubcategoryName}
              onChange={(e) => onSubcategoryNameChange(e.target.value)}
              placeholder="Enter subcategory name"
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={onAddSubcategorySubmit}
                className="flex items-center bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition"
              >
                <FiSave className="mr-1" /> Save
              </button>
              <button
                onClick={onCancelAddSubcategory}
                className="flex items-center bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition"
              >
                <FiX className="mr-1" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subcategories List */}
      {isLoading ? (
        <div className="flex justify-center py-2">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 py-2">
          {error.data?.message || "Error loading subcategories"}
        </div>
      ) : subcategories?.subCategories?.length === 0 ? (
        <div className="py-2">
          <button
            onClick={onAddSubcategory}
            className="flex items-center text-sm text-blue-500 hover:text-blue-700"
          >
            <FiPlus className="mr-1" /> Add Subcategory
          </button>
        </div>
      ) : (
        <ul className="divide-y">
          {subcategories?.subCategories?.map((sub) => (
            <li
              key={sub._id}
              className="py-2 flex justify-between items-center"
            >
              <div className="flex items-center">
                {editingItem.id === sub._id &&
                editingItem.type === "subcategory" ? (
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) =>
                      onStartEdit(sub._id, "subcategory", e.target.value)
                    }
                    className="px-2 py-1 border rounded mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                ) : (
                  <span className="flex items-center">
                    <FiList className="mr-2 text-indigo-500" /> {sub.name}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                {editingItem.id === sub._id &&
                editingItem.type === "subcategory" ? (
                  <>
                    <button
                      onClick={() => onSaveEdit(categoryId)}
                      className="text-green-600 hover:text-green-800 p-1"
                    >
                      <FiSave />
                    </button>
                    <button
                      onClick={onCancelEdit}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <FiX />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        onStartEdit(sub._id, "subcategory", sub.name)
                      }
                      className="text-yellow-600 hover:text-yellow-800 p-1"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => onDeleteSubcategory(sub._id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <FiTrash2 />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;

// import React, { useState, useCallback } from "react";
// import {
//   FiPlus,
//   FiEdit2,
//   FiTrash2,
//   FiChevronDown,
//   FiChevronUp,
//   FiSave,
//   FiX,
//   FiFolder,
//   FiFolderPlus,
//   FiList,
// } from "react-icons/fi";
// import {
//   useCreateCategoryMutation,
//   useDeleteCategoryMutation,
//   useGetCategoriesQuery,
//   useUpdateCategoryMutation,
// } from "../../store/features/category/categoryApi";
// import {
//   useCreateSubCategoryMutation,
//   useDeleteSubCategoryMutation,
//   useGetSubCategoriesQuery,
//   useUpdateSubcategoryMutation,
// } from "../../store/features/subCategory/subCategoryApi";

// const Category = () => {
//   // State management
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [isAddingCategory, setIsAddingCategory] = useState(false);
//   const [isAddingSubcategory, setIsAddingSubcategory] = useState({});
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newSubcategoryName, setNewSubcategoryName] = useState("");
//   const [editingItem, setEditingItem] = useState({
//     id: null,
//     type: null,
//     name: "",
//   });

//   // API Queries
//   const {
//     data: categoriesData,
//     isLoading: categoryLoading,
//     error: categoryError,
//   } = useGetCategoriesQuery();

//   const categories = categoriesData?.categories || [];

//   // API Mutations
//   const [createCategory] = useCreateCategoryMutation();
//   const [updateCategory] = useUpdateCategoryMutation();
//   const [deleteCategory] = useDeleteCategoryMutation();
//   const [createSubcategory] = useCreateSubCategoryMutation();
//   const [updateSubcategory] = useUpdateSubcategoryMutation();
//   const [deleteSubcategory] = useDeleteSubCategoryMutation();

//   // Handlers
//   const toggleCategory = useCallback((categoryId) => {
//     setExpandedCategories((prev) => ({
//       ...prev,
//       [categoryId]: !prev[categoryId],
//     }));
//   }, []);

//   const handleAddCategory = useCallback(async () => {
//     if (!newCategoryName.trim()) return;
//     try {
//       await createCategory({ name: newCategoryName }).unwrap();
//       setNewCategoryName("");
//       setIsAddingCategory(false);
//     } catch (error) {
//       alert(error.data?.message || "Failed to create category");
//     }
//   }, [newCategoryName, createCategory]);

//   const handleUpdateCategory = useCallback(async () => {
//     if (!editingItem.name.trim()) return;
//     try {
//       await updateCategory({
//         id: editingItem.id,
//         name: editingItem.name,
//       }).unwrap();
//       setEditingItem({ id: null, type: null, name: "" });
//     } catch (error) {
//       alert(error.data?.message || "Failed to update category");
//     }
//   }, [editingItem, updateCategory]);

//   const handleDeleteCategory = useCallback(
//     async (id) => {
//       if (!window.confirm("Are you sure you want to delete this category?"))
//         return;
//       try {
//         await deleteCategory(id).unwrap();
//         setExpandedCategories((prev) => {
//           const newExpanded = { ...prev };
//           delete newExpanded[id];
//           return newExpanded;
//         });
//       } catch (error) {
//         alert(error.data?.message || "Failed to delete category");
//       }
//     },
//     [deleteCategory]
//   );

//   const handleAddSubcategory = useCallback(
//     async (categoryId) => {
//       if (!newSubcategoryName.trim()) return;
//       try {
//         await createSubcategory({
//           categoryId,
//           name: newSubcategoryName,
//         }).unwrap();
//         setNewSubcategoryName("");
//         setIsAddingSubcategory((prev) => ({ ...prev, [categoryId]: false }));
//       } catch (error) {
//         alert(error.data?.message || "Failed to create subcategory");
//       }
//     },
//     [newSubcategoryName, createSubcategory]
//   );

//   // UPDATE SUBCATEGORY
//   const handleUpdateSubcategory = useCallback(
//     async (categoryId) => {
//       if (!editingItem.name.trim()) return;
//       try {
//         await updateSubcategory({
//           categoryId,
//           id: editingItem.id,
//           name: editingItem.name,
//         }).unwrap();
//         setEditingItem({ id: null, type: null, name: "" });
//       } catch (error) {
//         alert(error.data?.message || "Failed to update subcategory");
//       }
//     },
//     [editingItem, updateSubcategory]
//   );

//   const handleDeleteSubcategory = useCallback(
//     async (categoryId, subcategoryId) => {
//       if (!window.confirm("Are you sure you want to delete this subcategory?"))
//         return;
//       try {
//         await deleteSubcategory({
//           categoryId,
//           id: subcategoryId,
//         }).unwrap();
//       } catch (error) {
//         alert(error.data?.message || "Failed to delete subcategory");
//       }
//     },
//     [deleteSubcategory]
//   );

//   const startEditing = useCallback((id, type, currentName) => {
//     setEditingItem({ id, type, name: currentName });
//   }, []);

//   const cancelEditing = useCallback(() => {
//     setEditingItem({ id: null, type: null, name: "" });
//   }, []);

//   const saveEdit = useCallback(
//     (categoryId) => {
//       if (editingItem.type === "category") {
//         handleUpdateCategory();
//       } else {
//         handleUpdateSubcategory(categoryId);
//       }
//     },
//     [editingItem, handleUpdateCategory, handleUpdateSubcategory]
//   );

//   if (categoryLoading)
//     return <div className="text-center py-8">Loading categories...</div>;

//   if (categoryError)
//     return (
//       <div className="text-center py-8 text-red-500">
//         {categoryError.data?.message || "Error loading categories"}
//       </div>
//     );
//   return (
//     <div className="max-w-4xl mx-auto p-4 md:p-6">
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl md:text-2xl font-bold flex items-center">
//               <FiFolder className="mr-2" /> Product Categories
//             </h2>
// <button
//   onClick={() => setIsAddingCategory(true)}
//   className="flex items-center bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-50 transition"
// >
//   <FiPlus className="mr-1" /> Add Category
// </button>
//           </div>
//         </div>

//         {/* Add Category Form */}
//         {(isAddingCategory || categories.length === 0) && (
//           <div className="p-4 border-b">
//             <div className="flex flex-col md:flex-row gap-2">
//               <input
//                 type="text"
//                 value={newCategoryName}
//                 onChange={(e) => setNewCategoryName(e.target.value)}
//                 placeholder="Enter category name"
//                 className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleAddCategory}
//                   className="flex items-center bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition"
//                 >
//                   <FiSave className="mr-1" /> Save
//                 </button>
//                 {categories.length > 0 && (
//                   <button
//                     onClick={() => {
//                       setIsAddingCategory(false);
//                       setNewCategoryName("");
//                     }}
//                     className="flex items-center bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition"
//                   >
//                     <FiX className="mr-1" /> Cancel
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Categories List */}
//         <div className="divide-y">
//           {categories.length === 0 && !isAddingCategory ? (
//             <div className="p-4 text-center">
//               <div className="text-gray-500 mb-4">No categories found.</div>
//               <button
//                 onClick={() => setIsAddingCategory(true)}
//                 className="flex items-center mx-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//               >
//                 <FiPlus className="mr-2" /> Create Your First Category
//               </button>
//             </div>
//           ) : (
//             categories.map((category) => (
//               <CategoryItem
//                 key={category._id}
//                 category={category}
//                 expanded={expandedCategories[category._id]}
//                 onToggle={toggleCategory}
//                 editingItem={editingItem}
//                 onStartEdit={startEditing}
//                 onSaveEdit={saveEdit}
//                 onCancelEdit={cancelEditing}
//                 onDelete={handleDeleteCategory}
//                 onAddSubcategory={() =>
//                   setIsAddingSubcategory((prev) => ({
//                     ...prev,
//                     [category._id]: true,
//                   }))
//                 }
//                 isAddingSubcategory={isAddingSubcategory[category._id]}
//                 onCancelAddSubcategory={() =>
//                   setIsAddingSubcategory((prev) => ({
//                     ...prev,
//                     [category._id]: false,
//                   }))
//                 }
//                 newSubcategoryName={newSubcategoryName}
//                 onSubcategoryNameChange={setNewSubcategoryName}
//                 onAddSubcategorySubmit={() =>
//                   handleAddSubcategory(category._id)
//                 }
//                 onDeleteSubcategory={(subcategoryId) =>
//                   handleDeleteSubcategory(category._id, subcategoryId)
//                 }
//               />
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const CategoryItem = ({
//   category,
//   expanded,
//   onToggle,
//   editingItem,
//   onStartEdit,
//   onSaveEdit,
//   onCancelEdit,
//   onDelete,
//   onAddSubcategory,
//   isAddingSubcategory,
//   onCancelAddSubcategory,
//   newSubcategoryName,
//   onSubcategoryNameChange,
//   onAddSubcategorySubmit,
//   onDeleteSubcategory,
// }) => {
//   const {
//     data: subcategories,
//     isLoading,
//     error,
//   } = useGetSubCategoriesQuery(
//     { categoryId: category._id },
//     { skip: !expanded }
//   );

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center">
//           {editingItem.id === category._id &&
//           editingItem.type === "category" ? (
//             <input
//               type="text"
//               value={editingItem.name}
//               onChange={(e) =>
//                 onStartEdit(category._id, "category", e.target.value)
//               }
//               className="px-2 py-1 border rounded mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//           ) : (
//             <h3 className="font-medium text-lg flex items-center">
//               <FiFolder className="mr-2 text-blue-500" />
//               {category.name}
//             </h3>
//           )}

//           <button
//             onClick={() => onToggle(category._id)}
//             className="ml-2 text-gray-500 hover:text-gray-700"
//           >
//             {expanded ? <FiChevronUp /> : <FiChevronDown />}
//           </button>
//         </div>

//         <div className="flex gap-2">
//           {editingItem.id === category._id &&
//           editingItem.type === "category" ? (
//             <>
//               <button
//                 onClick={() => onSaveEdit(category._id)}
//                 className="text-green-600 hover:text-green-800 p-1"
//                 title="Save"
//               >
//                 <FiSave />
//               </button>
//               <button
//                 onClick={onCancelEdit}
//                 className="text-gray-500 hover:text-gray-700 p-1"
//                 title="Cancel"
//               >
//                 <FiX />
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={onAddSubcategory}
//                 className="text-blue-600 hover:text-blue-800 p-1"
//                 title="Add subcategory"
//               >
//                 <FiFolderPlus />
//               </button>
//               <button
//                 onClick={() =>
//                   onStartEdit(category._id, "category", category.name)
//                 }
//                 className="text-yellow-600 hover:text-yellow-800 p-1}"
//                 title="Edit"
//               >
//                 <FiEdit2 />
//               </button>
//               <button
//                 onClick={() => onDelete(category._id)}
//                 className="text-red-600 hover:text-red-800 p-1"
//                 title="Delete"
//               >
//                 <FiTrash2 />
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Add Subcategory Form */}
//       {isAddingSubcategory && (
//         <div className="mt-3 ml-8 pl-4 border-l-2 border-blue-200">
//           <div className="flex flex-col md:flex-row gap-2">
//             <input
//               type="text"
//               value={newSubcategoryName}
//               onChange={(e) => onSubcategoryNameChange(e.target.value)}
//               placeholder="Enter subcategory name"
//               className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <div className="flex gap-2">
//               <button
//                 onClick={onAddSubcategorySubmit}
//                 className="flex items-center bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition"
//               >
//                 <FiSave className="mr-1" /> Save
//               </button>
//               <button
//                 onClick={onCancelAddSubcategory}
//                 className="flex items-center bg-gray-200 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-300 transition"
//               >
//                 <FiX className="mr-1" /> Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Subcategories List */}
//       {expanded && (
//         <div className="mt-2 ml-8 pl-4 border-l-2 border-blue-200">
//           {isLoading ? (
//             <div className="flex justify-center py-2">
//               <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error ? (
//             <div className="text-red-500 py-2">
//               {error.data?.message || "Error loading subcategories"}
//             </div>
//           ) : subcategories?.subCategories?.length === 0 ? (
//             <div className="py-2">
//               <div className="text-gray-500 mb-2">No subcategories yet</div>
//               <button
//                 onClick={onAddSubcategory}
//                 className="flex items-center text-sm text-blue-500 hover:text-blue-700"
//               >
//                 <FiPlus className="mr-1" /> Add Subcategory
//               </button>
//             </div>
//           ) : (
//             <ul className="divide-y">
//               {subcategories?.subCategories?.map((subcategory) => (
//                 <SubcategoryItem
//                   key={subcategory._id}
//                   subcategory={subcategory}
//                   categoryId={category._id}
//                   editingItem={editingItem}
//                   onStartEdit={onStartEdit}
//                   onSaveEdit={onSaveEdit}
//                   onCancelEdit={onCancelEdit}
//                   onDelete={onDeleteSubcategory}
//                 />
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// const SubcategoryItem = ({
//   subcategory,
//   categoryId,
//   editingItem,
//   onStartEdit,
//   onSaveEdit,
//   onCancelEdit,
//   onDelete,
// }) => {
//   return (
//     <li className="py-2 flex justify-between items-center">
//       <div className="flex items-center">
//         {editingItem.id === subcategory._id &&
//         editingItem.type === "subcategory" ? (
//           <input
//             type="text"
//             value={editingItem.name}
//             onChange={(e) =>
//               onStartEdit(subcategory._id, "subcategory", e.target.value)
//             }
//             className="px-2 py-1 border rounded mr-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//         ) : (
//           <span className="flex items-center">
//             <FiList className="mr-2 text-indigo-500" /> {subcategory.name}
//           </span>
//         )}
//       </div>

//       <div className="flex gap-2">
//         {editingItem.id === subcategory._id &&
//         editingItem.type === "subcategory" ? (
//           <>
//             <button
//               onClick={() => onSaveEdit(categoryId)}
//               className="text-green-600 hover:text-green-800 p-1"
//               title="Save"
//             >
//               <FiSave />
//             </button>
//             <button
//               onClick={onCancelEdit}
//               className="text-gray-500 hover:text-gray-700 p-1"
//               title="Cancel"
//             >
//               <FiX />
//             </button>
//           </>
//         ) : (
//           <>
//             <button
//               onClick={() =>
//                 onStartEdit(subcategory._id, "subcategory", subcategory.name)
//               }
//               className="text-yellow-600 hover:text-yellow-800 p-1"
//               title="Edit"
//             >
//               <FiEdit2 />
//             </button>
//             <button
//               onClick={() => onDelete(subcategory._id)}
//               className="text-red-600 hover:text-red-800 p-1"
//               title="Delete"
//             >
//               <FiTrash2 />
//             </button>
//           </>
//         )}
//       </div>
//     </li>
//   );
// };

// export default Category;
