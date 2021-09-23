import React, { useState, useEffect } from 'react'
import { db } from './firebase';
import "./Product.css"
import { useStateValue } from './StateProvider'
import DetailProduct from './DetailProduct'



function Product({id, title, description, image, price, rating, ratingCount, available}) {
    
    const [{basket, user, products}, dispatch] = useStateValue();

    //console.log("this is the basket ", basket)
    console.log("PRPRP", products.data)
            
    const addToBasket = () => {

         db.collection("products")
        .doc(`${id}`)
        .update({
            available: available -1
        })

        dispatch({
            
            type: "ADD_TO_BASKET",
            item: {
                id:id,
                title:title,
                image:image,
                price:price,
                rating:rating,
                description:description
            },
            
        })
        
        /* console.log("PROODD",
            products) */
    }
        let availableString = "";
        let availableNumber = "";
        let availableBool = false;
        if(available != null && available != 0 && available != undefined)
        {
            availableString = " available"
            availableNumber = available
            availableBool = true;
        }
        else{
            availableBool = false;
            availableString = "Not in store";
            availableNumber = "";
        }
        
    const [detailProductIsOpen, setDetailProductIsOpen] = useState(false);
   
    const prodId = value =>
    {
        value = detailProductIsOpen
    }
   
    return (
        
        <div className="product" 
        id = {detailProductIsOpen}
        onMouseLeave={()=>{setDetailProductIsOpen(false)}}> 
            <div class = "product__openDescription"
            
            onClick={()=>{setDetailProductIsOpen(!detailProductIsOpen)}}></div>
            <div className="product__info" onClick={()=>{setDetailProductIsOpen(!detailProductIsOpen)}}>
                
                <p className="product__title">{title}</p>
                <p className="product__price">
                    <small>SEK </small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
              {/*       {Array(rating)
                    .fill()
                    .map((_, i) =>(
                        <p>⭐</p>
                    ))}
                    <span> &nbsp;({ratingCount})</span>
                */} </div>
            </div>
            <img
            className ="product__image"
            src= {image}
            alt="">
            </img>
            <p className = "product__description"
            hidden={!detailProductIsOpen}>
            {description}
            </p>
            <div className="product__available" >
                <p>
                    <strong>{availableNumber}</strong>
                    <small>{availableString}</small>
                </p>
            </div>
            
            <button 
            hidden = {availableBool? false : true}
            disabled={availableBool? false : true}
            onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}

export default Product
