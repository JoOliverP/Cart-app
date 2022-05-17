import { useState, useEffect } from 'react';
import Button from './Button';

import './Cart.css';
import ApiAbaixo from '../api/abaixo-10-reais.json';
import ApiAcima from '../api/acima-10-reais.json';

export default function Cart() { 
   const [isChecked, setIsChecked] = useState(false);
   const [items, setItems] = useState([]);
   const [total, setTotal] = useState(0);

   useEffect(() => {
      let total = 0;

      if (isChecked) {
         setItems([...ApiAcima.items]);

         ApiAcima.items.map((item) => {
            total = total + ((item.price / 100) * item.quantity);
         });
      } else {
         setItems([...ApiAbaixo.items]);

         ApiAbaixo.items.map((item) => {
            total = total + ((item.price / 100) * item.quantity);
         });
      }

      setTotal(total);
   }, [isChecked]);

   // console.log(totalAbaixo)
   function handleOnChange () {
      setIsChecked(!isChecked);
   };
   
   return (
      <div className="container">
         <h1 className='container__title'>Meu Carrinho</h1>
         <label>
            <input 
               type="checkbox" 
               style={{marginRight: 10}} 
               checked={isChecked}
               onChange={handleOnChange}
               />
            Acima de R$ 10
         </label>

         {items.map(item => {
            return (
               <div className='container__item' key={item.id}>
                  <img className='imgDoce' src={item.imageUrl}/>
                  <div className='info__item'>
                     <h1 className='title__item'>{`${item.name[0].toUpperCase() + item.name.slice(1,16).toLowerCase()}`}</h1>
                     <p className='price__item1'>{(item.sellingPrice/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                     <p className='price__item'>{(item.price/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
                  </div>
               </div>
            )
         })}

       
         <div className='container__total'>
            <p>Total</p>
            <p>{total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
         </div>

         {!isChecked && total > 10 ? (
            <span className='info__shipping'>Parabéns, sua compra têm frete grátis</span>
         ) : (
            <></>
         )}
         <Button />
      </div>
   );
}