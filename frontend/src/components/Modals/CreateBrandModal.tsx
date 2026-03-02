import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

import { api} from "../../lib/adminApis";

interface CreateBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBrandCreated: () => void;
}

const CreateBrandModal =  ({ isOpen, onClose,onBrandCreated }: CreateBrandModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response: any = await api.getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a brand name");
      return;
    }
    const payload: any = { name, description };
    if (selectedCategory) payload.category = selectedCategory;
    const response= await api.createBrands(payload);
    console.log(response)
    setName("");
    setDescription("");
    onClose();
    onBrandCreated()
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md sm:max-w-lg max-h-[70vh] overflow-auto">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="py-3 px-4">
            <div className="flex items-center justify-between">
             Create Brand
              <button onClick={onClose} className="text-gray-600">Close</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 px-4 py-2">
            <div className="flex flex-col gap-6">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Brand</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter brand name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pr-5 pl-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-2.5 block text-black dark:text-white">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pr-5 pl-2 text-black outline-none transition focus:border-primary"
                >
                  <option value="">Select category</option>
                  {categories.map((c: any) => (
                    <option key={c._id || c.id || c.name} value={c._id || c.id || c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter brand description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pr-5 pl-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={handleSubmit} className="flex justify-center rounded bg-primary p-2 font-medium text-white hover:bg-opacity-90">
                  Submit
                </button>
                <button onClick={onClose} type="button" className="flex justify-center rounded border p-2 font-medium">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBrandModal;
