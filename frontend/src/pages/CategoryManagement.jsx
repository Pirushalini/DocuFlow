import { useState } from "react";
import { Folder, Plus, Edit, Trash2, X } from "lucide-react";

function CategoryManagement() {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Finance",
      description: "Financial and accounting documents",
    },
    {
      id: 2,
      name: "Human Resources",
      description: "Employee and HR related documents",
    },
    {
      id: 3,
      name: "Legal",
      description: "Legal and compliance documents",
    },
    {
      id: 4,
      name: "General",
      description: "General documents",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  // Open Add Form
  const handleAddClick = () => {
    setEditingCategoryId(null);
    setCategoryName("");
    setDescription("");
    setShowForm(true);
  };

  // Open Edit Form
  const handleEditClick = (category) => {
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
    setDescription(category.description);
    setShowForm(true);
  };

  // Add / Update Category
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    if (editingCategoryId) {
      // Update existing category
      setCategories(
        categories.map((category) =>
          category.id === editingCategoryId
            ? {
                ...category,
                name: categoryName.trim(),
                description:
                  description.trim() || "No description available",
              }
            : category
        )
      );
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        name: categoryName.trim(),
        description:
          description.trim() || "No description available",
      };

      setCategories([...categories, newCategory]);
    }

    handleCancel();
  };

  // Cancel Form
  const handleCancel = () => {
    setShowForm(false);
    setEditingCategoryId(null);
    setCategoryName("");
    setDescription("");
  };

  // Delete Category
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmed) {
      return;
    }

    setCategories(
      categories.filter((category) => category.id !== id)
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-[#123B5D]">
            Category Management
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            Manage document categories used across the system.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          className="inline-flex items-center justify-center gap-2
          rounded-lg bg-[#1677B8] px-4 py-2.5
          text-sm font-semibold text-white
          transition hover:bg-[#3FA9D9]"
        >
          <Plus size={17} strokeWidth={2} />
          Add Category
        </button>

      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="rounded-2xl border border-[#D9E2E8]
        bg-white p-6 shadow-sm">

          {/* Form Header */}
          <div className="mb-5 flex items-start justify-between">

            <div>
              <h2 className="text-base font-semibold text-[#123B5D]">
                {editingCategoryId
                  ? "Edit Category"
                  : "Add New Category"}
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                {editingCategoryId
                  ? "Update the category information."
                  : "Create a new category for organizing documents."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCancel}
              className="flex h-8 w-8 items-center justify-center
              rounded-lg text-[#6B7280]
              transition hover:bg-[#F4F7F9] hover:text-[#263238]"
            >
              <X size={18} />
            </button>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Category Name */}
            <div>
              <label
                htmlFor="category-name"
                className="text-sm font-medium text-[#263238]"
              >
                Category Name
              </label>

              <input
                id="category-name"
                type="text"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="mt-2 w-full rounded-lg border
                border-[#D9E2E8] bg-white px-3 py-2.5
                text-sm text-[#263238] outline-none transition
                focus:border-[#1677B8]
                focus:ring-2 focus:ring-[#1677B8]/10"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="category-description"
                className="text-sm font-medium text-[#263238]"
              >
                Description
              </label>

              <textarea
                id="category-description"
                rows="3"
                placeholder="Enter category description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full rounded-lg border
                border-[#D9E2E8] bg-white px-3 py-2.5
                text-sm text-[#263238] outline-none transition
                focus:border-[#1677B8]
                focus:ring-2 focus:ring-[#1677B8]/10"
              />
            </div>

            {/* Form Actions */}
            <div className="flex gap-3">

              <button
                type="submit"
                className="rounded-lg bg-[#00A6A6] px-4 py-2.5
                text-sm font-semibold text-white
                transition hover:bg-[#087F8C]"
              >
                {editingCategoryId
                  ? "Update Category"
                  : "Create Category"}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg border border-[#D9E2E8]
                bg-white px-4 py-2.5
                text-sm font-medium text-[#263238]
                transition hover:bg-[#F4F7F9]"
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      {/* Category List */}
      <div className="rounded-2xl border border-[#D9E2E8]
      bg-white shadow-sm">

        {/* List Header */}
        <div className="border-b border-[#D9E2E8] p-6">

          <h2 className="text-base font-semibold text-[#123B5D]">
            Categories
          </h2>

          <p className="mt-1 text-sm text-[#6B7280]">
            {categories.length}{" "}
            {categories.length === 1
              ? "category"
              : "categories"}{" "}
            available
          </p>

        </div>

        {/* Category Items */}
        <div className="divide-y divide-[#D9E2E8]">

          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-4 p-5
              transition hover:bg-[#F4F7F9]
              sm:flex-row sm:items-center sm:justify-between"
            >

              {/* Category Information */}
              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0
                items-center justify-center rounded-xl
                bg-[#EAF6FB] text-[#1677B8]">
                  <Folder size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#123B5D]">
                    {category.name}
                  </p>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    {category.description}
                  </p>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">

                {/* Edit */}
                <button
                  type="button"
                  onClick={() => handleEditClick(category)}
                  className="inline-flex items-center gap-2
                  rounded-lg border border-[#D9E2E8]
                  bg-white px-3 py-2
                  text-sm font-medium text-[#263238]
                  transition hover:bg-[#F4F7F9]"
                >
                  <Edit size={16} strokeWidth={1.8} />
                  Edit
                </button>

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => handleDelete(category.id)}
                  className="inline-flex items-center gap-2
                  rounded-lg border border-[#FECACA]
                  bg-white px-3 py-2
                  text-sm font-medium text-[#B91C1C]
                  transition hover:bg-[#FEF2F2]"
                >
                  <Trash2 size={16} strokeWidth={1.8} />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default CategoryManagement;
