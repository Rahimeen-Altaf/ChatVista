import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

/* eslint-disable react/prop-types */
const ConfirmDialog = ({ type, content, open, handleClose, deleteHandler }) => {
  return (
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Confirm {type}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={deleteHandler} color="error">Yes</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDialog