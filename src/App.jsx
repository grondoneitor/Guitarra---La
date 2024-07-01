import Header  from "./components/Header" 
import Guitarra from "./components/Guitarra"
import { useCart } from "./hooks/useCart"

function App() {
   
  const { data,cart, addToCart, addGuitar,romeveCart, removeGuitar, cleanCart,stateDerivado, cartTotal} = useCart()

  return (
    <>
   
     <Header
        cleanCart={cleanCart}
        removeGuitar={removeGuitar}
        addGuitar={addGuitar}
        romeveCart={romeveCart}
        cart={cart}
        stateDerivado={stateDerivado}
        cartTotal={cartTotal}
     />
  
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar)=> (
 
                    <Guitarra
                      key={guitar.id}
                      guitar={guitar}
                      cart={cart}
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
