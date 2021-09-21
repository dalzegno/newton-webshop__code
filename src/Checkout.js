import React, {useEffect } from 'react';
import "./Checkout.css";
import CheckoutProduct from './CheckoutProduct';
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Subtotal from "./Subtotal";

function Checkout() {
    const[{basket, user}] =useStateValue();


 /*    const[userBasket, setUserBasket] = useStateValue();
    useEffect(() => {
        db.collection("users")
        .doc(user?.uid)
        .collection("basket")
        .onSnapshot(snapshot => (
            setUserBasket(snapshot.docs.map(doc => ({
                
                data: doc.data().basket,
            })))
            
        ))
        console.log("USERBASKET", userBasket)
        
    }, []) */
    
    return (
        <div className="checkout">
            <div className="checkout__right">
                <Subtotal/>
            </div>
            <div className="checkout__left">
                <img className="checkout__ad"
                 src="https://www.seekpng.com/png/full/20-208958_orange-banner-png-image-background-orange-banner-png.png"
                 alt=""></img>

                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="checkout__title">
                        Your shopping basket
                    </h2>
                    
                    {basket.map(item=>(
                        <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            
        </div>
    )
}

export default Checkout
