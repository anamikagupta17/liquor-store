import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Tables/TableTwo';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb pageName="Products" />

      <div className="flex flex-col gap-10">
       
        <TableTwo
          tableTitle="All Products"
          actionBtn={
            <div className="ml-4">
              <button
                type="button"
                onClick={() => navigate('/admin/create-product')}
                className="bg-[#007aff] text-white px-4 py-2 rounded-md hover:bg-[#0066d9] transition-colors"
              >
                Create Product
              </button>
            </div>
          }
        />
        
      </div>
    </>
  );
};

export default Products;
