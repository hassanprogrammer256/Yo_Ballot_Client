import { Box,Typography } from "@mui/joy"
import CustomTabs from "./tabs"
import CustomTabList from "./tablist"
import CustomTab from "./tab"
import { dummyCandidates } from "../config"

const VoterTab = () => {
  return (
<Box sx={{ padding: 2 }}>
<CustomTabs defaultValue={0} sx={{display:"flex", flexDirection:'row', gap:3}}>
   
         <CustomTabList sx={{overflow:'auto', scrollSnapType:'x-mandatory',"&::-webkit-scrollbar":{display:'none'}}}>
            {dummyCandidates.slice(0,4)?.map((tab:any,index) => 
        <CustomTab  key={index}  sx={{ flexGrow: 1, flexShrink: 0}} > 
          <Typography component={'h2'} sx={{textAlign:'left',fontWeight:800}} variant="solid" color="primary">
            {tab.post}
          </Typography>
        </CustomTab>)}
    </CustomTabList>
</CustomTabs>

</Box>
  )
}

export default VoterTab