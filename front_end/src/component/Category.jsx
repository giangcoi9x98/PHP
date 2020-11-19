import React, { Component } from 'react'
import {
    Grid,
    Typography,
    Card,
    CardMedia,
    CardHeader,
    CardContent,
    CardActions,
    Button,
    Divider,
    Avatar, Hidden, Drawer
} from '@material-ui/core'
import Image from 'material-ui-image'
export default class Category extends Component {
    render() {
        return <div>
            <Grid style={{padding:5,justifyContent:'center',minWidth:100,maxWidth:100,flexFlow:'wrap'}}>
               <Card style={{height:80,width:80}} >
                <Image src={this.props.category.imageUrl}></Image> 
               </Card>
                </Grid>   
        </div> 
           
        
    }

}