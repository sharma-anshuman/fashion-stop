import React from 'react'
import './products.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Loader from '../../components/Loader/Loader'
import {UseData} from '../../contexts/DataContext'

import ProductCard from './ProductCard'

const ProductsPage = () => {

  const {data} = UseData();
  console.log("were on the homepage", data)

  return !data.length?<Loader />: (
    <React.Fragment>
      <Navbar />
      <div>
        {
          <h1>Content will go here</h1>
        }
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default ProductsPage