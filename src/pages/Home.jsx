import React from 'react'
import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation } from '../utils/motion';
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio';
import { motion, AnimatePresence } from 'framer-motion';
import state from '../store/store';
import { Logo } from '@pmndrs/branding'



const Home = () => {

    const snap = useSnapshot(state)
    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className='home' {...slideAnimation('left')}>
                    <motion.header {...slideAnimation('down')} className=''>
                        <img src='./GH.png' alt='logo' className=' jus w-20 h-20 object-contain' />
                        {/* <motion.div className=' absolute right-0 top-0' animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} {...slideAnimation('right')}>
                            <AiOutlineShopping size="3em" />
                        </motion.div> */}
                    </motion.header>

                    <motion.div className='home-content' {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className='head-text'>FitFashion <br className='xs:block hidden' /></h1>
                        </motion.div>

                        <motion.div {...headContentAnimation}>
                            <p className=' max-w-md font-normal text-gray-600 text-base'>
                                Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
                            </p>
                            <button className=' bg-[#dd5c18] border-none text-white font-semibold uppercase flex items-center justify-center gap-3 mt-5' style={{ background: snap.defaultColor }} onClick={() => (state.intro = false)}>
                                CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                            </button>
                        </motion.div>

                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home