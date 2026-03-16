import { AspectRatio, Box, Button, Card, CardContent, Typography } from "@mui/joy"
import type { candidatecard } from "../interfaces/candidate.interfaces"
import { useState } from "react"
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { FaCheckDouble,} from "react-icons/fa6";



const CandidateCard = (props:candidatecard) => {

    const [vote_casted,setVoteCasted] = useState(false)
    const [isvoting,setIsVoting] = useState(false)



const handleVoting = async() => {
    setIsVoting(true)
    try {
       console.log('voting Api Dispatched') 
       setVoteCasted(true)
    } catch (error) {
       console.error(error) 
    }
    finally{
        setIsVoting(false)
    }
}

  return (
   <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
        
          display: 'block',
          width: '1px',
          bgcolor: 'warning.300',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
          '&::before': {
            top: '4px',
            right: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
          '&::after': {
            top: '4px',
            left: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
         
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: '50%' }}>
          <img
            src={props.candidate_image}
            loading="lazy"
            alt={props.candidate_name}
          />
        </AspectRatio>
      <CardContent sx={{
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'space-between'
}}>
  <Typography sx={{ fontSize: 'xl', fontWeight: 'lg', textOverflow:'ellipsis',textWrap:'nowrap' }}>
    {props.candidate_name}
  </Typography>
  <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
    <Button
      variant="solid"
      color={vote_casted ? "danger" : "success"}
      disabled={isvoting || vote_casted}
      startDecorator={vote_casted ? <FaCheckDouble size={20} /> : <HowToVoteIcon />}
      onClick={handleVoting}
      loading={isvoting}
    >
      {vote_casted ? 'Vote Casted' : 'Vote Now'}
    </Button>
  </Box>
</CardContent>
      </Card>
    </Box>
  )
}

export default CandidateCard
