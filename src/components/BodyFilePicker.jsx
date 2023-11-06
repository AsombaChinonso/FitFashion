import { motion } from 'framer-motion'
import React from 'react'
import { slideAnimation } from '../utils/motion'
import { useSnapshot } from 'valtio'
import state from '../store/store'
import { AiOutlineArrowLeft } from 'react-icons/ai'



const BodyFilePicker = ({ file, setFile, readFile }) => {
  const snap = useSnapshot(state)
  return (
    <motion.div className='absolute left-full ml-10 filepicker-container' {...slideAnimation('left')}>
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === '' ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <button className=' bg-[#dd5c18] border-none text-white font-semibold uppercase flex 
          items-center justify-center gap-3 mt-5 px-4 py-2.5 text-sm' style={{ background: snap.defaultColor }} onClick={() => readFile('full')}>
          Apply Image to Body
        </button>


        {/* <CustomButton
          type="outline"
          title="Apply as Logo"
          handleClick={() => readFile('logo')}
          customStyles="text-xs"
        /> */}
        {/* <CustomButton 
          type="filled"
          title="Apply Full Body"
          handleClick={() => readFile('full')}
          customStyles="text-xs"
        /> */}
      </div>
    </motion.div>
  )
}

export default BodyFilePicker;