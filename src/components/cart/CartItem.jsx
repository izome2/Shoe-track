import React from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setDecreaseItemQTY, setIncreaseItemQTY, setRemoveItemFromCart } from "../../app/CartSlice.js";

const CartItem = ({ item: { id, title, text, img, color, shadow, price, cartQuantity } }) => {
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(setRemoveItemFromCart({ id, title, text, img, color, shadow, price, cartQuantity }))
  }

  const onIncreaseItemQTY = () => {
    dispatch(setIncreaseItemQTY({ id, title, text, img, color, shadow, price, cartQuantity }))
  }
  const onDecreaseItemQTY = () => {
    dispatch(setDecreaseItemQTY({ id, title, text, img, color, shadow, price, cartQuantity }))
  }

  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex items-center gap-5">
          <div className={`bg-gradient-to-b ${color} ${shadow} relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}>
            <img src={img} alt={`img/cart-item/${id}`} className="w-36 h-auto object-fill lg:w-28" />
            <div className='absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded'>${price}</div>
          </div>
          <div className="grid items-center gap-4">
            <div className="grid items-center leading-none">
              <h1 className="font-medium text-lg text-slate-900 lg:text-sm">{title}</h1>
              <p className="text-sm text-slate-800 lg:text-xs">{text}</p>
            </div>
            <div className="flex items-center justify-around w-full">
              <button type="button" onClick={onDecreaseItemQTY} className="button-theme bg-gradient-to-b from-[#ffa179] to-[#d46b95] flex items-center justify-center text-slate-900 py-2 gap-3 text-base px-2 font-semibold rounded-2xl active:scale-110">
                <MinusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
              </button>
              <div className="button-theme bg-gradient-to-b from-[#ffa179] to-[#d46b95] flex items-center justify-center text-white py-2 gap-3 text-base px-4 font-semibold rounded-2xl active:scale-110">{cartQuantity}</div>
              <button type="button" onClick={onIncreaseItemQTY} className="button-theme bg-gradient-to-b from-[#ffa179] to-[#d46b95] flex items-center justify-center text-slate-900 py-2 gap-3 text-base px-2 font-semibold rounded-2xl active:scale-110">
                <PlusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-5">
          <div className="grid items-center justify-center">
            <h1 className="text-lg lg:text-base text-slate-900 font-medium">${price * cartQuantity}</h1>
          </div>
          <div className="grid items-center justify-center">
            <button type="button" className="button-theme bg-gradient-to-b from-[#ffa179] to-[#d46b95] text-slate-900 py-2 gap-3 text-base px-2 font-semibold rounded-xl active:scale-110"style={{ transform: 'translateY(8px)' }} onClick={onRemoveItem}>
              <TrashIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
