import React from 'react'
import { UseData } from '../../contexts/DataContext'
import './checkoutCard.css'
import { useNavigate } from 'react-router-dom'

const CheckoutCard = ({dispCart}) => {
    const {data, cart} = UseData()
    const navigate = useNavigate();
    const sum = dispCart.reduce((acc, {id, priceAfterDiscount: p}) => acc+(cart[id]*p), 0);
  return (
    <div className='checkout'>
        <h2 className='checkout-head'>TOTAL PRICE</h2>
        <hr/>
        <div>
            {
                dispCart.map(({priceAfterDiscount, productName, id}) => <div className='checkout-price' key={id}>
                    <p className='priceCheckout'>{productName} ({cart[id]})</p>
                    <p className='priceCheckout'>&#8377;{cart[id] * priceAfterDiscount}</p>
                </div>)
            }
        </div>
        <hr/>
        <div className='totalPriceMain'>
            <p className='totalPriceCheckout'>Total Price: </p>
            <p className='totalPriceCheckout'>&#8377;{sum}</p>
        </div>
        <div>
            <button onClick={() => navigate('/checkout')} className='checkout-btn'>CHECKOUT</button>
        </div>
    </div>
  )
}

export default CheckoutCard