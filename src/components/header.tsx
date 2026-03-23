import {Box, Button, Grid, Stack } from '@mui/joy'
import { FaHome, FaUserAlt} from 'react-icons/fa'
import HowToVoteIcon from '@mui/icons-material/HowToVote'
import { FaBars} from 'react-icons/fa6'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Yo_Ballot_Logo from '/logos/yo_ballot_logo.png'
import { useAppDispatch, useAppSelector } from '../hooks/store_hooks'
import { LogOutThunk } from '../features/voterSlice'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const {refresh_token} = useAppSelector((state) => state.voterReducer)
  const [isloggingout,setIsLoggingOut] = useState(false)

  const activeSection = location.hash ? location.hash.substring(1) : ''
  const isActive = (sectionId: string) => activeSection === sectionId

  const handleNavigation = (path: string, hash?: string) => {
    if (hash) {
      navigate(`${path}${hash}`)
      const element = document.getElementById(hash.substring(1))
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(path)
    }
    setMenuOpen(false)
  }

  const HandleLogout = async() => {
  setIsLoggingOut(true)
try {
  const response =  await dispatch(LogOutThunk(refresh_token)).unwrap()
if (response){
  navigate('/')
}
} catch (error) {
  console.log({error})
}finally{
  setIsLoggingOut(false)
}
  }

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────── */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          overflow: 'visible',      
          background: 'linear-gradient(135deg, #0a4a7c 0%, #1565C0 50%, #0f7a50 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
            maxWidth: '1200px',
            mx: 'auto',
            px: 4,
            height: '72px',
            overflow: 'visible',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              
              left: '10%',
              transform: 'translateY(-5%)',
             bottom:-50,      
              zIndex: 1100,
              cursor: 'pointer',
            }}
            onClick={() => handleNavigation('/')}
          >
            {/* White pill card */}

             <Box
  sx={{
    width: '100px',
    height: '100px',
    backgroundColor:"white",
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ddd', 
  }}
>
  <img
    src={Yo_Ballot_Logo}
    alt="Yo Ballot"
    style={{ height: '100%', width: 'auto', display: 'block',objectFit:'contain' }}
  />
</Box>
              
      

            {/* Soft ground shadow beneath the pill */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '70%',
                height: '8px',
                bgcolor: 'rgba(0,0,0,0.12)',
                borderRadius: '50%',
                filter: 'blur(5px)',
              }}
            />
          </Box>

          {/* Right — menu button */}
          {location.pathname !== '/' && <Grid sx={{ position: 'relative' }}>
            <Button
              variant="soft"
              color="neutral"
              onClick={() => setMenuOpen(!menuOpen)}
              endDecorator={<FaBars />}
              sx={{
                bgcolor: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.25)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
              }}
            >
              Menu
            </Button>

            {menuOpen && (
              <Stack
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50px',
                  minWidth: '220px',
                  bgcolor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
                  zIndex: 1200,
                  overflow: 'hidden',
                  animation: 'slideDown 0.2s ease',
                }}
              >
                <Button
                  variant="plain"
                  color={isActive('dashboard') ? 'primary' : 'neutral'}
                  startDecorator={<FaHome/>}
                  onClick={() => handleNavigation('home', '#dashboard')}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.5,
                    bgcolor: isActive('dashboard') ? 'rgba(21,101,192,0.08)' : 'transparent',
                    '&:hover': { bgcolor: '#f0f0f0' },
                  }}
                >
                  Dashboard {isActive('dashboard') && '✓'}
                </Button>

                <Button
                  variant="plain"
                  color={isActive('vote') ? 'success' : 'neutral'}
                  startDecorator={<HowToVoteIcon />}
                  onClick={() => handleNavigation('home', '#vote')}
                  sx={{
                    justifyContent: 'flex-start',
                    py: 1.5,
                    bgcolor: isActive('vote') ? 'rgba(0,200,83,0.08)' : 'transparent',
                    '&:hover': { bgcolor: '#f0f0f0' },
                  }}
                >
                  Vote Now {isActive('vote') && '✓'}
                </Button>
                <Button
                  variant="solid"
                  color='danger'
                  startDecorator={<FaUserAlt />}
                  sx={{m:2}}
                  onClick={HandleLogout}
                  loading={isloggingout}
        
                >
                  LogOut 
                </Button>
              </Stack>
            )}
          </Grid>}
        </Grid>
      </Box>

      {/* ── Spacer to prevent content hiding under the protruding logo ── */}
      <Box sx={{ height: '52px' }} />
    </>
  )
}

export default Header