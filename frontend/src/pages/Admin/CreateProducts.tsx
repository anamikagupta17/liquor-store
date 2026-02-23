import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const sampleCategories = ["Whiskey", "Vodka", "Rum", "Gin", "Tequila", "Wine"];
const sampleBrands = ["Brand A", "Brand B", "Brand C"];

const CreateProducts = () => {
  const navigate = useNavigate();

  // Product fields
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [alcoholPercent, setAlcoholPercent] = useState("");
  const [volume, setVolume] = useState("");
  const [size, setSize] = useState("");
  const [barcode, setBarcode] = useState("");
  const [supplier, setSupplier] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [statusActive, setStatusActive] = useState(true);

  // Images
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const arr = Array.from(files);
    setImages(arr);
    const urls = arr.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  };

  const resetForm = () => {
    setName("");
    setSku("");
    setCategory("");
    setBrand("");
    setType("");
    setPrice("");
    setCost("");
    setQuantity(0);
    setAlcoholPercent("");
    setVolume("");
    setSize("");
    setBarcode("");
    setSupplier("");
    setTags("");
    setDescription("");
    setStatusActive(true);
    setImages([]);
    setPreviews([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name.trim()) {
      alert("Product name is required");
      return;
    }
    if (!price || Number(price) <= 0) {
      alert("Enter a valid price");
      return;
    }

    // TODO: send payload and files to API
    const payload = {
      name,
      sku,
      category,
      brand,
      type,
      price: Number(price),
      cost: cost ? Number(cost) : undefined,
      quantity,
      alcoholPercent,
      volume,
      size,
      barcode,
      supplier,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      description,
      statusActive,
      imagesCount: images.length,
    };

    console.log("Submit product payload:", payload);
    alert("Product created (placeholder)");
    resetForm();
    navigate("/admin/products");
  };

  return (
    <>
      <Breadcrumb pageName="Create Product" />

      <div className="grid grid-cols-1 gap-9 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Product Details</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Product Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Enter product name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary"
                  />
                </div>

                <div className="mb-4.5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">SKU</label>
                    <input
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      type="text"
                      placeholder="Stock Keeping Unit"
                      className="w-full rounded border-[1.5px] border-stroke py-3 px-5"
                    />
                  </div>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5">
                      <option value="">Select category</option>
                      {sampleCategories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4.5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Brand</label>
                    <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full rounded border-[1.5px] border-stroke py-3 px-5">
                      <option value="">Select brand</option>
                      {sampleBrands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Type</label>
                    <input value={type} onChange={(e) => setType(e.target.value)} type="text" placeholder="e.g., Single Malt" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                </div>

                <div className="mb-4.5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Price</label>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" step="0.01" placeholder="0.00" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Cost</label>
                    <input value={cost} onChange={(e) => setCost(e.target.value)} type="number" step="0.01" placeholder="0.00" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Quantity</label>
                    <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type="number" min={0} className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                </div>

                <div className="mb-4.5 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Alcohol %</label>
                    <input value={alcoholPercent} onChange={(e) => setAlcoholPercent(e.target.value)} type="text" placeholder="e.g., 40%" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Volume</label>
                    <input value={volume} onChange={(e) => setVolume(e.target.value)} type="text" placeholder="e.g., 750ml" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                  <div>
                    <label className="mb-2.5 block text-black dark:text-white">Size</label>
                    <input value={size} onChange={(e) => setSize(e.target.value)} type="text" placeholder="Bottle size" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Barcode</label>
                  <input value={barcode} onChange={(e) => setBarcode(e.target.value)} type="text" placeholder="Barcode or UPC" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Supplier</label>
                  <input value={supplier} onChange={(e) => setSupplier(e.target.value)} type="text" placeholder="Supplier name" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">Tags (comma separated)</label>
                  <input value={tags} onChange={(e) => setTags(e.target.value)} type="text" placeholder="e.g., smooth, smoky" className="w-full rounded border-[1.5px] border-stroke py-3 px-5" />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">Description</label>
                  <textarea rows={6} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product description" className="w-full rounded border-[1.5px] border-stroke py-3 px-5"></textarea>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">Images</label>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="w-full" />
                  {previews.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {previews.map((src, idx) => (
                        <div key={idx} className="h-24 w-24 overflow-hidden rounded border">
                          <img src={src} alt={`preview-${idx}`} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90">Create Product</button>
                  <button type="button" onClick={resetForm} className="flex w-full justify-center rounded border p-3 font-medium">Reset</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
            <h4 className="mb-4 font-medium">Status & Quick Info</h4>
            <div className="mb-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={statusActive} onChange={(e) => setStatusActive(e.target.checked)} />
                <span>Active</span>
              </label>
            </div>

            <div className="mb-4">
              <p className="text-sm text-black">Preview price:</p>
              <p className="text-lg font-semibold">${price || '0.00'}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-black">Stock:</p>
              <p className="text-lg font-semibold">{quantity}</p>
            </div>

            <div className="mt-6">
              <Link to="/admin/products" className="text-sm text-primary hover:underline">Back to products</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProducts;
