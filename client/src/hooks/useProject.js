import projectServices from '../services/project'
import { useEffect, useState } from 'react'

const useProject = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        projectServices.getAll().then(res => {
            setProjects(res)
        })
    }, [])

    console.log(projects)
    return { projects }
}

export default useProject