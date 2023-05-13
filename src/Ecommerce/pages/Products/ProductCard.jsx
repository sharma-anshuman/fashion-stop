import React from 'react'
import './productcard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({item}) => {
    const {id,
        productName,
        size,
        imageLink,
        rating,
        price,
        discount,
        priceAfterDiscount,
        isTrending,
        outOfStock,
        reviewCount,
        deliveryTime,} = item;
  return (
    <React.Fragment key={id}>
        <div className='productCard'>
            <div className='product-top'>
                <img className='ootd' src={imageLink} />
                <div className='heart'><FontAwesomeIcon icon={faHeart} /></div>
                <div className='ratenreview'><label><FontAwesomeIcon icon={faStar} />{rating}</label> | {reviewCount}</div>
                {isTrending===true && <p className='trending'>Trending</p>}
            </div>

            <div className='product-mid'></div>

            <div className='product-bottom'></div>
        </div>
    </React.Fragment>
  )
}

export default ProductCard


