import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { createTech, deleteTech } from "../store/techSlice"
import { useNotification } from '../contexts/NotificationContext'
import { GetTechIcon, GetIcon } from "./Icon"
import * as utils from "../utils/techUtils"
import * as SiIcons from "react-icons/si"
import {
  Button,
  TextField,
  Box,
  Typography,
  Tooltip,
} from '@mui/material'
import { palette } from "../styles/theme"

const styles = {
  formBox: { display: 'flex', flexDirection: 'column', gap: 2 },
  iconResultsBox: { display: 'flex', flexWrap: 'wrap', gap: 2, mb: 0, minHeight: 70, alignSelf: 'center' },
  currentTechsBox: { display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 },
  iconBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    border: '2px solid',
    borderRadius: 1,
    p: 1,
    m: 1,
  },
  iconBoxSelected: {
    borderColor: palette.primary.main,
  },
  iconBoxUnselected: {
    borderColor: 'transparent',
  },
  fadedText: { opacity: 0.7, alignSelf: 'center' },
}

const initialFormData = {
    name: '',
    icon: '',
}

const TechForm = ({ user, onSuccess }) => {
    const dispatch = useDispatch()
    const { showFormNotification } = useNotification()

    const [formData, setFormData] = useState(initialFormData)
    const [iconResults, setIconResults] = useState([])
    const [hoveredTech, setHoveredTech] = useState(null)

    const currentTechs = useSelector(state => state.techs.items)

    function renderSearchedTechs() {
        if (iconResults.length === 0) {
           return <Typography sx={styles.fadedText}>Please search your stack from above.</Typography>
        }

        return iconResults.map((iconKey) => {
            const isSelected = formData.icon === iconKey
            return (
                <Box
                    key={iconKey}
                    sx={{
                        ...styles.iconBox,
                        ...(isSelected ? styles.iconBoxSelected : styles.iconBoxUnselected)
                    }}
                    onClick={() => setFormData({ ...formData, icon: iconKey })}
                >
                    <GetTechIcon techName={iconKey} />
                </Box>
            )
        })
    }

    function renderCurrentTechs() {
        if (currentTechs.length === 0) {
            return <Typography sx={styles.fadedText}>No technologies added yet.</Typography>
        }

        return currentTechs.map((tech) => (
            <Box
                key={tech.icon}
                sx={{ ...styles.iconBox, ...styles.iconBoxUnselected, minWidth: 60 }}
                onMouseEnter={() => setHoveredTech(tech.icon)}
                onMouseLeave={() => setHoveredTech(null)}
            >
                {hoveredTech === tech.icon ? (
                    <Tooltip title={`delete ${tech.name}`}>
                    <GetIcon type='delete' size='30'
                        color={palette.secondary.main} 
                        onClick={() => handleDelete(tech.id || tech._id, tech.name)} />
                    </Tooltip>
                ) : (
                    <GetTechIcon techName={tech.icon} color={palette.primary.main} />
                )}
            </Box>
        ));
    }

    const handleChange = (field) => (e) => {
        const value = e.target.value
        if (field === 'name') {
            setFormData({ ...formData, name: value, icon: '' })

            const search = value.replace(/\./g, 'dot').replace(/\s+/g, '').toLowerCase()
            setIconResults(utils.searchIcons(search, SiIcons))
        } else {
            setFormData({ ...formData, [field]: value })
        }
    }
    const handleDelete = async (id, name) => {
        try {
            await dispatch(deleteTech(id)).unwrap()
            showFormNotification('info', `${utils.capitalize(name)} deleted`)
        } catch (error) {
            showFormNotification('error', `Failed to delete: ${error.data.error}`)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!utils.validate(formData, showFormNotification)) return

        try {
            await dispatch(createTech(formData)).unwrap()
            setFormData(initialFormData)
            setIconResults([])
            showFormNotification('info', `${formData.name} added to your techology list`)
            // if(onSuccess) onSuccess()
        } catch (error) {
            // console.log(error)
            showFormNotification('error', `Failed to add: $ ${error.data.error}`)
        }
    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={styles.formBox}
            onSubmit={handleSubmit}
        >
            <TextField
                label="Technology Stack"
                value={formData.name}
                onChange={handleChange('name')}
            />

            <Box sx={styles.iconResultsBox}>
                {renderSearchedTechs()}
            </Box>

            <Box sx={styles.currentTechsBox}>
                {renderCurrentTechs()}
            </Box>

            <Button type="submit" variant="contained" color="primary">
                Add New Tech
            </Button>
        </Box>
    )
}

export { TechForm }