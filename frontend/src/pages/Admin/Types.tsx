import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

import TableTwo from "../../components/Tables/TableTwo";
import { useState } from "react";
import CreateTypeModal from "../../components/Modals/CreateTypeModal";

const Types = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <Breadcrumb pageName="Types" />

      <div className="flex flex-col gap-10">
        <TableTwo
          tableTitle="All Types"
          actionBtn={
            <div className="ml-4">
              <button
                type="button"
                onClick={() => setIsCreateOpen(true)}
                className="bg-[#007aff] text-white px-4 py-2 rounded-md hover:bg-[#0066d9] transition-colors"
              >
                Create Type
              </button>
            </div>
          }
        />

        <CreateTypeModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
        />
      </div>
    </>
  );
};

export default Types;
