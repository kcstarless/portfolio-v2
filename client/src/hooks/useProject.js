import projectServices from '../services/project'
import { useEffect, useState } from 'react'

const useProject = () => {
    const [projects, setProjects] = useState([])
    
    useEffect(() => {
        projectServices.getAll().then(res => {
            setProjects(res)
        })
    }, [])

    return { projects }
}

export default useProject