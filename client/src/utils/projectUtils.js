  export const validate = (formData, setErrors) => {
        const newErrors = {}
        if (!formData.title) newErrors.title = 'Title is required'
        if (!formData.description) newErrors.description = 'Description is required'
        if (!formData.tech.length) newErrors.tech = 'At least one tech is required'
        if (!formData.demoUrl) newErrors.demoUrl = 'Demo URL is required'
        if (!formData.githubUrl) newErrors.githubUrl = 'GitHub URL is required'
        if (!formData.image) newErrors.image = 'Image is required'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
  }

  export const prepData = (formData, user) => {
        const data = new FormData()
        data.append('title', formData.title)
        data.append('description', formData.description)
        data.append('demoUrl', formData.demoUrl)
        data.append('githubUrl', formData.githubUrl)
        data.append('user', user.id)
        data.append('image', formData.image)
        formData.tech.forEach(t => data.append('tech', t))
        return data
  }

  export const initialFormData = {
    title: '',
    description: '',
    tech: [],
    demoUrl: '',
    githubUrl: '',
    image: null,
}