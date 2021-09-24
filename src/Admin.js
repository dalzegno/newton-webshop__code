import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./Admin.css"
import { db } from './firebase';
import ListProduct from './ListProduct';
import Product from './Product';
import { useStateValue } from './StateProvider';

function Admin() {
    const history = useHistory();
    
    const addProductToDb = event => {
        event.preventDefault();
        
        let autoId = db.collection("products").doc().id;
        let item = {
            id: autoId,
            category: category,
            title: title,
            description: description,
            image: imageLink,
            price: price,
        }
        console.log(item);

        db.collection("products").doc(autoId).set({
            id: autoId,
            category: category,
            title: title,
            description: description,
            image: imageLink,
            price: price,
            available: quantity
        }).then(
            setTitle(""),
            setDescription(""),
            setPrice(''),
            setImageLink(""),
            setQuantity(""),
        ).then(alert("Product added!"))
    }
    const [category, setCategory] = useState('jackets');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageLink, setImageLink] = useState('');
    const [quantity, setQuantity] = useState('');


    const [products, setProducts] = useState([]);  
    useEffect(() => {
        db.collection("products")
        .orderBy('title', 'asc')
        .onSnapshot(snapshot => (
            setProducts(snapshot.docs.map(doc => ({
                
                data: doc.data(),
            })))
            
        ))
        
    }, [])
    
 /*    const [addProduct, setAddProduct] = useState();
    useEffect(() => {
        
        if(addProduct != null)
        
      var id = "";
        let autoId = db.collection("products").doc().id;
        db.collection("products").doc(autoId).set({
            thingy: "hej",
            id: autoId
        })
       
    }, [])  */
    const clearCheckboxes=()=>{
        db.collection("products").get().then(function(querySnapshot) {
            const promises = [];
            querySnapshot.forEach(function(doc) {
                
                promises.push(doc.ref.update({showOnHomePage:false}))
               
                console.log(doc.data().showOnHomePage);
            });
            return Promise.all(promises);
        });
        
    }

    return (
        <div className="admin">
            <div className="admin__addProduct">
                <form onSubmit={addProductToDb}>
                    <h1>Add product</h1>
                    <h5>Category</h5>
                    <select
                    onChange={e => setCategory(e.target.value)}
                     required>
                         <option value="jackets">Jackets</option>
                         <option value="tops">Tops</option>
                         <option value="trousers">Trousers</option>
                         <option value="shoes">Shoes</option>
                     </select>

                    <h5>Title</h5>
                    <input value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text" required/>

                    <h5>Description</h5>
                    <textarea value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="admin__descriptionInput"
                    type="text" required/>

                    <h5>Price</h5>
                    <input value={price}
                    onChange={e => setPrice(e.target.value)}
                     type="number" step="0.01" required/>

                    <h5>Image Link</h5>
                    <input value={imageLink}
                    onChange={e => setImageLink(e.target.value)}
                    type="text" required/>

                    <h5>Quantity</h5>
                    <input value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    type="number" required />

                    <button
                    type="submit" 
                    >Add product</button>
                </form >
            </div>

            <div className="admin__firstPageProducts">
                <div className="admin__firstPageProducts__title">
                    <h1>Homepage products</h1>
                    <p>Check the box to show product on the homepage</p>
                    <button onClick={clearCheckboxes}>Clear checkboxes</button>
                </div>
                
                <div className="admin__firstPageProducts__list">
                    {
                    products?.map((data) => 
                    <ListProduct id={data.data.id} title={data.data.title} image={data.data.image}
                    showOnHomePage= {data.data.showOnHomePage}/>)
                    } {/* <select>
                        <option value="SELECT SOMETHING">Select smth</option>
                        {products?.map((data) => <option><img src={data.data.image}></img>{data.data.title}</option>)}
                    </select> */}
                </div>
            </div>
        </div>
    )
}

export default Admin
