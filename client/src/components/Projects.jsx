import useProject from "../hooks/useProject"
import { ProjectCard } from "./ProjectCard"

const Projects = () => {
    const { projects } = useProject()  // Get both projects and loading
    
    if (!projects) return <h1>Loading data...</h1>
    if (projects.length === 0) return <h1>No Data...</h1>

    return (
        <>
            <h1>Portfolio</h1>
            {projects.map(project => (
                <ProjectCard project={project} key={project.id}/>
            ))}            
        </>
    )
}

export default Projects