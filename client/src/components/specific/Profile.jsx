import { Avatar, Stack, Typography } from "@mui/material"
import {
    Face as FaceIcon,
    AlternateEmail as UserNameIcon,
    CalendarMonth as CalenderIcon,
} from "@mui/icons-material";
import moment from 'moment';

const Profile = () => {
    return (
      <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar 
        sx={{
            width: 200,
            height: 200,
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5px solid white",
        }}/>
        <ProfileCard heading={"Bio"} text={"hello world"} />
        <ProfileCard heading={"Username"} text={"rahimeenn"} Icon={<UserNameIcon />} />
        <ProfileCard heading={"Name"} text={"Rahimeen Altaf"} Icon={<FaceIcon />}/>
        <ProfileCard heading={"Joined"} text={moment('2024-07-08T00:00:00.000Z').fromNow()} Icon={<CalenderIcon />}/>
      </Stack>
    )
  }
  
  // eslint-disable-next-line react/prop-types
  const ProfileCard = ({text, Icon, heading}) => (
  <Stack
  direction={"row"}
  alignItems={"center"}
  spacing={"1rem"}
  color={"white"}
  textAlign={"center"}
  >
    {Icon && Icon}

    <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">{heading}</Typography>
    </Stack>
  </Stack>
  )
  
  export default Profile