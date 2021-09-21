import React from 'react'
import "./DetailProduct.css"

function DetailProduct({open, children, onClose}) {
    if(!open) return null;

    return (
        <div className="detailProduct">
            <button onClick={onClose}>close</button>
            {children}
        </div>
    )
}

export default DetailProduct
