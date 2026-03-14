import { Box, Card, CircularProgress, Grid, Typography } from '@mui/joy'
import { motion } from 'framer-motion'
import { overviewData } from '../config'
import CountDown from './count_down'


const Overview = () => {
  return (
   <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.3, delay: 0.5 }}
        className='overflow-hidden'
      >
        <Box sx={{ display: 'flex', flexDirection: { md: 'column', xs: "column-reverse" }, gap: 5, overflowX: 'hidden' }}>
          <Grid container spacing={2}>
            {overviewData.map((data, index) => (
              <Grid xs={6} md={6} lg={3} key={index}>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.2 }}
                >
                  <Card sx={{
                    height: '100px', m: 2, p: 2, transition: "all ease .4", cursor: 'pointer',
                    ":hover": { translate: '0 5px', boxShadow: '2px 2px 2px grey' }
                  }}>
                    <Typography
                      component={'h2'}
                      sx={{ fontWeight: 800, textAlign: 'center', fontSize: 'lg' }}
                    >
                      {data.value.includes('%') ? (
                        <CircularProgress
                          determinate
                          value={parseInt(data.value)}
                          size='md'
                          variant='soft'
                          color={parseInt(data.value) > 85 ? 'success' : parseInt(data.value) > 50 ? "warning" : 'danger'}
                        >
                          <Typography component={'h4'} sx={{ fontWeight: 500 }}>{data.value}</Typography>
                        </CircularProgress>
                      ) : data.value
                      }
                    </Typography>

                    <Typography
                      component={'h4'}
                      sx={{ textAlign: 'center', textTransform: 'capitalize' }}
                    >
                      {data.label}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column', gap: 3, width: '100%' }}>
            <CountDown />
          </Box>
        </Box>

        <div className="flex flex-row justify-center bg-transparent">
          <motion.button
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                "0 0 0px rgba(34, 197, 94, 0.3)",
                "0 0 25px rgba(34, 197, 94, 0.9), 0 0 10px rgba(34, 197, 94, 0.5)",
                "0 0 0px rgba(34, 197, 94, 0.3)",
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className='cursor-pointer mt-10 bg-green-800 text-slate-300 font-medium text-xl rounded-md p-2'
          >
            Get Ballot Paper
          </motion.button>
        </div>
      </motion.div>
  )
}

export default Overview