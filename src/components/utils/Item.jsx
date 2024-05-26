import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { StarIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import {
  setAddItemToCart,
  setOpenCart,
  setDecreaseItemQTY,
  setRemoveItemFromCart,
} from "../../app/CartSlice";
import annyang from "annyang";
import { toprateslaes } from "../../data/data.js";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Item = ({ ifExists, id, title, text, img, btn, rating, price }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isInCart, setIsInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const itemContainerRef = useRef(null);

  const controls = useAnimation();
  const [ref, inView, entry] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const images = [img];

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
      });
    } else {
      const direction =
        entry && entry.boundingClientRect.y < entry.rootBounds.y ? 50 : -50;
      controls.start({
        opacity: 0,
        y: direction,
        transition: { duration: 0.6 },
      });
    }
  }, [controls, inView, entry]);

  useEffect(() => {
    if (annyang) {
      const commands = {};
      for (let i = 1; i <= 24; i++) {
        commands[`number ${i}`] = () => addToCartHandler(i);
      }
      annyang.addCommands(commands);
      annyang.setLanguage("en-US");
      annyang.start({ autoRestart: true, continuous: true });

      annyang.addCallback("error", () => {
        annyang.start({ autoRestart: true, continuous: true });
      });
      annyang.addCallback("end", () => {
        annyang.start({ autoRestart: true, continuous: true });
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        itemContainerRef.current &&
        !itemContainerRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
        setIsShaking(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onAddToCart = (item) => {
    dispatch(setAddItemToCart(item));
    setIsInCart(true);
  };

  const onCartToggle = () => {
    dispatch(setOpenCart({ cartState: true }));
  };

  const toggleExpansion = () => {
    setIsExpanded(true);
    setIsShaking(true);
  };

  const addToCartHandler = (itemNumber) => {
    const selectedItem = toprateslaes.items[itemNumber - 1];
    if (selectedItem) {
      const item = {
        id: selectedItem.id,
        title: selectedItem.title,
        text: selectedItem.text,
        img: selectedItem.img,
        color: selectedItem.color,
        shadow: selectedItem.shadow,
        price: selectedItem.price,
      };
      onAddToCart(item);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    onAddToCart({ id, title, text, img, price });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(setDecreaseItemQTY(id));
    } else {
      setIsInCart(false);
      dispatch(setRemoveItemFromCart(id));
    }
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <motion.div
      ref={ref}
      className="relative w-80 h-auto mx-4 my-4"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      {isExpanded && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-filter backdrop-blur-lg z-50 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      )}
      <motion.div
        ref={itemContainerRef}
        className={`relative bg-white rounded-xl p-4 transition-transform duration-700 ease-in-out flex flex-col justify-between item-container ${
          ifExists ? "justify-items-start" : "justify-items-center"
        } ${isShaking ? "shake" : ""}`}
        style={{
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
          zIndex: isExpanded ? 100 : 0,
          borderRadius: "2rem",
        }}
        animate={{
          transform: isExpanded ? "scale(1.2)" : "scale(1)",
          height: isExpanded ? "28rem" : "24rem",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        onClick={(e) => {
          e.stopPropagation();
          toggleExpansion();
        }}
        onTransitionEnd={() => setIsShaking(false)}
        whileHover={{
          boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="relative flex justify-center items-center h-48">
        <motion.div
            className="absolute inset-0 bg-gray-200 opacity-75 rounded-xl"
            style={{ borderRadius: "20px 20px 8px 8px" }}
          />
          {!imageLoaded && (
            <Skeleton
              className="absolute inset-0 w-full h-full z-10"
              style={{
                borderRadius: "20px 20px 8px 8px",
              }}
              duration={1}
            />
          )}
          <motion.img
            src={images[currentImageIndex]}
            alt={`img/item-img/${id}`}
            className="absolute object-contain z-10 w-full h-full"
            style={{
              display: imageLoaded ? "block" : "none",
              borderRadius: "20px 20px 8px 8px",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            onLoad={() => setImageLoaded(true)}
          />
          <button
            onClick={prevImage}
            className="absolute left-[2%] top-1/2 transform -translate-y-1/2 bg-gray-300 p-1 rounded-full focus:outline-none transition-transform duration-300 ease-in-out hover:scale-110"
          >
            {"<"}
          </button>
          <button
            onClick={nextImage}
            className="absolute right-[2%] top-1/2 transform -translate-y-1/2 bg-gray-300 p-1 rounded-full focus:outline-none transition-transform duration-300 ease-in-out hover:scale-110"
          >
            {">"}
          </button>
        </div>
        <motion.h1
          className="text-lg font-medium text-gray-800 mt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {text}
        </motion.p>
        {isExpanded && (
          <motion.div
            className="mt-4 flex justify-around"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {[42, 43, 44, 45].map((size) => (
              <motion.button
                key={size}
                className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                  selectedSize === size
                    ? "bg-gradient-to-r from-[#ffa57e] to-[#d16f96] text-white"
                    : "bg-white text-gray-800"
                }`}
                onClick={() => handleSizeSelect(size)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {size}
              </motion.button>
            ))}
          </motion.div>
        )}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <motion.h1
              className="text-sm font-medium text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              ${price}
            </motion.h1>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <motion.h1
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {rating}
            </motion.h1>
          </div>
        </div>
        {isInCart ? (
          <div className="flex items-center justify-between mt-4">
            <motion.button
              className="p-3 bg-[#ff9d72] rounded-full text-white focus:outline-none"
              style={{ borderRadius: "15px" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={increaseQuantity}
            >
              <PlusIcon className="w-6 h-6" />
            </motion.button>
            <motion.h1
              className="text-lg font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {quantity}
            </motion.h1>
            <motion.button
              className="p-3 bg-[#d16f96] rounded-full text-white focus:outline-none"
              style={{ borderRadius: "15px" }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={decreaseQuantity}
            >
              <MinusIcon className="w-6 h-6" />
            </motion.button>
          </div>
        ) : (
          <div className="flex items-center justify-between mt-4">
            <motion.button
              className="w-full px-3 py-3 bg-gradient-to-r from-[#ffa57e] to-[#d16f96] border-0 rounded-lg text-white font-bold text-lg"
              style={{ borderRadius: "20px" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onAddToCart({
                  id,
                  title,
                  text,
                  img,
                  price,
                  size: selectedSize,
                });
              }}
              disabled={!selectedSize}
            >
              {btn}
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Item;
