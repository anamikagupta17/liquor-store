import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import TableTwo from "../../components/Tables/TableTwo";
import CreateBrandModal from "../../components/Modals/CreateBrandModal";
import EditBrandModal from "../../components/Modals/EditBrandModal";
import { api } from "../../lib/adminApis";

const Brands = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const columns = [
    {
      key: "name",
      name: "Name"
    },
    {
      key: "description",
      name: "Description"
    },
    {
      key: "category",
      name: "Category"
    }
  ];

  async function getBrands() {
    try {
      const response = await api.getBrands();
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }
  useEffect(() => {
    getBrands();
  }, []);

  const handleAction = async (brandId: string, action: string) => {
    console.log("Action", action, "on brand", brandId);
    if (action === "edit") {
      // Handle edit action, e.g., open edit modal with brand details
      const response = await api.getBrandById(brandId);
      if (response) {
        setBrandData(response.data);
        setIsEditOpen(true);
      }
    } else if (action === "delete") {
      // Handle delete action, e.g., show confirmation and call API to delete brand
      await api.deleteBrand(brandId);
      getBrands();
    }
  };

  return (
    <>
      <Breadcrumb pageName="Brands" />

      <div className="flex flex-col gap-10">
        <TableTwo
          tableTitle="All Brands"
          data={brands}
          columns={columns}
          actionBtn={
            <div className="ml-4">
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="bg-[#007aff] text-white px-4 py-2 rounded-md hover:bg-[#0066d9] transition-colors"
              >
                Create Brand
              </button>
            </div>
          }
          actionFunction={handleAction}
        />

        <CreateBrandModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onBrandCreated={getBrands}
        />

        <EditBrandModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          brandData={brandData}
          onBrandUpdate={getBrands}
        />
      </div>
    </>
  );
};

export default Brands;
