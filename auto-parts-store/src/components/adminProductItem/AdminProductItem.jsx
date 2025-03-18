import React from 'react';
import AdminButton from '../adminButton/AdminButton';
import { faInfoCircle, faImage, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './adminProductItem.css'

const AdminProductItem = ({ product, onInfoClick, onEditClick, onDeleteClick, onImageClick }) => {
    return (
        <div className='admin__item admin__product'>
            <div className='admin__product__img'>
                <img src={product.image || "/src/assets/silnik.jpg"} alt={product.name} />
            </div>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <div className='admin__product__btns'>
                <AdminButton 
                    dataTooltip="Info" 
                    faIcon={faInfoCircle} 
                    onClick={onInfoClick}
                />
                <AdminButton 
                    dataTooltip="Modify Picture" 
                    faIcon={faImage} 
                    onClick={onImageClick}
                />
                <AdminButton 
                    dataTooltip="Modify Data" 
                    faIcon={faEdit} 
                    onClick={onEditClick}
                />
                <AdminButton 
                    dataTooltip="Delete" 
                    faIcon={faTrash} 
                    onClick={onDeleteClick}
                />
            </div>
        </div>
    );
};

export default AdminProductItem;
