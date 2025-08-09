import { Paper, Divider } from '@mui/material'
import { UserInfo } from './UserInfo'
import { TechInfo } from './TechInfo'
import { FocusInfo } from './FocusInfo'

const sxSidebar = {
  paper: {
    minHeight: '100%',
    bgcolor: 'background.paper',
    p: 3,
    pt: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // borderRight: '1px solid',
    borderRadius: 0,
    gap: 2,
  },
};

const Sidebar = () => (
  <Paper elevation={0} sx={sxSidebar.paper}>
    <UserInfo />
    <Divider flexItem />
    <TechInfo />
    <Divider flexItem />
    <FocusInfo />
  </Paper>
);

export { Sidebar };
