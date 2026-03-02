import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

import { api} from "../../lib/adminApis";

interface EditBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandData:any;
  onBrandUpdate: () => void;
}

const EditBrandModal =  ({ isOpen, onClose,brandData,onBrandUpdate }: EditBrandModalProps) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setName(brandData?.name ?? "");
      setDescription(brandData?.description ?? "");
    }
  }, [brandData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a brand name");
      return;
    }
    const response= await api.updateBrand({name, description, id:brandData._id});
    console.log(response)
    setName("");
    setDescription("");
    onClose();
    onBrandUpdate()
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md sm:max-w-lg max-h-[70vh] overflow-auto">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-3 px-4">
            <div className="flex items-center justify-between">
              Edit  Brand
              <button onClick={onClose} className="text-gray-600">Close</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-4">
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
                <label className="mb-2.5 block text-black dark:text-white">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter brand description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pr-5 pl-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={handleSubmit} className="flex justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
                  Update
                </button>
                <button onClick={onClose} type="button" className="flex justify-center rounded border p-3 font-medium">
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

export default EditBrandModal;
