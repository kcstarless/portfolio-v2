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


export const validate = (formData, showFormNotification) => {
    let valid = true
    if (!formData.name) {
        showFormNotification('error', 'Technology name is required')
        valid = false
    }
    if (!formData.icon) {
        showFormNotification('error', 'Must select a valid tech icon')
        valid = false
    }
    return valid
}
