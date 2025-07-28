export const capitalize = (str) => {
    // Replace spaces and dots with nothing for capitalization
    const noSpacesDots = str.replace(/[\s.]+/g, '')
    return noSpacesDots.charAt(0).toUpperCase() + noSpacesDots.slice(1)
}

export const getIconName = (name) => {
    if (!name) return ''
    const normalized = name.replace(/\./g, 'dot').replace(/\s+/g, '')
    return `Si${capitalize(normalized)}`
}

export const searchIcons = (search, SiIcons) => {
    return Object.keys(SiIcons)
        .filter(key => key.toLowerCase().includes(search))
        .slice(0, 10)
}

export const initialFormData = {
    name: '',
    icon: '',
    level: '',
}

export const levels = [
  { value: 'novice', label: 'Novice' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
]



export const validate = (formData, setErrors) => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Tech name is required"
    if (!formData.icon) newErrors.icon = "Icon name is required"
    if (!formData.level) newErrors.level = "Level is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
}
