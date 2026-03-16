import { Box, IconButton, Tooltip } from '@mui/joy'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaHome, FaVoteYea } from 'react-icons/fa'
import { MdDashboard } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const FloatingNav = () => {
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  
  // Hide/show based on scroll direction
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.9])

  const scrollToSection = (sectionId: string) => {
    navigate(`/#${sectionId}`)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 1000,
        opacity
      }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', delay: 1 }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Tooltip title="Go to Dashboard" placement="left">
          <IconButton
            size="lg"
            variant="solid"
            color="primary"
            onClick={() => scrollToSection('dashboard')}
            sx={{
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <MdDashboard />
          </IconButton>
        </Tooltip>

        <Tooltip title="Go to Vote" placement="left">
          <IconButton
            size="lg"
            variant="solid"
            color="success"
            onClick={() => scrollToSection('vote')}
            sx={{
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <FaVoteYea />
          </IconButton>
        </Tooltip>

        <Tooltip title="Go to Top" placement="left">
          <IconButton
            size="lg"
            variant="solid"
            color="neutral"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              borderRadius: '50%',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }}
          >
            <FaHome />
          </IconButton>
        </Tooltip>
      </Box>
    </motion.div>
  )
}

export default FloatingNav