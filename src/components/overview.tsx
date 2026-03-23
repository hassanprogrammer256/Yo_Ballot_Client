import { Box, Card, CircularProgress, Grid, Typography } from '@mui/joy'
import { motion } from 'framer-motion'
import CountDown from './count_down'
import { useAppDispatch, useAppSelector } from '../hooks/store_hooks'
import { useEffect} from 'react'
import { FetchOverviewDataThunk } from '../features/votesSlice'



const Overview = () => {

const data = useAppSelector((state) => state.overviewReducer)


const dispatch = useAppDispatch()

useEffect(() => {
const update = async() => {
try {
  await dispatch(FetchOverviewDataThunk());
} catch (error) {
  console.error({error})
}

  }

  update()

},[dispatch,data]);

  return (
   <motion.div
   id='dashboard'
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.3, delay: 0.5 }}
        className='overflow-hidden'
      >
        <Box sx={{ display: 'flex', flexDirection: { sm: 'column', xs: "column-reverse" }, overflowX: 'hidden' }}>
          <Grid container >
            {data.map((data, index) => (
              <Grid xs={12} sm={6} lg={3} key={index}>
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.2 }}
                >
                <Card sx={{
  height: '120px', 
  m: 2, 
  p: 2, 
  transition: "all ease .4", 
  cursor: 'pointer',
  // Add these flex properties to the card itself
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // This creates space between top and bottom
  alignItems: 'center',
  
  // Hover effects (keep only the transform/shadow)
  ":hover": { 
    translate: '0 5px', 
    boxShadow: '2px 2px 2px grey'
  }
}}>
  <Typography
    component={'h2'}
    sx={{ fontWeight: 800, textAlign: 'center', fontSize: 'lg' }}
  >
    {data.label.includes('Turn') ? (
      <CircularProgress
        determinate
        value={data.value}
        size='lg'
        variant='soft'
        color={data.value > 85 ? 'success' : data.value > 50 ? "warning" : 'danger'}
      >
        <Typography component={'h4'} sx={{ fontWeight: 500 }}>{data.value}%</Typography>
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


      </motion.div>
  )
}

export default Overview