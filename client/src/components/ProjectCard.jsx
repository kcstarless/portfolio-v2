import { Typography, Card, Accordion, AccordionSummary, AccordionDetails, CardMedia, Box, Link, Tooltip } from "@mui/material"

import { useState } from "react";
import { GetIcon, GetTechIcon } from "./Icon";


const cardStyle = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    pt: 2,
    mb: 3,
    // borderBottom: '1px solid #ddd',
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
    const [expanded, setExpanded] = useState(false)

    return (
        <Card sx={cardStyle.card}>
            <Box sx={cardStyle.projectNo}>
                <Box sx={cardStyle.link}>
                  <Tooltip title='link: demo site'>
                    <Link href={project.demoUrl} target="_blank" underline="none" sx={{ display: 'block' }}>
                      <GetIcon type='demolink' />
                    </Link>
                  </Tooltip>
                  <Tooltip title='link: github repository'>
                    <Link href={project.githubUrl} target="_blank">
                        <GetIcon type="github" />
                    </Link>
                  </Tooltip>
                </Box>
                <Typography variant="h5">{String(index + 1).padStart(2, '0')}</Typography>
            </Box>

            <CardMedia
                component="img"
                image={project.imagePath}
                alt={project.title}
                sx={cardStyle.projectImage}
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
                    // expandIcon={<FcExpand size={25}/>}
                    sx={{
                        px: 0,
                    }}
                    >

                    <Box sx={cardStyle.projectTitleRow} width="100%">

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {expanded ? <GetIcon type='arrowUp' /> : <GetIcon type='arrowDown' />}
                          <Typography
                            variant="h6"
                            sx={{ cursor: 'pointer', fontWeight: 'bold', ml: 1 }}
                            title={project.description}
                          >
                            {project.title}
                          </Typography>
                        </Box>
          
                        <Box sx={cardStyle.techList}>
                            {project.tech.map((tech) => (
                                <Box key={tech.id} sx={cardStyle.techIcon}>
                                  <GetTechIcon techName={tech.icon} />
                                </Box>
                            ))}
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

export { ProjectCard }