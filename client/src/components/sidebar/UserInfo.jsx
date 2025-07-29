import { Box, Avatar, Typography, Stack, Divider } from '@mui/material';

const sxSidebar = {
  stack: {
    gap: 2,
    alignItems: 'center',
    width: '100%',
  },
  
  nameText: {
    // textTransform: 'lowercase',
  },
  avatar: {
    width: 150,
    height: 150,
    border: 'solid 2px',
    borderColor: 'primary.main'
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
    textAlign: 'center',
    fontSize: '0.8rem',
    fontFamily: 'Azeret Mono',
    letterSpacing: '0.02rem'
  },
}

const info = {
  name: 'david gim',
  role: 'FS | Software | Developer',
  description: `My portfolio reflects my ongoing journey as a web developer — from building simple static pages to developing full-stack applications with dynamic features and clean, reusable code. Each project showcases how I've grown in both front-end and back-end development, improving not just in technical skills but also in problem-solving and user-focused design. I've worked with real-world APIs, learned to structure scalable apps, and adopted modern tools and frameworks to enhance both performance and maintainability. It''s a clear snapshot of my progression and commitment to becoming a well-rounded developer.`
}

const UserInfo = () => (
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
    </Stack>
)

export { UserInfo }