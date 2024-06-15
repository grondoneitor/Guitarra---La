import { useState,useEffect } from "react"
import Header  from "./components/Header" 
import Guitarra from "./components/Guitarra"
import {db} from "./data/db"

function App() {

const [data,setData] = useState(db)
const [cart, setCart] = useState([])

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

  return (
    <>
   
     <Header
        cleanCart={cleanCart}
        removeGuitar={removeGuitar}
        addGuitar={addGuitar}
        romeveCart={romeveCart}
        cart={cart}
     />
  
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=> (
 
                    <Guitarra
                      key={guitar.id}
                      guitar={guitar}
                      cart={cart}
                      setCart={setCart}
                      addToCart={addToCart}
                    />
                    
                )
            )}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
  
    </>
  )
}

export default App
