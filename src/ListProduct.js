import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import "./ListProduct.css"
import DeleteIcon from '@material-ui/icons/Delete';

function ListProduct({id, title, image, showOnHomePage}) {

    const[check, setCheck] = useState('');

    const log = event => {
        if(event.target.checked === true){
            db.collection('products').doc(`${id}`).update({
                showOnHomePage: true
            })
        }
        else{
            db.collection('products').doc(`${id}`).update({
                showOnHomePage: false
            })
        }
    }

    useEffect(() => {
    }, [])
    
    const deleteProductFromDb = event => {
        
        let pass = window.prompt("Enter password to delete product", "")
        if(pass === "admin123"){
            if(window.confirm("Are you sure you want to delete this product?")){
                db.collection('products').doc(`${id}`).delete();
            }
            else {

            }
        }
    }

    return (
        <div className="listProduct">
            <input checked={showOnHomePage} onClick={log} type="checkbox"/>
            <img src={image} alt=""/>
            <div className="listProduct__title">{title}</div>
            <DeleteIcon onClick={deleteProductFromDb} className="listProduct__delete"></DeleteIcon>
            
        </div>
    )
}

export default ListProduct
