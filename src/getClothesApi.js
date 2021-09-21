import { db } from "./firebase";



function getApi(){
    let productsFromApi = [];

    fetch('https://fakestoreapi.com/products/')
    .then(res=>res.json())
    .then(
        json=> 
        productsFromApi = json
       /*  db
        .collection('products')
        .doc(json.id)
        .set(
            {product: json}
        
        ) */
    ).then(console.log(productsFromApi))
}
    getApi();

    function getApi(){
        let productsFromApi = [];
    
        fetch('https://fakestoreapi.com/products/')
        .then(res=>res.json())
        .then(
            json=> 
            json.forEach(x =>
                /* console.log(x.rating), */
                db
                .collection('products')
                .doc(`${x.id}`)
                .set(
                    {id:x.id,
                    title:x.title,
                    price:x.price,
                    description: x.description,
                    category: x.category,
                    image: x.image,
                    rating: x.rating.rate,
                    ratingCount: x.rating.count
                } )
            )
            )
    }
        getApi();



        var id = "";
        let autoId = db.collection("products").doc().id;
        db.collection("products").doc(autoId).set({
            thingy: "hej",
            id: autoId
        })
      