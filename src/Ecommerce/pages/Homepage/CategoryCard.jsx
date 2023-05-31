import React from 'react'
import './categorycard.css'
import { useNavigate } from 'react-router-dom'
import { UseFilters } from '../../contexts/FilterContext';

const CategoryCard = ({gender, imgUrl}) => {
    const navigate = useNavigate();
    const {dispatchFilter} = UseFilters();
    const clickHandler = () => {
        dispatchFilter({type: "clearCategory"});
        dispatchFilter({type: "category", value: gender})
        navigate('/products')
    }

  return (
    <div onClick={clickHandler} className='categoryCard'>
        <div className='category-left'>
            <img src={imgUrl} />
        </div>
        <div className='category-right'>
            <div className='category-rightTop'>
                <h2>{gender.toUpperCase()}</h2>
            </div>

            <div className='category-rightBottom'>
                <p>We've got all {gender} fashion convered!!</p>
            </div>
        </div>
    </div>
  )
}

export default CategoryCard