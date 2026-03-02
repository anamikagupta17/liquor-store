import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

import TableTwo from "../../components/Tables/TableTwo";
import { useEffect, useState } from "react";
import CreateTypeModal from "../../components/Modals/CreateCategoryModal";

import { api } from "../../lib/adminApis";
const Categories = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
  const columns = [
    {
      key: "name",
      name: "Name"
    },
    {
      key: "description",
      name: "Description"
    }
  ];

  async function getCategories() {
    try {
      const response = await api.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  const handleAction = async (categoryId: string, action: string) => {
    console.log("Action", action, "on brand", categoryId);
    if (action === "edit") {
      // Handle edit action, e.g., open edit modal with brand details
      const response = await api.getCategoryById(categoryId);
      if (response) {
        setCategoryData(response.data);
        setIsCreateOpen(true);
        setIsEdit(true)
      }
    } else if (action === "delete") {
      // Handle delete action, e.g., show confirmation and call API to delete brand
      await api.deleteCategory(categoryId);
      getCategories();
    }
  };

  return (
    <>
      <Breadcrumb pageName="Categories" />

      <div className="flex flex-col gap-10">
        <TableTwo
          tableTitle="All Categories"
          data={categories}
          columns={columns}
          actionBtn={
            <div className="ml-4">
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="bg-[#007aff] text-white px-4 py-2 rounded-md hover:bg-[#0066d9] transition-colors"
              >
                Create Category
              </button>
            </div>
          }
          actionFunction={handleAction}
        />

        <CreateTypeModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onceCategoryCreated={getCategories}
          categoryData={categoryData}
          isEdit={isEdit}
        />
      </div>
    </>
  );
};

export default Categories;
