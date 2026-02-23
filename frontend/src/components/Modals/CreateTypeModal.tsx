import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

interface CreateTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateType = ({ isOpen, onClose }: CreateTypeModalProps) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up API call to create a type
    if (!name.trim()) {
      alert("Please enter a type name");
      return;
    }

    // For now just show success and close modal
    alert(`Type "${name}" created`);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="py-4 px-6">
            <div className="flex items-center justify-between">
              <Breadcrumb pageName="Create Type" />
              <button onClick={onClose} className="text-gray-600">Close</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-9 p-6">
            <div className="flex flex-col gap-9">
              <div>
                <label className="mb-2.5 block text-black dark:text-white">Type</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter type name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={handleSubmit} className="flex justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">
                  Submit
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

export default CreateType;
