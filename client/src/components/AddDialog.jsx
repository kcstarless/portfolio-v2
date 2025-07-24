import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
} from '@mui/material'
import { MdOutlineNoteAdd } from "react-icons/md"

const AddDialog = ({addType, children}) => {
  const { user } = useAuth()
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
          <MdOutlineNoteAdd />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Add New {addType}</DialogTitle>
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

export default AddDialog