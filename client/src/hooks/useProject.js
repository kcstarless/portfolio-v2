import projectServices from '../services/projectService'
import { useEffect, useState } from 'react'

const useProject = () => {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        projectServices.getAll().then(res => {
            setProjects(res)
        })
    }, [])

    const length = projects.length
    
    return { projects, length }
}

export default useProject