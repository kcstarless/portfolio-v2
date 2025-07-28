import { Box, Avatar, Typography, Stack, Divider, Paper } from '@mui/material';

const sxSidebar = {
  root: {
    minHeight: '100%',
    bgcolor: 'background.paper',
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 0,
  },
  stack: {
    gap: 2,
    alignItems: 'center',
    width: '100%',
  },
  
  nameText: {
    textTransform: 'lowercase',
  },
  avatar: {
    width: 150,
    height: 150,
  },
  box: {
    textAlign: 'center',
    gap: 1,
  },
  role: {
    fontWeight: 'bold',
    pb: 1,
  },
  description: {
    mt: 1,
    textAlign: 'left',
  },
  divider: {
    my: 2,
  },
};

const info = {
  name: 'david gim',
  role: 'FS | Software | Developer',
  description: `My portfolio reflects my ongoing journey as a web developer — from building simple static pages to developing full-stack applications with dynamic features and clean, reusable code. Each project showcases how I've grown in both front-end and back-end development, improving not just in technical skills but also in problem-solving and user-focused design. I've worked with real-world APIs, learned to structure scalable apps, and adopted modern tools and frameworks to enhance both performance and maintainability. It''s a clear snapshot of my progression and commitment to becoming a well-rounded developer.`
}

const Sidebar = () => (
  <Paper elevation={0} sx={sxSidebar.root}>
    <Stack sx={sxSidebar.stack}>
      <Typography variant="h3" sx={sxSidebar.nameText}>
        {info.name}
      </Typography>
      <Avatar
        src="/assets/my_profile.png"
        alt="profile-image"
        sx={sxSidebar.avatar}
      />
      <Box sx={sxSidebar.box}>
        <Typography variant="h6" sx={sxSidebar.role}>
          {info.role}
        </Typography>
        <Typography variant="body2" sx={sxSidebar.description}>
          {info.description}
        </Typography>
      </Box>
      <Divider flexItem sx={sxSidebar.divider} />
    </Stack>
  </Paper>
);

export { Sidebar };
