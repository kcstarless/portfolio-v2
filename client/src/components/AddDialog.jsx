import { useState } from 'react'
import { Alert, Box, Typography } from '@mui/material'
import { GetIconButton } from 'components/Icon'
import * as hooks from 'hooks'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

const sxAddDialog = {
  dialogTitleBox: {
    display: "flex",
    alignItems: "center",
    m: 0,
    p: 0,
    justifyContent: "space-between",
  },
  dialogTitleTypography: {
    m: 1,
    p: 0,
    display: "flex",
    alignItems: "center",
  },
  alert: {
    m: 0,
    p: 0,
    backgroundColor: "transparent",
  },
}

const AddDialog = ({ addType, children }) => {
  const { formNotification } = hooks.useNotification()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const childWithProps =
    typeof children === "function"
      ? children({ onSuccess: handleClose, open })
      : children

  const typeMeta = {
    tech: { icon: "addTech", label: "Technology Stack" },
    project: { icon: "addProject", label: "Add Project" },
    update: { icon: "updateProject", label: "Update Project" },
  }

  const type = typeMeta[addType] || { icon: '', label: ''}

  return (
    <>
      <GetIconButton
        title={`click to add new ${addType}`}
        iconName={type.icon}
        onClick={handleClickOpen}
        size="large"
      />

      <Dialog open={open} keepMounted onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Box sx={sxAddDialog.dialogTitleBox}>
            <Typography variant="h3" sx={sxAddDialog.dialogTitleTypography}>
              {type.label}
            </Typography>

            {formNotification.open && (
              <Alert severity={formNotification.type} sx={sxAddDialog.alert}>
                {formNotification.message}
              </Alert>
            )}
          </Box>
        </DialogTitle>

        <DialogContent dividers>{open && childWithProps}</DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export { AddDialog }
