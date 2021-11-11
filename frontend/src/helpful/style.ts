import { createTheme } from "@mui/material/styles";

export const colors = {
    darkGreen: '#0f290a',
    darkGreenVariant: '#081405',
};

export const theme = createTheme({
    palette: {
        primary: {
            main: colors.darkGreen
        }
    }
})