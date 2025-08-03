import { useState } from "react"
import { GetIcon, GetTechIcon, GetIconButton } from "../Icon"
import { useSelector, useDispatch } from 'react-redux'
import { deleteProject } from "../../store/projectSlice"
import { useNotification } from '../../contexts/NotificationContext'
import { Typography, Card, Accordion, AccordionSummary, AccordionDetails, CardMedia, Box } from "@mui/material"


const sxProjectCard = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    pt: 2,
    mb: 3,
    // borderBottom: '1px solid #ddd',
    boxShadow: 'none',
    // border: '1px solid #ddd',
    // boxShadow: 2,
    background: 'transparent',
    // overflow: 'hidden',
  },
  projectNo: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    pr: 1,
  },
  projectImage: {
    width: '100%',
    height: 300,
    borderRadius: 2,
    border: '2px solid #eee',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'filter 0.5s ease',
    // filter: 'grayscale(100%)',
    // '&:hover': {
    //   filter: 'grayscale(0%) contrast(110%) saturate(110%)',
    // },
  },
  projectDetail: {
    display: 'flex',
    flexDirection: 'column',
  },
  projectTitleRow: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techList: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    cursor: 'cursor',
    pl: 1,
  },
  techIcon: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
  projectDesc: {
    fontSize: '1rem',
    m: 1,
    textAlign: 'left',
  },
}

const ProjectCard = ({ project, index, last }) => {
    const dispatch = useDispatch()
    const { showNotification } = useNotification()
    const user = useSelector(state => state.auth.user)
    const [expanded, setExpanded] = useState(last)

    const handleDelete = async () => {
      if (!user) return
      if (!window.confirm(`Are you sure you want to delete "${project.title}"?`)) return
      try {
        await dispatch(deleteProject(project.id)).unwrap()
        showNotification('info', `${project.title.charAt(0).toUpperCase() + project.title.slice(1)} deleted`)
      } catch (error) {
        showNotification('error', `Failed to delete: ${error.data.error}`)
      }
    }

    return (
        <Card sx={sxProjectCard.card}>

            <Box sx={sxProjectCard.projectNo}>
                {user && <GetIconButton title={`delete ${project.title}`} iconName='delete' onClick={handleDelete} />}
                <GetIconButton title='link: demo site' iconName='demolink' href={project.demoUrl} target='_blank' />
                <GetIconButton title='link: github repository' iconName='github' href={project.githubUrl} target='_blank' />
                <Typography variant="h5">&nbsp; {String(index + 1).padStart(2, '0')}</Typography>
            </Box>

            <CardMedia
                component="img"
                image={project.imagePath}
                alt={project.title}
                sx={sxProjectCard.projectImage}
            />

            <Accordion
                disableGutters
                expanded={expanded}
                onChange={(_, isExpanded) => setExpanded(isExpanded)}
                sx={{
                    boxShadow: 'none',
                    background: 'transparent',
                    '&:before': { display: 'none' },
                }}
            >
                <AccordionSummary
                    aria-controls={`project-desc-${index}`}
                    id={`project-title-${index}`}
                    sx={{ px: 0 }}
                    >

                    <Box sx={sxProjectCard.projectTitleRow} width="100%">
                        <Box sx={sxProjectCard.techList}>
                            {project.tech.map((tech) => (
                              <GetTechIcon key={tech.id} className={tech.icon} size={25} sx={sxProjectCard.techIcon} title={tech.name} />
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="h4"
                            sx={{ cursor: 'pointer', ml: 1 }}
                            title={project.title}
                          >
                            {project.title}
                          </Typography>
                          {expanded ? <GetIcon iconName='arrowUp' /> : <GetIcon iconName='arrowDown' />}
                        </Box>
                    </Box>

                </AccordionSummary>

                <AccordionDetails sx={{ px: 0 }}>
                    <Box sx={sxProjectCard.projectDesc}>
                        <Typography variant="body2">{project.description}</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Card>
    )
}

export { ProjectCard }