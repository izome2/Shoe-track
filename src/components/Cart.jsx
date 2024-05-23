import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import {
  selectCartItems,
  selectCartState,
  selectTotalAmount,
  selectTotalQTY,
  setClearCartItems,
  setCloseCart,
  setGetTotals
} from "../app/CartSlice.js";
import CartCount from "./cart/CartCount";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";
import annyang from 'annyang';

const Cart = () => {
  const dispatch = useDispatch();
  const ifCartState = useSelector(selectCartState);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [ifCartBackdropState, setIfCartBackdropState] = useState(false);

  useEffect(() => {
    dispatch(setGetTotals());

    if (annyang) {
      annyang.addCommands({
        'close my cart': () => {
          dispatch(setCloseCart({ cartState: false }));
        }
      });

      annyang.start({ autoRestart: true, continuous: true });

      annyang.addCallback('error', () => {
        annyang.start({ autoRestart: true, continuous: true });
      });

      annyang.addCallback('end', () => {
        annyang.start({ autoRestart: true, continuous: true });
      });
    }

    return () => {
      if (annyang) {
        annyang.abort();
      }
    };
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(setGetTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    if (ifCartState) {
      const timer = setTimeout(() => {
        setIfCartBackdropState(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIfCartBackdropState(false);
    }
  }, [ifCartState]);

  const onCartToggle = () => {
    dispatch(setCloseCart({ cartState: false }));
  };

  const onClearCartItems = () => {
    dispatch(setClearCartItems());
  };

  const applyDiscount = () => {
    if (coupon === "ahmed") {
      setDiscount(0.20);
      setCouponError('');
      setIsValidCoupon(true);
    } else {
      setDiscount(0);
      setCouponError('The coupon is invalid');
      setIsValidCoupon(false);
      setShakeKey(prevKey => prevKey + 1);
    }
  };

  const discountedTotal = totalAmount * (1 - discount);

  const shakeAnimation = {
    initial: { x: 0 },
    animate: { x: [-10, 10, -10, 10, -10, 0], transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 duration-500 w-full z-[250] ${
        ifCartState ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-8"
      }`}
    >
      <motion.div
        className={`fixed top-0 left-0 right-0 bottom-0 z-40 ${ifCartBackdropState ? "visible" : "invisible"}`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          opacity: ifCartBackdropState ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      ></motion.div>

      <div
        className={`blur-effect-theme duration-500 max-w-xl absolute right-8 transform scale-100 ${
          ifCartState ? "opacity-100 visible translate-x-0" : "opacity-0 invisible translate-x-8"
        }`}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.2)',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '90vh',
          borderRadius: '1.5rem',
          width: '95%'
        }}
      >
        <CartCount totalQTY={totalQTY} onCartToggle={onCartToggle} onClearCartItems={onClearCartItems} />
        {cartItems?.length === 0 ? (
          <CartEmpty onCartToggle={onCartToggle} />
        ) : (
          <div>
            <div className="flex items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
              {cartItems?.map((item, i) => (
                <CartItem key={i} item={item} />
              ))}
            </div>

            <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '1.5rem',
              }}>
              <div className="flex items-center justify-between">
                <h1 className="text-base font-semibold uppercase">Total :</h1>
                <h1 className="bg-[#0000000e] rounded-lg px-3 py-2 text-white-100 font-normal text-sm">${discountedTotal.toFixed(2)}</h1>
              </div>
              <div className="grid items-center gap-2">
                <p className="text-sm font-medium text-center">Do you have a discount coupon?</p>
                <div className="flex items-center justify-between w-full">
                  <motion.input
                    key={shakeKey}
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter (ahmed) to get a 20% discount!"
                    className={`input-theme px-3 py-2 rounded-lg text-black text-sm w-[290px] ${
                      isValidCoupon ? 'bg-green-200' : couponError ? 'bg-red-200' : 'bg-[#0000000e]'
                    }`}
                    style={{ outline: 'none' }}
                    {...(!isValidCoupon && couponError ? shakeAnimation : {})}
                  />
                  <button
                    type="button"
                    onClick={applyDiscount}
                    className="button-theme bg-gradient-to-b from-[#d46b95] to-[#ffa179] flex items-center justify-center text-white py-2 gap-3 text-base px-8 font-semibold rounded-2xl active:scale-120"
                  >
                    Apply Coupon
                  </button>
                </div>
                {couponError && <p className="text-red-500 text-xs italic">{couponError}</p>}
                <button type="button" className="button-theme bg-gradient-to-b from-[#ffa179] to-[#d46b95] flex items-center justify-center text-white py-3 gap-3 text-base px-8 font-semibold rounded-2xl active:scale-120">Buy Now!</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .blur-effect-theme {
            max-width: 100%;
            right: 5%;
            transform: translateY(-45%);
          }
          .button-theme {
            padding: 0.5rem 0.5rem;
            font-size: 0.75rem;
          }
          .input-theme {
            width: 70%;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default Cart;
