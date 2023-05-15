import React from 'react'
import { useParams } from 'react-router-dom'
import { UseData } from '../../contexts/DataContext';
import ProductCard from '../Products/ProductCard';

const Product = () => {
  const {ID} = useParams();
  const {data} = UseData();
  const product = data.find(({id}) => id ==(ID));

  return (
    <ProductCard item={product} />
  )
}

export default Product