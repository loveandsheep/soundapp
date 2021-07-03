import React from 'react'
import { Grid, Slider, Typography } from "@material-ui/core"

export default function SCSlider(props) {
    const centering = {display: 'flex', flexDirection: 'column', justifyContent: 'center',};
    const [slideValue, setValue] = React.useState(props.default);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        window.myapi.osc({
            address: "/n_set", 
            args:[props.synthNum, props.argName, slideValue]}
        )
    };

    return(
        <>
        <Grid item xs={3} style={centering}>
            <Typography id="discrete-slider-small-steps">
                {props.label}
            </Typography>
        </Grid>

        <Grid item xs={8}>
            <Slider
                value={slideValue}
                onChange={handleChange}
                min={props.min} max={props.max}
                step={props.step}
                valueLabelDisplay="auto"
            />                
        </Grid>

        <Grid item xs={1}></Grid>
        </>
    )
}