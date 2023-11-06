import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { fadeAnimation, slideAnimation } from '../utils/motion';
import { useSnapshot } from 'valtio';
import state from '../store/store';
import EditButtons from '../components/EditButtons';
import ToggleButtons from '../components/ToggleButtons';
import ColorPicker from '../components/ColorPicker';
import FilePicker from '../components/FilePicker';
import BodyFilePicker from '../components/BodyFilePicker'
import { reader } from '../utils/helpers';


// import config from '../config/config'
// import { downloadCanvasToImage, reader } from '../config/helpers';
// import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
// import { fadeAnimation, slideAnimation } from '../config/motion';
// import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';



function Customizer() {

    const snap = useSnapshot(state);

    const [file, setFile] = useState('');

    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);

    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    })


    const EditorTabs = [
        {
            name: "colorpicker",
            title: "Change Color",
            icon: "AiFillEdit"

        },
        {
            name: "logopicker",
            title: "Choose Logo",
            icon: "AiFillEdit"
        },
        {
            name: "bodyImagePicker",
            title: "Apply Body Image",
            icon: "AiFillEdit"
        },
        {
            name: "backImagePicker",
            title: "Apply Back Image",
            icon: "AiFillEdit"
        },
    ];

    const FilterTabs = [
        {
            name: "logoShirt",
            title: "Toggle logo",
        },
        {
            name: "stylishShirt",
            title: " Toggle Body Image",
        },
    ];

    const DecalTypes = {
        logo: {
            stateProperty: "logoDecal",
            filterTab: "logoShirt",
        },
        full: {
            stateProperty: "fullDecal",
            filterTab: "stylishShirt",
        },
    };



    const generateTabContent = () => {
        switch (activeEditorTab) {
            case "colorpicker":
                return <ColorPicker />
            case "logopicker":
                return <FilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "bodyImagePicker":
                return <BodyFilePicker
                    file={file}
                    setFile={setFile}
                    readFile={readFile}
                />
            case "backImagePicker":
                return <div>Back Image</div>
            default:
                return null;
        }
    }


    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];

        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab]) {
            handleActiveFilterTab(decalType.filterTab)
        }
    }

    const readFile = (type) => {
        reader(file)
            .then((result) => {
                handleDecals(type, result);
                setActiveEditorTab("");
            })
    }

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case "logoShirt":
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case "stylishShirt":
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        // after setting the state, activeFilterTab is updated

        setActiveFilterTab((prevState) => {
            return {
                ...prevState,
                [tabName]: !prevState[tabName]
            }
        })
    }

    const activeStyles =  activeFilterTab ? {
        backgroundColor:snap.color, opacity:0.5
      } : {
        backgroundColor:"transparent", opacity:1
      };









    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className='absolute top-0 left-0 z-10'
                        {...slideAnimation('left')}
                    >
                        <div className=' flex flex-col items-center l min-h-screen py-8'>
                            <h1 className=' font-bold my-3 text-2xl'>Customize Here </h1>
                            <div className='editortabs-container flex flex-col'>
                                {EditorTabs.map((tab) => (
                                    <EditButtons
                                        key={tab.name}
                                        tab={tab}
                                        isEditorTab
                                        isActiveTab={activeFilterTab[tab.name]}
                                        handleClick={() => setActiveEditorTab(tab.name)}
                                        title={tab.title}
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>




                    {/* Back button */}
                    <motion.div className=' absolute z-10 top-5  right-5' {...fadeAnimation}>
                        <button className=' bg-[#dd5c18] border-none text-white font-semibold uppercase flex 
          items-center justify-center gap-3 mt-5 px-4 py-2.5' style={{ background: snap.defaultColor }} onClick={() => (state.intro = true)}>
                            BACK <AiOutlineArrowLeft size="1.3em" />
                        </button>
                    </motion.div>


                    {/* Download Button */}
                    <motion.div className=' absolute z-20 bottom-5 right-5' {...fadeAnimation}>
                        <button className=' bg-[#dd5c18] border-none text-white font-semibold uppercase flex 
          items-center justify-center gap-3 mt-5 px-4 py-2.5' style={{ background: snap.defaultColor }} onClick={() => {
                                const link = document.createElement('a')
                                link.setAttribute('download', 'canvas.png')
                                link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
                                link.click()
                            }}>
                            DOWNLOAD  <AiFillCamera size="1.3em" />
                        </button>
                    </motion.div>

                    {/* Filter Tabs */}
                    <motion.div
                        className=' filtertabs-container' {...slideAnimation('up')}
                    >
                        {/* <motion.div className='  flex flex-row gap-3 py-1 items-center justify-start ml-3 ' {...fadeAnimation}>

                            <button  className=' text-white  font-semibold text-sm flex items-center justify-center gap-3  rounded-full '  onClick={() => handleActiveFilterTab("logoShirt")} style={activeStyles}>
                                <AiOutlineHighlight color={snap.defaultColor} size="1.3em" /> Toggle logo
                            </button> 
                            <button  className=' text-white  font-semibold text-sm flex items-center justify-center gap-3  rounded-full '  onClick={() => handleActiveFilterTab("stylishShirt")} style={activeStyles}>
                                <AiOutlineHighlight color={snap.defaultColor} size="1.3em" /> Toggle Body Image
                            </button> 
                        </motion.div> */}
                        {FilterTabs.map((tab) => (
                            <ToggleButtons
                                key={tab.name}
                                tab={tab}
                                isFilterTab
                                isActiveTab={activeFilterTab[tab.name]}
                                handleClick={() => handleActiveFilterTab(tab.name)}
                                title={tab.title}
                            />
                        ))}
                    </motion.div>

                </>
            )}
        </AnimatePresence>
    )
}

export default Customizer;