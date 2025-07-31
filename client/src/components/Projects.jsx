import { ProjectCard } from "./ProjectCard";
import { Box, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../store/projectSlice';
import { useEffect } from 'react';

const sxProjects = {
  pageTitle: {
    width: '100%',
    textAlign: 'right',
  },
};

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.items);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (!projects) {
    return <Typography variant="h5">Loading data...</Typography>;
  }

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
          />
        ))}
    </Box>
  );
};

export { Projects };
