import React from 'react'
import { motion } from 'framer-motion'
import { fadeAnimation } from '../utils/motion'
// import { getContrastingColor } from '../utils/helpers'
import { AiFillEdit,AiOutlineCloseSquare, AiOutlineCheck, AiOutlineBgColors} from 'react-icons/ai'
// import {  RiShirtFill,  } from 'react-icons/ri'
// import {  LuShirt,  } from 'react-icons/lu'
import state from '../store/store'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from 'react-color/lib/helpers/color';


const EditButtons = ({tab, title, handleClick, isEditorTab, isFilterTab, isActiveTab,}) => {
    const snap = useSnapshot(state)

    const activeStyles = isEditorTab && isActiveTab ? {
      backgroundColor:snap.defaultBgColor, opacity:0.5
    } : {
      backgroundColor:snap.defaultBgColor, opacity:1
    };

    const setIcon = (tabName) => {
      if (tabName === 'logoShirt'){
        return <AiOutlineCloseSquare color={snap.defaultColor} size="1.3em" />
      }else if (tabName === 'stylishShirt'){
        return <AiOutlineCloseSquare color={snap.defaultColor} size="1.3em" />
      }else {
        <AiFillEdit color={snap.defaultColor} size="1.3em" />
      }
      // switch (tabName) {
      //     case "logoShirt":
      //       <AiOutlineCloseSquare color={snap.defaultColor} size="1.3em" />
      //         break;
      //     case "stylishShirt":
      //       <AiOutlineCheck color={snap.defaultColor} size="1.3em" />
      //         break;
      //     default:
      //       <AiFillEdit color={snap.defaultColor} size="1.3em" />
      //         break;
      
      // }
    }

  return (
    <motion.div className='  flex flex-row gap-3 py-1 items-center justify-start ml-3 ' {...fadeAnimation}>
            {/* <div className=' flex flex-1'>{title}</div> */}
            <button key={tab.name} className=' text-white  font-semibold text-sm flex
          items-center justify-center gap-3  rounded-full '  onClick={handleClick} style={activeStyles}>
            <AiFillEdit color={snap.defaultColor} size="1.3em" />
            </button> <p className=' text-base font-bold'>{title}</p>
        </motion.div>
  )
  
}

export default EditButtons

