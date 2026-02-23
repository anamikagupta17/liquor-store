import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const sampleCategories = ["News", "Events", "Guides", "Reviews"];

const CreateBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [status, setStatus] = useState("draft");

  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFeaturedImage(f);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setTags("");
    setAuthor("");
    setPublishDate("");
    setStatus("draft");
    setFeaturedImage(null);
    setPreview(null);
    setMetaTitle("");
    setMetaDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const payload = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      author,
      publishDate,
      status,
      featuredImage: featuredImage ? featuredImage.name : null,
      metaTitle,
      metaDescription,
    };

    console.log("Create blog payload:", payload);
    alert("Blog created (placeholder)");
    resetForm();
    navigate("/admin/blogs");
  };

  return (
    <>
      <Breadcrumb pageName="Create Blog" />

      <div className="grid grid-cols-1 gap-9 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Blog Details</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                </div>

                <div className="mb-4.5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Slug</label>
                    <input value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5">
                      <option value="">Select category</option>
                      {sampleCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Excerpt</label>
                  <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">Content</label>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="flex justify-center rounded bg-primary p-3 font-medium text-white">Create Blog</button>
                  <button type="button" onClick={resetForm} className="flex justify-center rounded border p-3 font-medium">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
            <h4 className="mb-4 font-medium">Post Settings</h4>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">Author</label>
              <input value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">Publish Date</label>
              <input value={publishDate} onChange={(e) => setPublishDate(e.target.value)} type="date" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">Featured Image</label>
              <input type="file" accept="image/*" onChange={handleImage} />
              {preview && <div className="mt-3 h-32 w-full overflow-hidden rounded border"><img src={preview} alt="preview" className="w-full h-full object-cover"/></div>}
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">Tags (comma separated)</label>
              <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
            </div>

            <div className="mt-6">
              <h5 className="font-medium mb-2">SEO</h5>
              <div className="mb-3">
                <label className="block mb-2">Meta Title</label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-2 px-3" />
              </div>
              <div>
                <label className="block mb-2">Meta Description</label>
                <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={3} className="w-full rounded border-[1.5px] border-stroke py-2 px-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
