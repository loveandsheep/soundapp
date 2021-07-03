import React, {Component} from 'react'
import { Typography, Paper, Container, Slider } from '@material-ui/core'
import { Box, Button, Grid } from '@material-ui/core'
import SCSlider from './SCSlider';

export default class SCPanel extends Component {

    constructor(props){
        super(props);

        this.state = {
            synthName: props.synName,
            synthNum: props.synNum,
            args: props.args,
        }
    }

    newSynth = () => {
        window.myapi.osc({
            address: "/s_new",
            args: [this.state.synthName, this.state.synthNum],
        })
    }

    freeSynth = () => {
        window.myapi.osc({
            address: "/n_free",
            args: [this.state.synthNum],
        })
    }

    handleChange = (event, newValue) => {
        this.setState({testValue: newValue});
        window.myapi.osc({address: "/n_set", args:[this.state.synthNum, "freq", this.state.testValue]});
    }


    render(){
        const centering = {display: 'flex', justifyContent: 'center', alignItems: 'center'};
        const stockName = {display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'};
        const paperSt = {p: 3}

        const argArr = this.state.args.map((arg) =>
            <SCSlider 
                label={arg.label} 
                argName={arg.argName}
                synthNum={this.state.synthNum}
                min={arg.min} max={arg.max} step={arg.step} default={arg.default}
            />
        );

        return(
            <Box width='90%' spacing={2}>
            <Paper style={centering} m={1}>
                <Box style={centering} p={1}>
                    <Typography>{this.state.synthName}</Typography>
                    <Button variant="contained" color="primary" onClick={this.newSynth} style={stockName}>
                        開始
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.freeSynth} style={stockName}>
                        停止
                    </Button>
                </Box>

            </Paper>

            <Paper m={1} >
            <Grid container spacing={1}>
                {argArr}
            </Grid>
            </Paper>

            </Box>
        )
    }
}