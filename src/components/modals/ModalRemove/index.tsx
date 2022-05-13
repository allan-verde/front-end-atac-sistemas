import { Modal, Box, Button, Typography } from '@mui/material'
import { api } from '../../../services/api'
import { ToolProps } from '../../../App'
import { ButtonCancel, ButtonConfirm, ContainerButton, Session, Title } from './style'


type ModalAddProps = {
    isOpen: boolean
    handleClose: (close: boolean) => void
    setTools: (params: (prev: ToolProps[]) => void) => void
    id: number
}

export const ModalRemove = ({ isOpen, handleClose, setTools, id }: ModalAddProps) => {

  const DeleteTool = async () => {
    const response: any = await api.delete(`/tools/${id}`)
    const result: ToolProps = response.data
    setTools(prev => prev.filter(tool => tool.id !== id))
    handleClose(false)
  }

  return (
    <Modal
        open={isOpen}
        onClose={() => handleClose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={Session}>
            <Typography 
                id="modal-modal-title" 
                variant="h6" 
                component="h2"
                sx={Title}
            >X Remove new tool</Typography>
            <Box
                sx={ContainerButton}
            >
                <Button 
                    variant="outlined" 
                    sx={ButtonCancel}
                    onClick={() => handleClose(false)}
                >
                    Cancel
                </Button>
                <Button 
                    variant="outlined"
                    color='secondary' 
                    sx={ButtonConfirm}
                    onClick={DeleteTool}
                >
                    Yes, remove
                </Button>
            </Box>
        </Box>
    </Modal>
  )    
}