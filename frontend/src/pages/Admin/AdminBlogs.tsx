import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../../components/Tables/TableTwo';
import { useNavigate } from 'react-router-dom';

const AdminBlogs = () => {
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumb pageName="Blogs" />

      <div className="flex flex-col gap-10">
       
        <TableTwo
          tableTitle="All Blogs"
          actionBtn={
            <div className="ml-4">
              <button
                type="button"
                onClick={() => navigate('/admin/create-blog')}
                className="bg-[#007aff] text-white px-4 py-2 rounded-md hover:bg-[#0066d9] transition-colors"
              >
                Create Blog
              </button>
            </div>
          }
        />
        
      </div>
    </>
  );
};

export default AdminBlogs;
