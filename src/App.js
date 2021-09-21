import React, { useState, useEffect } from "react";
import './App.css';
import Header from './Header'
import Home from "./Home";
import Checkout from "./Checkout";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Login";
import { auth, db } from "./firebase"
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import Admin from "./Admin";


function App() {
  const [{basket, user}, dispatch] = useStateValue()
  


    useEffect(()=>{
          db
          .collection('users')
          .doc(user?.uid)
          .collection('basket')
          .doc("basket")
          .set({
              basket: basket
          });
    }, [basket, user])


    useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      
      if(authUser){
        // login
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        // logout
        dispatch({
          type: "SET_USER",
          user:null
        })
      }
    })
  }, [])

  return (
    
    <Router>
      <div className="app">
      

        <Switch>
          <Route path="/login">
            <Login/>
          </Route>

          <Route path="/checkout">
            <Header/>
            <Checkout/>
          </Route>

          <Route path="/payment">
            <Header/>
            <Payment/>
          </Route>

          <Route path="/admin">
            <Header/>
            <Admin/>
          </Route>

          <Route path="/">
            <Header/>
            <Home/>
          </Route>
            
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
