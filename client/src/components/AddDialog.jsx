import { useState } from 'react'
import { useNotification } from '../contexts/NotificationContext'
import { Alert, Box, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import { GetIcon } from './Icon'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
} from '@mui/material'


const AddDialog = ({addType, children}) => {
    const user = useSelector(state => state.auth.user)

    const { formNotification } = useNotification()
    const [open, setOpen] = useState(false)


    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const childWithProps = typeof children === 'function'
      ? children({ user, onSuccess: handleClose })
      : children

    return (
        <>
            <Tooltip title={`click to add new ${addType}`}>
                <IconButton onClick={handleClickOpen} aria-label={`add new ${addType}`} size="large">
                  {addType === 'tech' ? <GetIcon type='addTech' />: <GetIcon type='addProject' />}
                </IconButton>
            </Tooltip>

            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              fullWidth
              maxWidth="md"
            >
                <DialogTitle>

                    <Box display="flex" alignItems="center" m={0} p={0} justifyContent={'space-between'}>
                      <Typography variant='h3' m={1} p={0} display='flex' alignItems="center">
                        {/* {addType === 'tech' ? <GetIcon type='addTech' />: <GetIcon type='addProject' />} */}
                        Add New {addType === 'tech' ? 'Stack' : 'Project'}
                      </Typography>

                      {formNotification.open && (
                        <Alert
                          severity={formNotification.type}
                          sx={{ m: 0, p: 0, backgroundColor: 'transparent' }}
                        >
                          {formNotification.message}
                        </Alert>
                      )}
                    </Box>
                </DialogTitle>

                <DialogContent dividers>
                  {childWithProps}
                </DialogContent>

                <DialogActions>
                  <Button onClick={handleClose} color="secondary">Cancel</Button>
                </DialogActions>

            </Dialog>
        </>
    )
}

export { AddDialog }