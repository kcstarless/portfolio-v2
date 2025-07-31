import { Stack, Typography, Box } from "@mui/material"
import { useSelector } from 'react-redux'
import { GetTechIcon } from "../Icon"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const sxTechInfo = {
  stack: {
    gap: 3,
    alignItems: 'center',
    width: '100%',
  },
  techBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100, // controls vertical space for animation
  }
}

const TechInfo = () => {
    const techs = useSelector(state => state.techs.items)
    const status = useSelector(state => state.techs.status)
    const [index, setIndex] = useState(0)
    
    // Rotate every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % techs.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [techs.length])

    if (!techs || techs.length === 0 || status !== 'succeeded') {
        return null // or a loading spinner, etc.
    }

    const currentTech = techs[index]

    return (
        <Stack sx={sxTechInfo.stack}>
            <Typography variant="h6">
                My Stack | Technologies
            </Typography>
            <Box sx={sxTechInfo.techList}> 
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentTech.name}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box sx={sxTechInfo.techBox}>
                            <GetTechIcon
                                title={currentTech.name}
                                className={currentTech.icon}
                                size={40}
                            />
                            <Typography variant='h5'>
                                {currentTech.name}
                            </Typography>
                        </Box>
                        <Typography fontSize={'1.5rem'}>
                            {/* {currentTech.level} */}
                        </Typography>
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Stack>
    )
}

export { TechInfo }