import React from 'react'
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';

import { motion } from 'framer-motion';
import { slideAnimation } from '../utils/motion';
import state from '../store/store';

const ColorPicker = () => {
  const snap = useSnapshot(state)
  return (
    <motion.div className=' absolute left-full ml-10 ' {...slideAnimation('left')}>
      <SketchPicker
      
      color={snap.color}
      disableAlpha
      onChange={(color) => state.color = color.hex}
        presetColors={["#ccc",  "#353934"]}
       />


<motion.div className='absolute -bottom-32  z-10 items-center justify-center hidden sm:flex flex-col'  {...slideAnimation('top')}>
            <p className=' text-sm font-semibold my-2'>Preset Colors</p>
          <div className="color-options">
        {snap.colors.map((color) => (
          <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
        ))}
      </div>
          </motion.div>

    </motion.div>
  )
}

export default ColorPicker