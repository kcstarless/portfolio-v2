

export const ProjectCard = ({ project }) => {
    return (
        <>
            <div key={project.id}>
                <p>{project.projectNo}</p>
                <p>{project.title}</p>
                <p>{project.description}</p>
                <p></p>
            </div>
        </>
    )
}

