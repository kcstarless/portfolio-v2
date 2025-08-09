import { ProjectCard } from "components/projects/ProjectCard"
import { Box, Typography, Divider } from "@mui/material"
import { useSelector } from 'react-redux'

const sxProjects = {
  pageTitle: {
    width: '100%',
    textAlign: 'right',
  },
}

const Projects = () => {
  const projects = useSelector((state) => state.projects.items)

  if (projects.length === 0) {
    return <Typography variant="h5">No projects yet! time to get busy!</Typography>;
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom sx={sxProjects.pageTitle}>
        portfolio
      </Typography>
      <Divider />
      {projects
        .slice()
        .reverse()
        .map((project, index, reversed) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={reversed.length - 1 - index}
            last={ index === 0}
          />
        ))}
    </Box>
  )
}

export { Projects }
