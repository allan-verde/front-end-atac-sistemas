import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, FormControl, Input, InputLabel, Skeleton, InputAdornment, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import Card from './components/Card'
import { api } from './services/api'
import { ModalAdd } from './components/modals/ModalAdd'
import { BodyStyle, ButtonAdd, ContainerSkeleton, MainStyle, Session, SessionCard, SessionSearch, SessionSearchCheckBox, SessionSearchInfo, SessionSearchInput, SessionSearchInputContainer, SessionSearchInputLabel, SubTitle, TitleMaster } from './styles'


export type ToolProps = {
  title: string
  description: string
  tags: string[]
  id: number
  link: string
}

function App() {
  const [checked, setChecked] = useState(true)
  const [tools, setTools] = useState<ToolProps[]>([])
  const [toolsFitred, setToolsFiltred] = useState<ToolProps[]>([])
  const [openModalAdd, setOpenModalAdd] = useState(false)
  const [keyWord, setKeyWord] = useState('')

  useEffect(() => {
    (async () => {
      const response: any = await api.get('/tools')
      const data: ToolProps[] = response.data

      setTools(data)
      setToolsFiltred(data)
    })()
  }, [])

  const filterTool = (word: string) => {
    setKeyWord(word)
    if (word.length === 0) {
      return setToolsFiltred(tools)
    }

    const newListTools = tools.filter(tool => {
      if (checked) {
        if (tool.tags.includes(word.toLowerCase())) {
          return true
        } else {
          return false
        }
      }

      if (tool.title.toLowerCase().includes(word.toLowerCase())) {
        return true
      } else if (tool.description.toLowerCase().includes(word.toLowerCase())) {
        return true
      } else if (tool.tags.includes(word.toLowerCase())) {
        return true
      } else {
        return false
      }
    })
    setToolsFiltred(newListTools)
  }

  return (
    <Box
      sx={BodyStyle}
    >
      <ModalAdd isOpen={openModalAdd} handleClose={setOpenModalAdd} setTools={setTools} />

      <Box
        sx={MainStyle}
      >
        <Typography 
          variant='h1' 
          color='primary'
          sx={TitleMaster}
        >VUTTR</Typography>
        <Typography variant='h2' 
          sx={SubTitle}
          color='secondary'
        >Very Useful Tools to Remember</Typography>
      </Box>

      <Box
        sx={Session}
      >

        <Box
          sx={SessionSearch}
        >

          <Box
            sx={SessionSearchInfo}
          >
            <FormControl variant="standard"
              sx={SessionSearchInputContainer}
            >
              <InputLabel 
                htmlFor="input-with-icon-adornment"
                sx={SessionSearchInputLabel}
              />
              <Input
                id="input-with-icon-adornment"
                onChange={e => filterTool(e.target.value)}
                value={keyWord}
                startAdornment={
                  <InputAdornment
                    position="start"
                    >
                  <SearchIcon />
                </InputAdornment>
                }
                sx={SessionSearchInput}
              />
            </FormControl>

            <Checkbox
              checked={checked}
              onChange={() => setChecked(prev => !prev)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography variant='body1'
              sx={SessionSearchCheckBox}
            >search in tags only</Typography>
          </Box>

          <Button 
            variant="outlined" 
            startIcon={<AddIcon />}
            sx={ButtonAdd}
            onClick={() => setOpenModalAdd(prev => !prev)}
          >
            Add
          </Button>
        
        </Box>

        <Box
          sx={SessionCard}
        >
          {toolsFitred.length > 0 ? (
            toolsFitred.map(tool => {
              return (
               <Card key={tool.id} tool={tool} setTools={setTools}/>
              )
            })
          ) : (
            <Box sx={ContainerSkeleton}>
              {[1,2,3].map(item => <Skeleton key={item}animation="wave" width='100%' height='120px' />)}
            </Box>
          )}
        </Box>

      </Box>

    </Box>
  )
}

export default App
