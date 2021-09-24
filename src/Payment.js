import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import { db } from './firebase';
import "./Payment.css"
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'


function Payment() {
const [{basket, user}, dispatch] = useStateValue();
const[deliveryOption, setDeliveryOption] = useState("");
const history = useHistory();

const placeOrder = event => {
    alert("Your order has been placed!")
    db.collection('users').doc(user.uid).collection("order")
    .doc("Date.now").set({
        basket:basket
    })
    dispatch({
        type: "CLEAR_BASKET",
        basket: basket
    })
    history.push("/")

}
    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Reactvägen 9001</p>
                        <p>Stockholm, Sverige</p>
                    </div>
                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item=> (
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

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        
                        <input placeholder="Card number" type="number"/>
                        <input placeholder="MM / YY" type="number"/>
                        <input placeholder="CVC" type="number"/>

                    </div>

                    
                </div>
                
                <div className="payment__delivery">
                        <div>
                            <h3>Delivery method</h3>
                        </div>
                        <div className="deliveryOption">
                                <input onClick={() => setDeliveryOption(0)}
                                checked={deliveryOption? "" : true}type="radio" name="deliveryOption"/>
                                <h5>SEK<strong> 0 </strong></h5>
                                <p>&nbsp;Standard delivery (3-5 days)</p>
                            </div>
                        <div classname="payment__deliveryOptions">
                            <div className="deliveryOption">
                                <input onClick={() => setDeliveryOption(100)}
                                type="radio" name="deliveryOption"/>
                                <h5>SEK<strong> 100 </strong></h5>
                                <p> &nbsp; Same day delivery</p>
                            </div>
                            
                            <div className="deliveryOption" >
                                <input  onClick={() => setDeliveryOption(9000)}
                                type="radio" name="deliveryOption"/>
                                <h5>SEK<strong> 9000 </strong></h5>
                                <p>&nbsp; Instant delivery (5 min)</p>
                            </div>
                         </div>
                </div>
                <div className="payment__pay">
                    <h2>Order total: <small>SEK</small> {getBasketTotal(basket) + deliveryOption}</h2>
                    <h5>(VAT 25%: <small>SEK</small> {(getBasketTotal(basket) *0.25)})</h5>
                    <button onClick={placeOrder}>Buy now</button>
                </div>
            </div>
        </div>
    )
}

export default Payment
