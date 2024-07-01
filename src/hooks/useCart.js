import { useState,useEffect,useMemo } from "react"
import {db} from "../data/db"

export const useCart = ()=> {
    const initialCart = ()=>{
        const localStorageState = localStorage.getItem('cart')
        return localStorageState ? JSON.parse(localStorageState) : [] 
      }
      
      const [data] = useState(db)
      const [cart, setCart] = useState(initialCart)
      
      
      useEffect(()=>{
      localStorage.setItem('cart', JSON.stringify(cart))
      
      },[cart])
      function addToCart(item){
         const idExiste = cart.findIndex((guitar)=> item.id === guitar.id)
          
         if(idExiste === -1){
          item.quantity = 1
          setCart([...cart,item])
         }else{
          const carritoParaActualizar = [...cart]
          carritoParaActualizar[idExiste].quantity++
          setCart(carritoParaActualizar)
      
         }
        
      
      }
      
      
      function romeveCart(id){
        setCart(()=> cart.filter(guitar => guitar.id !== id) )
      }
      
      function addGuitar(id){
      const updateCart = cart.map(guitar=> {
         if(guitar.id === id){
      return{ 
              ...guitar,
              quantity: guitar.quantity + 1
         }
        }
        return guitar
      })
        setCart(updateCart)
      }
      
      
      function removeGuitar(id){
       const updateCart = cart.map(guitar =>{
        if(guitar.id === id){
          if(guitar.quantity === 1){
              romeveCart(id)
        
            return null 
          }else{
           return{
              ...guitar,
              
              quantity: guitar.quantity -1
           }
          }
        }
        return guitar
       }).filter(item => item !== null)  
      setCart(updateCart)
      
      }
      
      function cleanCart(){
        setCart([])
      }

      const stateDerivado = useMemo(()=> cart.length === 0, [cart])
      const cartTotal = useMemo(()=> cart.reduce((total,item)=>total+ (item.quantity *item.price), 0 ), [cart])

 
    return {
        data,
        cart,
        addToCart,
        addGuitar,
        romeveCart,
        removeGuitar,
        cleanCart,
        stateDerivado,
        cartTotal
    }  

}