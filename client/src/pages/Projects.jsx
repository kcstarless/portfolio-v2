import useProject from "../hooks/useProject"

const Projects = () => {
    const { projects } = useProject()  // Destructure the object
    
    if (!projects || projects.length === 0) return <h1>Loading or no data...</h1>

    return (
        <>
            {projects.map(project => (
                <div key={project.id}>{project.title}</div>
            ))}            
        </>
    )
}

export default Projects