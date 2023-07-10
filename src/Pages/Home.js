// import React, { useEffect, useState } from 'react'
// import Navbar from '../Components/Navbar'
// import Footer from '../Components/Footer'
// import Card from '../Components/Cards'
// import Carousel from '../Components/Carousel';
// import { CartProvider } from '../Components/ContextReducer';

// export default function Home() {
//     const [search, setSearch] = useState('');
//     //const search='';
//     const [foodCat, setFoodCat] = useState([]);
//     const [foodItem, setFoodItem] = useState([]);
//     const loadData = async () => {
//         let response = await fetch("http://localhost:5000/api/foodData", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//         response = await response.json()
//         setFoodItem(response[0])
//         setFoodCat(response[1])
//         //console.log(response[0],response[1]); //0 for items and 1 for category
//     }

//     useEffect(() => {
//         loadData()
//     }, []
//     )








//     return (
//         <div>
//             <div>
//                 <Navbar />
//             </div>
//             <div>
//                 <Carousel setSearch={setSearch} />
//             </div>

//             <div>
//                 {/* <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
//                 <div className="carousel-inner" id='carousel'>
                    
//                     <div className='carousel-caption' style={{ zIndex : "10" }}>
//                         <div className="d-flex justify-content-center">
//                             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/> */}
//                 {/* <button className="btn btn-success" type="submit">Search</button> */}
//                 {/* </div>
//                     </div>
//                     <div className="carousel-item active">
//                         <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
//                     </div>
//                     <div className="carousel-item">
//                         <img src="https://source.unsplash.com/random/900x700?pizza" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//                     </div>
//                     <div className="carousel-item">
//                         <img src="https://source.unsplash.com/random/900x700?toast" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
//                     </div>
//                 </div>
//                 <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Previous</span>
//                 </button>
//                 <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="visually-hidden">Next</span>
//                 </button>
//             </div> */}
//             </div>
//             <div className='container'>
//                 {
//                     //using ternary operator (if else one line)
//                     foodCat !== []
//                         ? foodCat.map((data) => {
//                             return (<div className='row mb-3'>
//                                 {/* <div>Hello</div> //displaying  3 time as there are 3 items */}
//                                 <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
//                                 <hr />
//                                 {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
//                                     .map(filterItems => {
//                                         return (

//                                             <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
//                                                 <CartProvider>
//                                                 <Card foodItem={filterItems}

//                                                     options={filterItems.options[0]}

//                                                 ></Card>
//                                                 </CartProvider>

//                                             </div>
//                                         )
//                                     })
//                                     : <div>No Such Data Found</div>}







//                             </div>
//                             )
//                         }) : <div>***********</div> //ens here ternary operator
//                 }

//             </div>


//             <br />
//             <div>
//                 <Footer />
//             </div>
//         </div>
//     )
// }


import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Cards';
import Carousel from '../Components/Carousel';
//import { CartProvider } from '../Components/ContextReducer';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel setSearch={setSearch} />
      <div className='container'>
        {foodCat !== [] ? (
          foodCat.map((data) => (
            <div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />
              {foodItem !== [] ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      
                        <Card foodItem={filterItems} options={filterItems.options[0]} />
                      
                    </div>
                    
                  ))
              ) : (
                <div>No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div>***********</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
