import React, { useState } from 'react';
import './app.css'

const App = () => {
  
  const initialProduct = {
    description: '',
    canExpire: false,
    expiryDate: '',
    category: '',
    price: '',
    isSpecial: false,
  };

  const [products, setProducts] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [formProduct, setFormProduct] = useState(initialProduct);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddProduct = () => {
      // Basic client-side validation
  if (!formProduct.description || !formProduct.category || !formProduct.price) {
    alert('Please fill out all required fields.');
    return;
  }

  if (isNaN(parseFloat(formProduct.price)) || parseFloat(formProduct.price) <= 0) {
    alert('Please enter a valid positive price.');
    return;
  }

  if (formProduct.canExpire && !formProduct.expiryDate) {
    alert('Please enter the expiry date.');
    return;
  }
    if (editingIndex !== null) {
      // Edit existing product
      const updatedProducts = [...products];
      updatedProducts[editingIndex] = formProduct;
      setProducts(updatedProducts);
      setEditingIndex(null);
    } else {
      // Add new product
      setProducts([...products, formProduct]);
    }

    setFormProduct(initialProduct);
  };

  const handleEditProduct = (index) => {
    const productToEdit = products[index];
    setFormProduct(productToEdit);
    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);

  };

  const filteredProducts = filterCategory
    ? products.filter((product) => product.category === filterCategory)
    : products;

  const categories = ['Vegetables', 'Meat', 'Furniture', 'Electronics'];

  return (
    <div className="container">
      <h1>Product List</h1>

      <div className="container">
        <label>Filter by Category:</label>
        <select value={filterCategory} onChange={handleFilterChange}>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

          <ul className="product-list">
        {filteredProducts.map((product, index) => (
          <li key={index} className={`list-item ${product.isSpecial ? 'special' : ''}`}>
            <strong className='margin-right margin-left'>{product.description}</strong> - 
            <span className='margin-right margin-left'>{product.category}</span> - £{product.price}
            <span className='margin-right margin-left'>{product.canExpire ? 'Expired On:' + product.expiryDate : ''}</span>
            <button className = 'margin-left margin-right' onClick={() => handleEditProduct(index)}>Edit</button>
            <button onClick={() => handleDeleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="form-group container flex">
        <h2>{editingIndex !== null ? 'Edit Product' : 'Add New Product'}</h2>
        <label>Description*:</label>
        <input type="text" name="description" value={formProduct.description} onChange={handleInputChange} />

        <label>Can Expire:</label>
        <input type="checkbox" name="canExpire" checked={formProduct.canExpire} onChange={handleInputChange} />

        {formProduct.canExpire && (
          <div>
            <label>Expiry Date*:</label>
            <input type="date" name="expiryDate" value={formProduct.expiryDate} onChange={handleInputChange} />
          </div>
        )}

        <label>Category*:</label>
        <select name="category" value={formProduct.category} onChange={handleInputChange}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Price*:</label>
        <input type="text" name="price" value={formProduct.price} onChange={handleInputChange} />

        <label>Is Special:</label>
        <input type="checkbox" name="isSpecial" checked={formProduct.isSpecial} onChange={handleInputChange} />

        <button className="action-button" onClick={handleAddProduct}>
          {editingIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default App;
