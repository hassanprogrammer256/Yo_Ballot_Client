// In your Vote component
import { Grid } from '@mui/joy'
import { motion } from 'framer-motion'
import { dummyCandidates } from '../config'
import CandidateCard from '../components/candidate_card'

const Vote = () => {
  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        // optional: add smooth scrolling
        scrollBehavior: 'smooth'
      }}
    >
      {dummyCandidates.map((_, index) => (
        <div
          key={index}
          style={{
            height: '100vh', // full viewport height
            width: '100%',
            overflowY: 'auto', // internal scrolling if needed
            scrollSnapAlign: 'start', // snap position
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff', // optional background alternation
            borderBottom: '1px solid #ccc'
          }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              transition: { type: 'spring' }
            }}
            viewport={{ once: true }}
          >
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                textAlign: 'left',
                fontWeight: 800,
                fontSize: 'larger',
                background: '#173E6F',
                color: 'white',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              {_.post}
            </motion.h1>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {_.candidates.map((candidate, index) => (
                <Grid key={index} xs={6} md={4} xl={3}>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{
                      y: 0,
                      opacity: 1,
                      transition: { type: 'spring' }
                    }}
                    viewport={{ once: true }}
                  >
                    <CandidateCard
                      candidate_name={candidate.name}
                      candidate_image={candidate.image}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </div>
      ))}
    </div>
  )
}

export default Vote