import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useGetCategoriesQuery } from "../../store/features/category/categoryApi";
import { useGetSubCategoriesQuery } from "../../store/features/category/subCategoryApi";
import { useCreateProductMutation } from "../../store/features/products/productApi";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    brand: "",
    category: "",
    subcategory: "",
    isFeatured: false,
    images: [],
    variants: [],
  });
  const { data: categories } = useGetCategoriesQuery();
  const { data: subcategories } = useGetSubCategoriesQuery(
    formData.category ? { categoryId: formData.category } : null,
    { skip: !formData.category }
  );
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  //const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [imagePreview, setImagePreview] = useState([]);
  const [variantImages, setVariantImages] = useState({});
  const [variants, setVariants] = useState(formData.variants);
  const [isFeaturedChecked, setIsFeaturedChecked] = useState(
    formData.isFeatured
  );

  // Pre-fill form data if initialData is provided (for update)
  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
      setVariants(selectedProduct.variants || []);
      setIsFeaturedChecked(selectedProduct.isFeatured || false);
      setImagePreview(selectedProduct.images || []);
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImagePreview(files.map((file) => URL.createObjectURL(file)));
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { color: "", colorImage: null, sizes: [{ size: "", stock: 0 }] },
    ]);
  };

  const handleVariantChange = (index, field, value) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleVariantImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setVariantImages((prev) => ({
        ...prev,
        [index]: URL.createObjectURL(file), // For preview
      }));
      setVariants((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], colorImage: file }; // Update the variant with the file
        return updated;
      });
    }
  };

  const addSize = (variantIndex) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === variantIndex
          ? { ...variant, sizes: [...variant.sizes, { size: "", stock: 0 }] }
          : variant
      )
    );
  };

  const removeSize = (variantIndex, sizeIndex) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === variantIndex
          ? {
              ...variant,
              sizes: variant.sizes.filter((_, j) => j !== sizeIndex),
            }
          : variant
      )
    );
  };

  const handleSizeChange = (variantIndex, sizeIndex, field, value) => {
    setVariants((prev) => {
      const updated = [...prev];
      updated[variantIndex].sizes[sizeIndex][field] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithFeatured = { ...formData, isFeatured: isFeaturedChecked };
    const data = new FormData();

    // Append basic fields
    for (let key in formDataWithFeatured) {
      if (key === "variants") {
        // Stringify the variants array (excluding the colorImage files)
        const variantsWithoutImages = variants.map((variant) => ({
          ...variant,
          colorImage: undefined, // Remove the File object before stringifying
        }));
        data.append(key, JSON.stringify(variantsWithoutImages));
      } else if (key === "images") {
        // Append product images
        formDataWithFeatured.images.forEach((image) =>
          data.append("images", image)
        );
      } else {
        data.append(key, formDataWithFeatured[key]);
      }
    }

    // Append variant colorImage files
    variants.forEach((variant, index) => {
      if (variant.colorImage) {
        data.append(`variants[${index}][colorImage]`, variant.colorImage);
      }
    });

    try {
      await createProduct(data).unwrap();
      alert("Product created successfully!");
      // Reset form after successful creation
      setFormData({
        title: "",
        description: "",
        price: "",
        discount: "",
        brand: "",
        category: "",
        subcategory: "",
        isFeatured: false,
        images: [],
        variants: [],
      });
      setImagePreview([]);
      navigate("/dashboard/all-products"); // Redirect to products page
    } catch (err) {
      alert(`Failed to create product. ${err.data}`);
      console.error("Error:", err.data);
    }
  };

  // if (!open) return null;

  return (
    <>
      <div class="max-w-4xl mx-auto p-2 md:p-6 ">
        <div class="w-full bg-white rounded-lg p-3">
          <div class="flex flex-wrap justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">
              Create a New Product
              {/* {isUpdate ? "Update Product" : "Create a New Product"} */}
            </h2>
            {/* <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <RxCross2 size={24} />
          </button> */}
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product Title */}
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Product Title"
              className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
            {/* Description */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none"
            />
            {/* Price & Discount */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Price"
                className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              />
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                placeholder="Discount (%)"
                className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Brand */}
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Brand"
                className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              />
              {/* Featured */}
              <div className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none">
                <input
                  type="checkbox"
                  id="booleanInput"
                  checked={isFeaturedChecked}
                  onChange={(e) => setIsFeaturedChecked(e.target.checked)}
                  className="mr-2"
                />
                <label className=" pl-4" htmlFor="booleanInput">
                  Featured
                </label>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Category Selection */}
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none "
              >
                <option value="">Select Category</option>
                {categories?.categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* Subcategory Selection */}
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200 outline-none "
                //   disabled={!categoryId}
              >
                <option value="">Select Subcategory</option>
                {subcategories?.subCategories?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <label className="block text-gray-600 mb-2">Upload Images</label>
              <input
                type="file"
                name="images"
                // For multiple image upload, add
                multiple
                onChange={handleImageChange}
                className="w-full p-2 bg-white rounded-lg"
              />
              <div className="mt-3 flex gap-2 flex-wrap">
                {imagePreview.map((src, i) => (
                  <div key={i} className="relative group">
                    <img
                      key={i}
                      src={src}
                      alt="preview"
                      className="w-20 h-20 rounded-md shadow"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute -top-3 -right-2 p-1 bg-red-500 text-white text-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <RxCross2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* Variants Section */}
            <div className="mt-4">
              <button
                type="button"
                onClick={addVariant}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                + Add Variant
              </button>

              {variants.map((variant, i) => (
                <div key={i} className="mt-4 p-4 bg-gray-100 rounded-lg ">
                  <input
                    type="text"
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) =>
                      handleVariantChange(i, "color", e.target.value)
                    }
                    className="w-full p-2 bg-white rounded-lg mb-2"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleVariantImageChange(e, i)}
                    className="w-full p-2 bg-white rounded-lg mb-2"
                  />
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {variantImages[i] && (
                      <div className="relative group">
                        <img
                          src={variantImages[i]}
                          alt="variant preview"
                          className="w-16 h-16 rounded-md my-2"
                        />
                        <button
                          type="button"
                          onClick={() => setVariantImages({})}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white text-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <RxCross2 />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    className=" bg-green-500 rounded-md p-1 px-3 text-white"
                    type="button"
                    onClick={() => addSize(i)}
                  >
                    + Add Size
                  </button>
                  {variant.sizes.map((size, j) => (
                    <div key={j}>
                      <input
                        className=" outline-none"
                        type="text"
                        placeholder="Size"
                        value={size.size}
                        onChange={(e) =>
                          handleSizeChange(i, j, "size", e.target.value)
                        }
                      />
                      <input
                        className=" outline-none"
                        type="number"
                        placeholder="Stock"
                        value={size.stock}
                        onChange={(e) =>
                          handleSizeChange(i, j, "stock", e.target.value)
                        }
                      />
                      <button
                        className=" bg-red-500 rounded-md p-1 px-3 text-white my-1"
                        type="button"
                        onClick={() => removeSize(i, j)}
                      >
                        - Remove Size
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              // disabled={isCreating || isUpdating}
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              {isCreating ? "Submitting..." : "Create Product"}
              {/* {isCreating || isUpdating
              ? "Submitting..."
              : isUpdate
              ? "Update Product"
              : "Create Product"} */}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
