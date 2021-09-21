import React,{ useState, useEffect} from 'react'
import { db } from './firebase';
import "./Home.css";
import Product from './Product';
import { useStateValue } from './StateProvider';

function Home() {
    const [products, setProducts] = useState([]);
   
    useEffect(() => {
        db.collection("products")
        .onSnapshot(snapshot => (
            setProducts(snapshot.docs.map(doc => ({
                
                data: doc.data(),
            })))
            
        ))
        console.log("PRODUCTS", products)
        
    }, [])
    

    const[category, setCategory] = useState();
    useEffect(() => {
        console.log("hej",category)
    }, [])
   
    

    return (
        <div className="home">
            <div className="home__image" src="" alt="">
                    
                    </div>
            <div className="home__container">
                
                <div className="home__title">
                    <h1>Clothes</h1>
                    <h1>& Clothes</h1>
                   {/*  <p>Ye olde shoppe for thy Clothes</p> */}
                </div>
                <div className ="home__categories">
                    <button onClick={()=>setCategory("")}>Featured</button>
                    <button onClick={()=>setCategory("jackets")}>Jackets</button>
                    <button onClick={()=>setCategory("tops")} >Tops</button>
                    <button onClick={()=>setCategory("trousers")}>Trousers</button>
                    <button onClick={()=>setCategory("shoes")}>Shoes</button>
                </div>

                <h1  className="home__categoryTitle">{category? category : "Featured"}</h1>
                <div className="home__row">
                    
                   {    category?
                         products?.filter(item => item.data.category === category).map(data => (
                             <Product 
                             id = {data.data.id}
                             title = {data.data.title}
                             image = {data.data.image}
                             rating = {Math.ceil(data.data.rating)}
                             ratingCount = {data.data.ratingCount}
                             price = {data.data.price}
                             available = {data.data.available}
                             description = {data.data.description}
                             />
                    ))
                    :
                    products?.filter(item => item.data.showOnHomePage === true).map(data => (
                        
                        <Product 
                        id = {data.data.id}
                        title = {data.data.title}
                        image = {data.data.image}
                        rating = {Math.ceil(data.data.rating)}
                        ratingCount = {data.data.ratingCount}
                        price = {data.data.price}
                        available = {data.data.available}
                        description = {data.data.description}
                        />
                        
               ))
                 }
                </div>
                <div className="home__row">
              {

              }
                </div>
                <div className="home__row">
                    {/* <Product 
                    id = "12341234"
                    title="The lean startup"
                    price={29.99}
                    image = "https://kbimages1-a.akamaihd.net/5c5e77cc-1fb9-410b-a735-de95a9a5dd40/1200/1200/False/the-lean-startup-1.jpg" 
                    rating={3}/> */}
                </div>
                
            </div>
        </div>
    )
}

export default Home
