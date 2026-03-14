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
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Overview />
      </Box>

      {/* Section 2 with internal scrolling */}
      <Box
        sx={{
          height: '100vh',
          width: 1,
          overflow: 'auto', // internal scroll
          paddingX: { md: 3, xs: 1 }
        }}
      >
        <Vote />
      </Box>
    </Stack>
  )
}

export default HomePage