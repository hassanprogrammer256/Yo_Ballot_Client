import { AspectRatio, Box, Button, Card, CardContent, Chip, Typography } from "@mui/joy"
import type { candidatecard } from "../interfaces/candidate.interfaces"
import { useEffect, useState } from "react"
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { FaCheckDouble, FaX } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../hooks/store_hooks";
import { CheckRemainingVotesStatusThunk } from "../features/voterSlice";
import { API_URL } from "../config";
import { userVoteApi } from "../api/voting_init";
import { FetchOverviewDataThunk } from "../features/votesSlice";

const CandidateCard = (props: candidatecard) => {
  
  const [isvoting, setIsVoting] = useState<boolean>(false)
  const [positionVotedFor, setPositionVotedFor] = useState<boolean>(false)
  const [voteCasted, setVoteCasted] = useState<boolean>(false)
  const [otherCandidateVoted, setOtherCandidateVoted] = useState<boolean>(false)

  const { remaining_positions, remaining_candidates, voted_candidates,registration_number } = useAppSelector((state) => state.voterReducer)


  const dispatch = useAppDispatch()

  useEffect(() => {
    const checking = async() => {
      await dispatch(CheckRemainingVotesStatusThunk(registration_number)).then((res) => {
        return res
      }).catch((err) => {
        console.error(err)
      })
    }
    checking()
  }, [dispatch,voteCasted,registration_number])

  useEffect(() => {    
    const isVoteCasted = remaining_candidates?.some(pos => pos === props.id);
    setVoteCasted(!isVoteCasted);
  }, [props.id, remaining_candidates])

  useEffect(() => {    
    const positionVoted = remaining_positions?.some(pos => pos === props.position)
    setPositionVotedFor(!positionVoted)
    
    // Check if another candidate in the same position has been voted for
    if (voted_candidates && props.position) {
      const hasOtherCandidateVoted = voted_candidates.some(
        candidate => candidate !== props.id && positionVotedFor
      );
      setOtherCandidateVoted(hasOtherCandidateVoted);
    }
  }, [props.position, remaining_positions, voteCasted, voted_candidates, props.id,positionVotedFor,dispatch])

  const handleVoting = async() => {
    setIsVoting(true)
    try {
      const res = await userVoteApi(registration_number,props.id)
      if (res.success) {
        setVoteCasted(true)
        // setShowVoteRegisteredSnackBar(true)
        await dispatch(FetchOverviewDataThunk())
      
      }else{
        setVoteCasted(false)
      }
    } catch (error) {
      console.error(error) 
    } finally {
      setIsVoting(false)
    }
  }

  const getButtonProps = () => {
    if (voteCasted) {
      return {
        variant: "plain" as const,
        color: "neutral" as const,
        disabled: true,
        text: 'Vote Casted',
        icon: <FaCheckDouble size={20} />
      }
    }
    
    // Case 2: Another candidate in the same position has been voted for
    if (otherCandidateVoted) {
      return {
        variant: "solid" as const,
        color: "danger" as const,
        disabled: true,
        text: 'Position Taken',
        icon: <FaX />
      }
    }
    
    // Case 3: No candidate in this position has been voted for yet
    return {
      variant: "solid" as const,
      color: "success" as const,
      // disabled: isvoting || !positionVotedFor ||  !voteCasted,
      text: 'Vote Now',
      icon: <HowToVoteIcon />
    }
  }

  const buttonProps = getButtonProps()

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
          direction: 'flex',
          flexDirection: { xs: "column", md: "row" },
          // opacity: voteCasted ? 0.9 : otherCandidateVoted ? 0.6 : 1,
          // backgroundColor: otherCandidateVoted ? 'rgba(255, 0, 0, 0.09)' : 'transparent'
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: '50%' }}>
          <img
            src={`${API_URL}${props.image}`}
            loading="lazy"
            alt={props.name}
          />
        </AspectRatio>
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'stretch',
          alignItems: 'stretch',
          justifyContent: 'space-between'
        }}>
          <Typography sx={{ fontSize: 'xl', fontWeight: 'lg', textOverflow: 'ellipsis', textWrap: 'nowrap' }}>
            {props.name}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button
              variant={buttonProps.variant}
              color={buttonProps.color}
              disabled={buttonProps.disabled}
              startDecorator={buttonProps.icon}
              onClick={handleVoting}
              loading={isvoting}
              sx={{
                '&.Mui-disabled': {
                  opacity: buttonProps.color === 'danger' ? 1 : 0.7,
                  cursor: 'not-allowed'
                },display:positionVotedFor && !voteCasted ? 'none' : 'flex'
              }}
            >
              {buttonProps.text}
            </Button>
            <Chip  size = "sm" variant="outlined" color="danger" sx={{display:positionVotedFor && !voteCasted ? 'block' : 'none'}}>
              <Typography color="danger" component={'h5'}>Position Taken</Typography>
            </Chip>
          </Box>
        </CardContent>
      </Card>
      {/* {show_vote_registered_snackbar && <Snackbar color="success" component={"div"} open={true} title="Vote Registered Successfully" variant="solid" />} */}
    </Box>
  )
}

export default CandidateCard