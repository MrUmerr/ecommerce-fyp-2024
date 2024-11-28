import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductAdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    Img: null, // Changed to null for file upload
    Price: "",
    Oldprice: "",
    Percentoff: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    axios
      .get("http://localhost:4001/shop")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log("Error fetching products:", error));
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Img" ? files[0] : value,
    });
  };

  // Add or update product
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      if (isEdit) {
        const response = await axios.put(
          `http://localhost:4001/shop/${currentProductId}`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProducts(
          products.map((product) =>
            product._id === currentProductId ? response.data : product
          )
        );
        toast.success("Product updated successfully!");
        setIsEdit(false);
      } else {
        const response = await axios.post("http://localhost:4001/shop", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts([...products, response.data]);
        toast.success("Product added successfully!");
      }
      resetForm();
    } catch (error) {
      toast.error("Error saving product.");
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setFormData({
      Name: product.Name,
      Description: product.Description,
      Img: null, // Reset the file input
      Price: product.Price,
      Oldprice: product.Oldprice,
      Percentoff: product.Percentoff,
    });
    setIsEdit(true);
    setCurrentProductId(product._id);
  };

  // Delete product
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:4001/shop/${productId}`)
      .then(() => {
        setProducts(products.filter((product) => product._id !== productId));
        toast.success("Product deleted successfully!");
      })
      .catch((error) => toast.error("Error deleting product."));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      Name: "",
      Description: "",
      Img: null,
      Price: "",
      Oldprice: "",
      Percentoff: "",
    });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-slate-900">
      <ToastContainer />
      <h1 className="text-3xl font-semibold text-center mb-6 mt-20">
        Product Admin Panel
      </h1>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <input
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
        />
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleInputChange}
          placeholder="Description"
          required
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
        />
        <input
          type="file"
          name="Img"
          onChange={handleInputChange}
          required={!isEdit} // Required only for adding new products
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
        />
        <input
          type="number"
          name="Price"
          value={formData.Price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
        />
        <input
          type="number"
          name="Oldprice"
          value={formData.Oldprice}
          onChange={handleInputChange}
          placeholder="Old Price"
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
        />
        <input
          type="text"
          name="Percentoff"
          value={formData.Percentoff}
          onChange={handleInputChange}
          placeholder="Percent Off"
          className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition duration-300"
        >
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-12 mb-4 text-center">
        Product List
      </h2>

      {Object.entries(
        products.reduce((acc, product) => {
          const category = product.Category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {})
      ).map(([category, categoryProducts]) => (
        <div key={category} className="mb-8">
          <h3 className="text-2xl font-extrabold mb-4 border-b mt-16 border-gray-300">
            Category: {category}
          </h3>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col justify-between p-4 border border-gray-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-950"
              >
                <div className="flex flex-col mb-4">
                  <span className="font-semibold">{product.Name}</span>
                  <span className="text-gray-500">${product.Price}</span>
                </div>
                <div className="space-x-2 flex justify-end">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200 dark:text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 dark:text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductAdminPanel;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProductAdminPanel = () => {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     Name: "",
//     Price: "",
//     Category: "",
//     Img: "",
//     Description: "",
//     Oldprice: "",
//     Percentoff: "",
//   });
//   const [isEdit, setIsEdit] = useState(false);
//   const [currentProductId, setCurrentProductId] = useState(null);

//   // Fetch products on component mount
//   useEffect(() => {
//     axios
//       .get("http://localhost:4001/shop")
//       .then((response) => setProducts(response.data))
//       .catch((error) => console.log("Error fetching products:", error));
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Add or update product
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     if (isEdit) {
//       axios
//         .put(`http://localhost:4001/shop/${currentProductId}`, formData)
//         .then((response) => {
//           setProducts(
//             products.map((product) =>
//               product._id === currentProductId ? response.data : product
//             )
//           );
//           toast.success("Product updated successfully!");
//           setIsEdit(false);
//           resetForm();
//         })
//         .catch((error) => toast.error("Error updating product."));
//     } else {
//       axios
//         .post("http://localhost:4001/shop", formData)
//         .then((response) => {
//           setProducts([...products, response.data]);
//           toast.success("Product added successfully!");
//           resetForm();
//         })
//         .catch((error) => toast.error("Error adding product."));
//     }
//   };

//   // Edit product
//   const handleEdit = (product) => {
//     setFormData({
//       Name: product.Name,
//       Price: product.Price,
//       Category: product.Category,
//       Img: product.Img,
//       Description: product.Description,
//       Oldprice: product.Oldprice,
//       Percentoff: product.Percentoff,
//     });
//     setIsEdit(true);
//     setCurrentProductId(product._id);
//   };

//   // Delete product
//   const handleDelete = (productId) => {
//     axios
//       .delete(`http://localhost:4001/shop/${productId}`)
//       .then(() => {
//         setProducts(products.filter((product) => product._id !== productId));
//         toast.success("Product deleted successfully!");
//       })
//       .catch((error) => toast.error("Error deleting product."));
//   };

//   // Reset form data
//   const resetForm = () => {
//     setFormData({
//       Name: "",
//       Price: "",
//       Category: "",
//       Img: "",
//       Description: "",
//       Oldprice: "",
//       Percentoff: "",
//     });
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg dark:bg-slate-900">
//       <ToastContainer />
//       <h1 className="text-3xl font-semibold text-center mb-6 mt-20">
//         Product Admin Panel
//       </h1>

//       <form onSubmit={handleFormSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="Name"
//           value={formData.Name}
//           onChange={handleInputChange}
//           placeholder="Product Name"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
//         />
//         <input
//           type="number"
//           name="Price"
//           value={formData.Price}
//           onChange={handleInputChange}
//           placeholder="Price"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
//         />
//         <input
//           type="text"
//           name="Category"
//           value={formData.Category}
//           onChange={handleInputChange}
//           placeholder="Category"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
//         />
//         <input
//           type="text"
//           name="Img"
//           value={formData.Img}
//           onChange={handleInputChange}
//           placeholder="Image URL"
//           className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
//         />
//         <textarea
//           name="Description"
//           value={formData.Description}
//           onChange={handleInputChange}
//           placeholder="Description"
//           required
//           className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
//         />
//         <input
//           type="number"
//           name="Oldprice"
//           value={formData.Oldprice}
//           onChange={handleInputChange}
//           placeholder="Old Price"
//           className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
//         />
//         <input
//           type="text"
//           name="Percentoff"
//           value={formData.Percentoff}
//           onChange={handleInputChange}
//           placeholder="Percent Off"
//           className="w-full p-3 border border-gray-300 rounded-md dark:bg-slate-950"
//         />
//         <button
//           type="submit"
//           className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition duration-300"
//         >
//           {isEdit ? "Update Product" : "Add Product"}
//         </button>
//       </form>

//       <h2 className="text-2xl font-semibold mt-12 mb-4 text-center">
//         Product List
//       </h2>

//       {Object.entries(
//         products.reduce((acc, product) => {
//           const category = product.Category || "Uncategorized";
//           if (!acc[category]) acc[category] = [];
//           acc[category].push(product);
//           return acc;
//         }, {})
//       ).map(([category, categoryProducts]) => (
//         <div key={category} className="mb-8">
//           <h3 className="text-2xl font-extrabold mb-4 border-b mt-16 border-gray-300">
//             Category: {category}
//           </h3>
//           <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//             {categoryProducts.map((product) => (
//               <div
//                 key={product._id}
//                 className="flex flex-col justify-between p-4 border border-gray-300 rounded-md hover:bg-slate-200 dark:hover:bg-slate-950"
//               >
//                 <div className="flex flex-col mb-4">
//                   <span className="font-semibold">{product.Name}</span>
//                   <span className="text-gray-500">${product.Price}</span>
//                 </div>
//                 <div className="space-x-2 flex justify-end">
//                   <button
//                     onClick={() => handleEdit(product)}
//                     className="px-6 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200 dark:text-black"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200 dark:text-black"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductAdminPanel;
