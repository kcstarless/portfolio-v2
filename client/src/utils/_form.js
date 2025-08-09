export const projectFormData = {
    title: '',
    description: '',
    tech: [],
    demoUrl: '',
    githubUrl: '',
    image: null,
}

export const techFormData = {
    name: '',
    icon: '',
    level: '',
    comments: '',
}

export const techLevels = [
  { value: 'novice', label: 'Novice' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'expert', label: 'Expert' },
]

export const prepareProjectData = (formData, user) => {
    const data = new FormData()

    if (formData.id) {
        data.append('id', formData.id)
    }

    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('demoUrl', formData.demoUrl)
    data.append('githubUrl', formData.githubUrl)
    data.append('user', user.id)

    if (formData.image) {
        data.append('image', formData.image)
    }
    
    formData.tech.forEach(t => {
        data.append('tech', t)
    })
    
    return data
}

