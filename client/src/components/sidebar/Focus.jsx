import { Stack, Typography, Box } from "@mui/material"
import { GetIcon } from "../Icon"
const sxFocus = {
    stack: {
        display: 'flex',
        alignItems: 'center',
        gap: 2
    },
    title: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        gap: 1, 
    }
}
const Focus = () => {
    return (
        <Stack sx={sxFocus.stack}>
            <Box sx={sxFocus.title}>
                <GetIcon iconName='focus' size={40} />
                <Typography variant="h6">
                     Current Focus
                </Typography>
            </Box>

            <Typography variant="h5" sx={sxFocus.desc}>
                Frontend Testing
            </Typography>

            <Typography fontSize={14}>
                "Testing frontend is quite different with it's own unique challenges compared to backend I found. I am yet to to understand it's benefits."
            </Typography>
        </Stack>
    )
}

export { Focus }