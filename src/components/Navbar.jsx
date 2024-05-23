import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalQTY, setOpenCart } from '../app/CartSlice.js';
import { HeartIcon, MagnifyingGlassIcon, ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import annyang from 'annyang';
import './Navbar.css';

const Navbar = () => {
    const [navActive, setNavActive] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const totalQTY = useSelector(selectTotalQTY);

    useEffect(() => {
        const handleScroll = () => {
            setNavActive(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onCartToggle = useCallback(() => {
        dispatch(setOpenCart({ cartState: true }));
    }, [dispatch]);

    const scrollToPosition = useCallback(() => {
        window.scrollTo({
            top: 1400,
            behavior: 'smooth'
        });
        setNavActive(true);
    }, []);

    useEffect(() => {
        const commands = {
            'start shopping': scrollToPosition,
            'open my cart': onCartToggle
        };

        annyang.addCommands(commands);
        annyang.start();

        return () => {
            annyang.abort();
        };
    }, [scrollToPosition]);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const menuVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <motion.header
                className={`fixed top-5 right-5 w-auto h-auto flex items-center justify-center z-[200] mobile-only`}
            >
                <motion.button
                    onClick={toggleMenu}
                    className="p-2 rounded-full bg-[#ffffffe8] shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <Bars3Icon className="h-6 w-6 text-black" />
                </motion.button>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[199] flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.nav
                            className="bg-[#fffffff5] rounded-lg shadow-lg p-6 flex flex-col items-center"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={menuVariants}
                            transition={{ duration: 0.3 }}
                            style={{ width: '80%', borderRadius: '30px' }}
                        >
                            <img
                                src={logo}
                                alt="logo/img"
                                className={`w-28 h-auto mb-4 logo-img ${navActive ? "filter brightness-0" : ""}`}
                            />
                            <motion.button
                                className="start-shopping-button"
                                onClick={scrollToPosition}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Start shopping →
                                <div className="startShoppingGlow"></div>
                            </motion.button>

                            <motion.button
                                onClick={() => setMenuOpen(false)}
                                className="nav-button"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Men
                            </motion.button>
                            <motion.button
                                onClick={() => setMenuOpen(false)}
                                className="nav-button"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Woman
                            </motion.button>
                            <motion.button
                                onClick={() => setMenuOpen(false)}
                                className="nav-button"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Offers
                            </motion.button>
                            <motion.button
                                onClick={() => setMenuOpen(false)}
                                className="nav-button"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                About
                            </motion.button>
                            <motion.button
                                type='button'
                                onClick={onCartToggle}
                                className='border-none outline-none active:scale-110 transition-all duration-300 relative mb-4'
                                whileHover={{ scale: 1.1 }}
                            >
                                <ShoppingBagIcon className={`icon-style ${navActive ? "text-slate-900 transition-all duration-300" : ""}`} />
                                <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${navActive ? 'bg-slate-900 text-white shadow-slate-900' : 'bg-slate-100 text-white shadow-slate-100'}`} style={{ color: navActive ? "#FFF" : "#000" }}>{totalQTY}</div>
                            </motion.button>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.header
                className={`desktop-nav fixed top-5 left-1/2 transform -translate-x-1/2 w-[80%] h-[6vh] flex items-center justify-center opacity-100 z-[200] ${navActive ? 'blur-effect-theme' : 'absolute top-7 left-0 right-0 opacity-100 z-50'}`}
                style={{ borderRadius: '20px', boxShadow: `${navActive ? '0px 2px 8px 0px rgba(0, 0, 0, 0.3)' : 'none'}`, backdropFilter: `${navActive ? 'blur(18px)' : 'none'}` }}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <nav className='flex items-center justify-between nike-container'>
                    <div className='flex items-center'>
                        <img
                            src={logo}
                            alt="logo/img"
                            className={`w-28 h-auto ${navActive ? "filter brightness-0" : ""}`}
                        />
                    </div>
                    <div className='flex items-center gap-20'>
                        <div>
                            <motion.button
                                onClick={() => onTabClick("Men")}
                                className="nav-button"
                                style={{ color: navActive ? '#000' : '#FFF' }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Men
                            </motion.button>
                        </div>
                        <div>
                            <motion.button
                                onClick={() => onTabClick("Woman")}
                                className="nav-button"
                                style={{ color: navActive ? '#000' : '#FFF' }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Woman
                            </motion.button>
                        </div>
                        <div>
                            <motion.button
                                onClick={() => onTabClick("offers")}
                                className="nav-button"
                                style={{ color: navActive ? '#000' : '#FFF' }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                Offers
                            </motion.button>
                        </div>
                        <div>
                            <motion.button
                                onClick={() => onTabClick("About")}
                                className="nav-button"
                                style={{ color: navActive ? '#000' : '#FFF' }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                About
                            </motion.button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="startShoppingContainer" style={{ position: 'relative', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: navActive ? 'black' : 'white', borderRadius: '999px', height: '40px', padding: '0 15px', display: navActive ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', marginRight: '20px' }} onClick={scrollToPosition}>
                            Start shopping →
                            {!navActive && <div className="startShoppingGlow"></div>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '20px' }}>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <MagnifyingGlassIcon className={`icon-style ${navActive ? "text-slate-900 transition-all duration-300" : ""}`} />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <HeartIcon className={`icon-style ${navActive ? "text-slate-900 transition-all duration-300" : ""}`} />
                            </motion.div>
                            <motion.button
                                type='button'
                                onClick={onCartToggle}
                                className='border-none outline-none active:scale-110 transition-all duration-300 relative'
                                whileHover={{ scale: 1.1 }}
                            >
                                <ShoppingBagIcon className={`icon-style ${navActive ? "text-slate-900 transition-all duration-300" : ""}`} />
                                <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${navActive ? 'bg-slate-900 text-white shadow-slate-900' : 'bg-slate-100 text-white shadow-slate-100'}`} style={{ color: navActive ? "#FFF" : "#000" }}>{totalQTY}</div>
                            </motion.button>
                        </div>
                    </div>
                </nav>
            </motion.header>
        </>
    );
}

export default Navbar;
