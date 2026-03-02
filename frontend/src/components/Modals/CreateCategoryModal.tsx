import { useState, useEffect } from "react";
import { api } from "../../lib/adminApis";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onceCategoryCreated: () => void;
  categoryData: any;
  isEdit: boolean;
}

const CreateCategoryModal = ({
  isOpen,
  onClose,
  onceCategoryCreated,
  categoryData,
  isEdit
}: CreateCategoryModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEdit) {
      setName(categoryData?.name ?? "");
      setDescription(categoryData?.description ?? "");
    }
  }, [categoryData, isEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a Category name");
      return;
    }
    const payload: any = { name, description };
    let response: any;
    if (isEdit) {
      response = await api.updateCategory({
        name,
        description,
        id: categoryData._id
      });
    } else {
      response = await api.createCategory(payload);
    }
    console.log(response);
    setName("");
    setDescription("");
    onClose();
    onceCategoryCreated();
  };
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-4 px-6">
            <div className="flex items-center justify-between">
              <h2>Create Category</h2>
              <button onClick={onClose} className="text-gray-600">
                Close
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-9 p-4">
            <div className="flex flex-col gap-9">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pr-5 pl-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-2.5 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter brand description"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 pr-5 pl-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSubmit}
                  className="flex justify-center rounded bg-primary p-2 font-medium text-white hover:bg-opacity-90"
                >
                  {isEdit ? "Update" : "Submit"}
                </button>
                <button
                  onClick={onClose}
                  type="button"
                  className="flex justify-center rounded border p-2 font-medium"
                >
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

export default CreateCategoryModal;
