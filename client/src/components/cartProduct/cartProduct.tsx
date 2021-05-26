import React, {useState, useEffect} from 'react';
// import Redirect from 'react-router';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  deleteProductFromCart,
  changeProductQuantity,
} from '../../app/actions/cartActions/index';
import {userInfo, userToken} from '../../app/reducers/registerReducer';
import './cartProduct.css';

const CartProduct = (props) => {
  // eslint-disable-next-line react/prop-types
  const {image, name, amount, price, id, stock, idOrder} = props.product;
  const [productAmount, setProductAmount] = useState(amount);
  const userInf = useAppSelector(userInfo);
  const userId = userInf.id;
  const token = useAppSelector(userToken);
  const dispatch = useAppDispatch();
  const handleDeleteProduct = () => {
    dispatch(deleteProductFromCart(id, idOrder, userId, token));
    alert('Product deleted successfully');
  };
  useEffect(() => {
    console.log('algo');
    const totalPrice = price * productAmount;
    dispatch(changeProductQuantity(userId, id, productAmount,
        totalPrice, stock));
  }, [productAmount]);
  return (
    <div className='cartProductGrid'>
      <img className='cartProductImage' src={image && image[0]} alt={name} />
      <div className='cartProductInfo'>
        <div className='cartProductName'>{name}</div>
        <div className='cartProductAmout'>
          { productAmount > 1 &&
          <button className='cartProductAmountDecrease'
            onClick={() => setProductAmount(productAmount - 1)}>
            -
          </button>
          }
          <p className='cartProductNumber'>{productAmount}</p>
          { productAmount < stock &&
            <button className='cartProductAmountIncrease'
              onClick={() => setProductAmount(productAmount + 1)}>
              +
            </button>
          }
        </div>
        <button className='cartProductDelete'
          onClick={handleDeleteProduct} ><i className='material-icons'>
            delete
          </i></button>
      </div>
    </div>
  );
};

export default CartProduct;
