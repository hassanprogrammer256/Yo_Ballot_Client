import { Box, FormControl, Grid, Input, Button, Typography, Modal, ModalDialog, Alert } from "@mui/joy"
import { useState, useEffect, type SubmitEventHandler } from "react"
import Logo from '/logos/yo_ballot_logo.png'
import { voterRequestOTP, voterVerifyOtp } from "../api/voterlogin"
import { useAppDispatch } from "../hooks/store_hooks"
import { voterLoginThunk } from "../features/voterSlice"
import { useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'

const backgroundImages = [
  '/images/voting-5.jpg',
  '/images/voting-2.jpg',
  '/images/voting-3.jpg',
  '/images/voting-4.jpg',
]


const Auth = () => {
  // form mappings = {
  //   login = 0,
  //   register=1
  // }
  const [current_form,setCurrentForm] = useState(0)
  const [reg_no, setRegNo] = useState('')
  const [code, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)
const dispatch = useAppDispatch()
const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length)
        setFadeIn(true)
      }, 1000) 
    }, 5000) 

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await voterRequestOTP(reg_no)

      if (response.success) {        setIsOtpModalOpen(true)
      } else if (response.error){
        setError(response.error)
      }
      
    } catch (err) {
        console.log({err})
      setError('Network Error.Please try again.')
    } finally {
      setIsLoading(false)
  
    
    }
  }

const handlelogin = async(e:React.FormEvent) => {
  setIsLoading(true)
  e.preventDefault()
  try {
    const response = await dispatch(voterLoginThunk({reg_no,password})).unwrap()

if (response.success){
  navigate('home')
}
else if (response.error){
  setError(response.error)
}
  } catch (error) {
   console.log('error:',error) 
  }finally{
    setIsLoading(false)
    // setRegNo('')
    setPassword('')
    setOtp('')
   
  }

}

const toggleForm = () => {
if (current_form === 0){
  setCurrentForm(1)
}else{
  setCurrentForm(0)
}
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await voterVerifyOtp({reg_no,code})
      if (response.success && response.password){
        // 24998
       
        alert("OTP Verified successfully, Log In with the Password Sent to you")
        navigate('/')
        setIsOtpModalOpen(false)
      }else if (response.error){
        setError(response.error)
      }
    
    } catch (err) {
        console.log({err})
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
      // setRegNo('')
    setPassword('')
    setOtp('')
   
    }
  }

  return (
    <>
      <Grid 
        container 
        sx={{ 
          height: current_form === 0 ? '60vh'  : '70vh',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor:'transparent'
        }}>
        <Grid 
          xs={12} 
          sm={6} 
          sx={{ 
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
            display: { xs: 'none', sm: 'block' }
          }}
        >
          {backgroundImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundRepeat:'no-repeat',
                backgroundPosition: 'center',
                opacity: index === currentImageIndex && fadeIn ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
  
                }
              }}
            />
          ))}
          
   
        </Grid>


{
current_form === 0 ? 
<RequestOTP isloading={isLoading}  error={error} handlesubmit={handleSubmit} reg_no={reg_no} setRegNo={setRegNo} toggleForm={toggleForm}/> 
  :
  <Login isloading={isLoading}  error={error} handleLogin ={handlelogin} reg_no={reg_no} setRegNo={setRegNo} toggleForm={toggleForm} password={password} setPassword={setPassword} />
   }
      </Grid>

      <Modal
        open={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backdropFilter: 'blur(5px)'
        }}
      >
        <ModalDialog
          sx={{
            maxWidth: 400,
            width: '90%',
            p: 4
          }}
        >
          <Typography level="h4" sx={{ mb: 3, textAlign: 'center' }}>
            Verify OTP
          </Typography>
          
          <Typography level="body-sm" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary' }}>
            Enter the 6-digit code sent to your registered mobile number
          </Typography>


          <form onSubmit={handleOtpSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {error && (
                <Alert color="danger" variant="soft">
                  {error}
                </Alert>
              )}

              <FormControl>
                <Input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  variant="outlined"
                  color="primary"
                  size="lg"
                  value={code}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  sx={{ 
                    textAlign: 'center',
                    '& input': { 
                      py: 1.5,
                      px: 2,
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      letterSpacing: '0.5rem'
                    } 
                  }}
                />
              </FormControl>

              <Button 
                type="submit" 
                loading={isLoading}
                size="lg"
                sx={{ 
                  mt: 2,
                  py: 1.5
                }}
              >
                Verify & Login
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}

export default Auth;



const RequestOTP = (props:{error:string,isloading:boolean,handlesubmit:SubmitEventHandler<HTMLFormElement>,reg_no:string,setRegNo:(e:string)=>void,toggleForm:()=>void}) => {

  return (
    
        <Grid 
          xs={12} 
          sm={6} 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',

          }}
        >
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: 400, 
              p: 1,
              backgroundColor: 'white',
              borderRadius: 2,
            //   boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            {/* Logo and form in one column */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img 
                src={Logo} 
                alt="Logo" 
                style={{ 
                  width: '50%', 
                  height: 'auto',
                  marginBottom: 16,
                  justifyContent:'center'
                }} 
              />

            </Box>

            <motion.form onSubmit={props.handlesubmit}
  initial={{opacity:0,x:100}}
  whileInView={{opacity:1,x:0}}
  transition={{type:'tween',duration:.2}}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {props.error && (
                  <Alert color="danger" variant="soft">
                    {props.error}
                  </Alert>
                )}
                
                <FormControl>
                  <Input
                    type="text"
                    id="reg_no"
                    name="reg_no"
                    placeholder="Enter Registration Number"
                    variant="outlined"
                    color="primary"
                    size="lg"
                    value={props.reg_no}
                    onChange={(e) => props.setRegNo(e.target.value)}
                    required
                    sx={{ 
                      '& input': { 
                        py: 1.5,
                        px: 2 
                      } 
                    }}
                  />
                </FormControl>

                <Button 
                  type="submit" 
                  loading={props.isloading}
                  size="lg"
                  sx={{ 
                    mt: 2,
                    py: 1.5,
                    fontSize: '1rem'
                  }}
                >
                  Get OTP
                </Button>
              </Box>
            </motion.form>
                <Box sx={{display:'flex',justifyContent:'center',flexDirection: "column",alignItems:"center",my:1,gap:1}}>
               <Typography sx={{opacity:.8}}>Already have  a Voter Account? </Typography>
               <Button size="sm" variant="outlined" color="primary" onClick={props.toggleForm}>Log in Instead</Button>
            </Box>
          </Box>
        </Grid>
  )
}

const Login = (props:{error:string,isloading:boolean,handleLogin:SubmitEventHandler<HTMLFormElement>,reg_no:string,setRegNo:(e:string)=>void,password:string,setPassword:(e:string)=>void,toggleForm:()=>void}) => {

  return (
    
      <Grid 
          xs={12} 
          sm={6} 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',

          }}
        >
          <Box 
            sx={{ 
              width: '100%', 
              maxWidth: 400, 
              p: 1,
              backgroundColor: 'white',
              borderRadius: 2,
    
            }}
          >
  
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <img 
                src={Logo} 
                alt="Logo" 
                style={{ 
                  width: '50%', 
                  height: 'auto',
                  marginBottom: 16,
                  justifyContent:'center'
                }} 
              />

            </Box>

            < motion.form onSubmit={props.handleLogin}
  initial={{opacity:0,x:-100}}
  whileInView={{opacity:1,x:0}}
  transition={{type:'tween',duration:.2}}

  
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {props.error && (
                  <Alert color="danger" variant="soft">
                    {props.error}
                  </Alert>
                )}
                
                <FormControl>
                  <Input
                    type="text"
                    id="reg_no"
                    name="reg_no"
                    placeholder="Enter Registration Number"
                    variant="outlined"
                    color="primary"
                    size="lg"
                    value={props.reg_no}
                    onChange={(e) => props.setRegNo(e.target.value)}
                    required
                    sx={{ 
                      '& input': { 
                        py: 1,
                        px: 2 
                      }, 
                    
                    }}
                  />
                </FormControl>

                 <FormControl>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Sent Password"
                    variant="outlined"
                    color="primary"
                    size="lg"
                    value={props.password}
                    onChange={(e) => props.setPassword(e.target.value)}
                    required
                    sx={{ 
                      '& input': { 
                        py: 1,
                        px: 2 
                      } 
                    }}
                  />
                </FormControl>

                <Button 
                  type="submit" 
                  loading={props.isloading}
                  size="lg"
                  sx={{ 
                    mt: 1,
                    py: 1.5,
                    fontSize: '1rem'
                  }}
                >
                  Login
                </Button>
              </Box>
            </motion.form>
            <Box sx={{display:'flex',justifyContent:'center',flexDirection: "column",alignItems:"center",my:1,gap:1}}>
               <Typography sx={{opacity:.8}}>Dont have a Voter Account? </Typography>
               <Button variant="outlined" color="primary" onClick={props.toggleForm}>Create One</Button>
            </Box>
           
          </Box>
        </Grid>
  

)
}