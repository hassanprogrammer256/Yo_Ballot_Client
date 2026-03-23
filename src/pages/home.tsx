import { Box, Stack } from "@mui/joy"
import Overview from "../components/overview"
import Vote from "./vote"


const HomePage = () => {



  return (
    <Stack
      sx={{
        width: 1,
        minHeight: '100vh',
        overflow: 'hidden', 
        position: 'relative'
      }}
    >
      {/* Section 1 */}
      <Box
      
        sx={{
          height: '100vh',
          width: 1,
          zIndex:10,
          position: 'relative',
          overflow: 'auto',
    
        
        }}
      >
        <Overview />
      </Box>
      <Box
        sx={{
          zIndex:20,
          height: '100vh',
          width: 1,
          overflow: 'auto', 
          paddingX: { md: 3, xs: 1 },

        }}
      >
        <Vote />
      </Box>
    </Stack>
  )
}

export default HomePage