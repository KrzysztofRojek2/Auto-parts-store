import React, { useEffect, useState } from 'react';
import './adminProducts.css';
import Sidebar from '../../containers/Asidebar/Sidebar';
import AdminNavbar from '../../containers/Anavbar/AdminNavbar';
import AdminProductItem from '../../components/adminProductItem/AdminProductItem';
import { faPlus, faInfoCircle, faTrash, faImage, faEdit } from '@fortawesome/free-solid-svg-icons';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false); // Nowy stan do zarządzania modalem aktualizacji obrazu
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        discount: 0,
        quantity: 0,
        categoryId: 0,
        carId: 0,
        image: ''
    });
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [newImage, setNewImage] = useState(''); // Nowy stan do przechowywania nowego obrazu

    useEffect(() => {
        fetch('http://localhost:8080/api/part')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleAddProductClick = () => {
        setShowAddModal(true);
    }

    const handleInfoClick = (product) => {
        setSelectedProduct(product);
        setShowInfoModal(true);
    }

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            categoryId: product.categoryId,
            carId: product.carId
        });
        setShowEditModal(true);
    }

    const handleDeleteClick = (id) => {
        setDeleteProductId(id);
        setShowDeleteModal(true);
    }

    const confirmDelete = () => {
        fetch(`http://localhost:8080/api/part/${deleteProductId}/delete`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== deleteProductId));
            } else {
                console.error('Error deleting product:', response.statusText);
            }
            setShowDeleteModal(false);
        })
        .catch(error => console.error('Error deleting product:', error));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/api/part/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Part created successfully:', data);
            setProducts(prevProducts => [...prevProducts, data]);
            setShowAddModal(false);
        })
        .catch(error => console.error('Error creating part:', error));
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/part/${selectedProduct.id}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Part updated successfully:', data);
            setProducts(prevProducts => prevProducts.map(product => 
                product.id === selectedProduct.id ? data : product
            ));
            setShowEditModal(false);
        })
        .catch(error => console.error('Error updating part:', error));
    }

    const handleImageClick = (product) => {
        setSelectedProduct(product);
        setShowImageModal(true);
    }

    const handleImageSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/part/${selectedProduct.id}/updateImg`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: newImage
        })
        .then(response => response.json())
        .then(data => {
            console.log('Image updated successfully:', data);
            setProducts(prevProducts => prevProducts.map(product => 
                product.id === selectedProduct.id ? data : product
            ));
            setShowImageModal(false);
        })
        .catch(error => console.error('Error updating image:', error));
    }

    return (
        <div className='admin'>
            <Sidebar />
            <div className='admin-wrapper'>
                <AdminNavbar />
                <div className='admin__products'>
                    <div className='admin__option' onClick={handleAddProductClick}>
                        <p>Add product</p>
                    </div>
                    <div className='admin__products-wrapper'>
                        {products.map(product => (
                            <AdminProductItem 
                                key={product.id}
                                product={product}
                                onInfoClick={() => handleInfoClick(product)}
                                onEditClick={() => handleEditClick(product)}
                                onDeleteClick={() => handleDeleteClick(product.id)}
                                onImageClick={() => handleImageClick(product)} // Nowy przycisk do aktualizacji obrazu
                            />
                        ))}
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Delete Product</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <button onClick={confirmDelete}>Yes, Delete</button>
                        <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create New Part</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='modal__inputs'>
                                <div className='newsletter__group'>
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="description">Description:</label>
                                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="discount">Discount:</label>
                                    <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="categoryId">Category ID:</label>
                                    <input type="number" name="categoryId" value={formData.categoryId} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="carId">Car ID:</label>
                                    <input type="number" name="carId" value={formData.carId} onChange={handleInputChange} />
                                </div>
                            </div>
                        
                            <button type="submit">Create Part</button>
                        </form>
                        <button onClick={() => setShowAddModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {showInfoModal && selectedProduct && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Product Information</h2>
                        <p>Name: {selectedProduct.name}</p>
                        <p>Description: {selectedProduct.description}</p>
                        <p>Price: {selectedProduct.price}</p>
                        <p>Discount: {selectedProduct.discount}</p>
                        <p>Quantity: {selectedProduct.quantity}</p>
                        <p>Category ID: {selectedProduct.categoryId}</p>
                        <p>Car ID: {selectedProduct.carId}</p>
                        <button onClick={() => setShowInfoModal(false)}>Close Modal</button>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Part</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className='modal__inputs'>
                                <div className='newsletter__group'>
                                    <label htmlFor="name">Name:</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="description">Description:</label>
                                    <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="price">Price:</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="discount">Discount:</label>
                                    <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="quantity">Quantity:</label>
                                    <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="categoryId">Category ID:</label>
                                    <input type="number" name="categoryId" value={formData.categoryId} onChange={handleInputChange} />
                                </div>
                                <div className='newsletter__group'>
                                    <label htmlFor="carId">Car ID:</label>
                                    <input type="number" name="carId" value={formData.carId} onChange={handleInputChange} />
                                </div>
                            </div>
                        
                            <button type="submit">Update Part</button>
                        </form>
                        <button onClick={() => setShowEditModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            {showImageModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Update Image</h2>
                        <form onSubmit={handleImageSubmit}>
                            <div className='modal__inputs'>
                                <div className='newsletter__group'>
                                    <label htmlFor="image">New Image Path:</label>
                                    <input type="text" name="image" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit">Update Image</button>
                        </form>
                        <button onClick={() => setShowImageModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
export default AdminProducts;
