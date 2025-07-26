import useProject from "../hooks/useProject"
import { ProjectCard } from "./ProjectCard"
import { Box, Typography } from "@mui/material"

const style = {
    pageTitle: {
        borderBottom: '2px solid red',
        width: '100%',
        textAlign: 'right',
    }
    
}

const Projects = () => {
    const { projects } = useProject()

    if (!projects) return <Typography variant="h5">Loading data...</Typography>
    if (projects.length === 0) return <Typography variant="h5">No Data...</Typography>

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={style.pageTitle}>Portfolio</Typography>
            {projects.slice().reverse().map((project, index) => 
                <ProjectCard
                    project={project}
                    index={projects.slice().reverse().length - 1 - index} // <-- this will display the correct number
                    key={project.id}
                />
            )}
        </Box>
    )
}

export { Projects }