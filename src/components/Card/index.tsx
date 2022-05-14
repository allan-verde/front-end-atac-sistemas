import { Box, Button, Link, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { ToolProps } from '../../App'
import { ModalRemove } from '../modals/ModalRemove'
import { useState } from 'react'
import { Session, Main, TitleLink, ButtonOpenModal, TitleDescription } from './style'


type CardProps = {
  tool: ToolProps
    setTools: (params: (prev: ToolProps[]) => void) => void
}

const Card = ({ tool, setTools }: CardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { title, link, tags, description } = tool

  return (
    <Box
      sx={Main}  
    >
      <ModalRemove isOpen={isOpen} handleClose={setIsOpen} setTools={setTools} id={tool.id} />
      <Box
        sx={Session}  
      >
        <Link 
          sx={TitleLink}
          href={link}
          underline="always"
          target='_blank'
          rel="noopener"
        >
          {title}
        </Link>
        <Button
          variant="text" 
          endIcon={<CloseIcon sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }} />}
          sx={ButtonOpenModal}
          onClick={() => setIsOpen(true)}
        >
          remove
        </Button>
      </Box>
      <Box>
        <Typography 
        variant='h4'
        sx={TitleDescription}
        >{description}</Typography>
        <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
        >
        {tags.map((tag, index) => {
          return (
            <Typography variant='body1'
              key={index}
              sx={ButtonOpenModal}
              color='secondary'
            >
              {` #${tag} `}
            </Typography>
          )
        })}
        </Box>
      </Box>
    </Box>
  )    
}

export default Card