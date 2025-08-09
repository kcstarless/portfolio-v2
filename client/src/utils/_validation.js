export const validateProject = (formData, setErrors) => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Title is required'
    if (!formData.description) newErrors.description = 'Description is required'
    if (!formData.tech.length) newErrors.tech = 'At least one tech is required'
    if (!formData.demoUrl) newErrors.demoUrl = 'Demo URL is required'
    if (!formData.githubUrl) newErrors.githubUrl = 'GitHub URL is required'
    //   if (!formData.image) newErrors.image = 'Image is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
}

export const validateTech = (formData, setErrors) => {
    const newErrors = {}
    if (!formData.name) newErrors.name = "Tech name is required"
    if (!formData.icon) newErrors.icon = "Icon name is required"
    if (!formData.level) newErrors.level = "Level is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
}
