import { Modal, Box, Button, Typography, TextField } from '@mui/material'
import { api } from '../../../services/api'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { ToolProps } from '../../../App'
import { ButtonAdd, Form, Input, Session, TitleModal } from './style'


type ModalAddProps = {
    isOpen: boolean
    handleClose: (close: boolean) => void
    setTools: (params: (prev: ToolProps[]) => void) => void
}

export const ModalAdd = ({ isOpen, handleClose, setTools }: ModalAddProps) => {

  const createToolSchema = yup.object().shape({
      title: yup.string().required('Campo obrigatório').min(3, 'Min 3 caracteres'),
      link: yup.string().required('Campo obrigatório').min(3, 'Min 3 caracteres'),
      description: yup.string().required('Campo obrigatório').min(20, 'Min 20 caracteres'),
      tags: yup.string().required('Campo obrigatório').min(3, 'Min 3 caracteres')
  })

  const {
      formState: { errors },
      register,
      handleSubmit,
      control
  } = useForm({ resolver: yupResolver(createToolSchema) })

  const createToolForm = async (data: any) => {
    data.tags = data.tags.split(' ')

    const response: any = await api.post('/tools', data)
    const result: ToolProps = response.data

    setTools(prev => [...prev, result])
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
                sx={TitleModal}
            >+ Add new tool</Typography>
            <Box
                component='form'
                sx={Form}
                onSubmit={handleSubmit(createToolForm)}
            >

                <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            size="small" 
                            sx={Input} 
                            label="Title"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                    rules={{ required: 'First name required' }}
                />
                <Controller
                    name="link"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            size="small" 
                            sx={Input} 
                            label="Link"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                    )}
                    rules={{ required: 'First name required' }}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            sx={Input} 
                            label="Description"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            multiline
                            maxRows={4}
                            helperText={error ? error.message : null}
                        />
                    )}
                    rules={{ required: 'First name required' }}
                />
                <Controller
                    name="tags"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <TextField
                            size="small"
                            sx={Input} 
                            label="Tags"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            multiline
                            maxRows={4}
                            helperText={error ? error.message : null}
                        />
                    )}
                    rules={{ required: 'First name required' }}
                />
                <Button 
                    variant="outlined" 
                    sx={ButtonAdd}
                    type='submit'
                >
                    Add
                </Button>
            </Box>
        </Box>
    </Modal>
  )    
}