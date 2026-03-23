// In your Vote component
import { Grid } from '@mui/joy'
import { motion } from 'framer-motion'
import CandidateCard from '../components/candidate_card'
import { useEffect, useState } from 'react'
import type { postsType } from '../types/store.types'
import { PostsDataApi } from '../api/voting_init'


const Vote = () => {


const [posts,setPosts] = useState<postsType>([])


useEffect(() => {
const update = async() => {
try {
  await PostsDataApi().then((res) => {
    setPosts(res)

  })
} catch (error) {
  console.error({error})
}

  }

  update()

},[]);
  return (
    <div
    id='vote'
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth'
      }}
    >
      {posts.map((_, index) => (
        <div
          key={index}
          style={{
            height: '100vh',
            width: '100%',
            overflowY: 'auto',
            scrollSnapAlign: 'start',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: index % 2 === 0 ? '#f0f0f0' : 'azure',
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
              {_.position}
            </motion.h1>

            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {_.candidates.map((candidate, index) => (
                
                <Grid key={index} xs={12} md={6} xl={3}>
                 
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
                    id={candidate.id}
                    name={candidate.name}
                    image={candidate.image}
                    position={candidate.position}
                 
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