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

const focusList = [
    {
        id: 1,
        name: "Frontend Testing",
        desc: "Testing frontend is quite different with it's own unique challenges compared to backend I found.",
    },
    {
        id: 2,
        name: "E2E Playwright",
        desc: "Modern test automation framework which enables realistic browser interactions across multiple roles, browsers, and platforms with advanced debugging and control capabilities."
    }
]


const FocusInfo = () => {
    return (
        <Stack sx={sxFocus.stack}>
            <Box sx={sxFocus.title}>
                <GetIcon iconName='focus' size={35} />
                <Typography variant="h6">
                     Current Focus
                </Typography>
            </Box>

            <Typography variant="h5" sx={sxFocus.desc}>
                {focusList[1].name}
            </Typography>

            <Typography fontSize={14}>
                "{focusList[1].desc}"
            </Typography>
        </Stack>
    )
}

export { FocusInfo }