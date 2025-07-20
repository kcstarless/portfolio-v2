import useProject from "../hooks/useProject"

const Projects = () => {
    console.log("🔴 Projects component rendering...")
    const { projects } = useProject()  // Get both projects and loading
    
    if (!projects) return <h1>Loading data...</h1>
    if (projects.length === 0) return <h1>No Data...</h1>

    return (
        <>
            {projects.map(project => (
                <div key={project.id}>{project.title}</div>
            ))}            
        </>
    )
}

export default Projects