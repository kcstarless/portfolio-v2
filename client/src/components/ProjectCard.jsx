import { Typography, Card, Accordion, AccordionSummary, AccordionDetails, CardMedia, Box, Link } from "@mui/material"
import { getTechIcon } from "../utils/helper"
import { SiGithub } from "react-icons/si"

const cardStyle = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    p: 2,
    mb: 3,
    borderBottom: '1px solid #ddd',
    boxShadow: 'none',
    // border: '1px solid #ddd',
    // boxShadow: 2,
    // background: '#fff',
    // overflow: 'hidden',
  },
  projectNo: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 1,
  },
  projectImage: {
    width: '100%',
    height: 300,
    borderRadius: 2,
    border: '1px solid #eee',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techList: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
  },
  techIcon: {
    filter: 'grayscale(100%)',
    transition: 'filter 0.5s ease',
    '&:hover': {
      filter: 'grayscale(0%) contrast(120%) saturate(120%)',
    },
  },
  projectDesc: {
    fontSize: '1rem',
    mt: 1,
    mb: 1,
    textAlign: 'left',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    alignSelf: 'end',
    mt: 1,
  },
  linkArrow: {
    color: 'primary.main',
    fontSize: 24,
    ml: 0.5,
  },
}

const ProjectCard = ({ project, index }) => {
    return (
        <Card sx={cardStyle.card}>
            <Box sx={cardStyle.projectNo}>
                <Box sx={cardStyle.link}>
                    <Link href={project.githubUrl} target="_blank" title="Github repository">
                        <SiGithub style={{ width: 25, height: 25 }} />
                    </Link>
                </Box>
                <Typography variant="h5">{String(index + 1).padStart(2, '0')}</Typography>
            </Box>

            <Link href={project.demoUrl} target="_blank" underline="none" sx={{ display: 'block' }}>
            <CardMedia
                component="img"
                image={project.imagePath}
                alt={project.title}
                sx={cardStyle.projectImage}
            />
            </Link>

            <Accordion
                disableGutters
                sx={{
                    boxShadow: 'none',
                    background: 'transparent',
                    '&:before': { display: 'none' },
                }}
            >
                <AccordionSummary
                    aria-controls={`project-desc-${index}`}
                    id={`project-title-${index}`}
                    sx={{
                        px: 0,
                    }}
                    >

                    <Box sx={cardStyle.projectTitleRow} width="100%">
                        <Typography
                            variant="h6"
                            sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                            title={project.description}
                        >
                            {project.title}
                        </Typography>
                        <Box sx={cardStyle.techList}>
                            {project.tech.map((tech) => {
                            const Icon = getTechIcon(tech.icon)
                            return Icon ? (
                                <Box key={tech.id} sx={cardStyle.techIcon}>
                                <Icon style={{ width: 30, height: 30 }} />
                                </Box>
                            ) : null
                            })}
                        </Box>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 0 }}>
                    <Box sx={cardStyle.projectDesc}>
                        <Typography variant="body2">{project.description}</Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Card>
    )
}

export default ProjectCard