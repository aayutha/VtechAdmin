import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, TextField } from "@mui/material";
import { CardActionArea } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Card1() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <Card sx={{ maxWidth: 400, marginLeft: "550px", marginTop: "50px" }}>
      <CardActionArea>

        <CardContent>
          <TextField sx={{ width: 350 }} margin="normal" type={'text'} variant="outlined" placeholder="Enter Question" />
          <Typography >
            <Typography style={{ display: "flex" }}>
              <p style={{ marginTop: "22px" }}>a)</p>
              <TextField style={{ marginRight: '.5rem', marginLeft: "5px" }} InputProps={{ sx: { height: 40 } }} sx={{ width: 200 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 1" />
            </Typography>

            <Typography style={{ display: "flex" }}>
              <p style={{ marginTop: "22px" }}>b)</p>
              <TextField style={{ marginRight: '.5rem', marginLeft: "5px" }} InputProps={{ sx: { height: 40 } }} sx={{ width: 200 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 2" />
            </Typography>

            <Typography style={{ display: "flex" }}>
              <p style={{ marginTop: "22px" }}>c)</p>
              <TextField style={{ marginRight: '.5rem', marginLeft: "5px" }} InputProps={{ sx: { height: 40 } }} sx={{ width: 200 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 3" />
            </Typography>

            <Typography style={{ display: "flex" }}>
              <p style={{ marginTop: "22px" }}>d)</p>
              <TextField style={{ marginRight: '.5rem', marginLeft: "5px" }} InputProps={{ sx: { height: 40 } }} sx={{ width: 200 }} margin="normal" type={'text'} variant="outlined" placeholder="Option 4" />
            </Typography>

          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ width: "60%", marginTop: "15px", marginLeft: "5px" }}>
              <InputLabel id="demo-simple-select-label">Enter the correct answer</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Enter the correct option"
                onChange={handleChange}
              >
                <MenuItem value={10}>a)</MenuItem>
                <MenuItem value={20}>b)</MenuItem>
                <MenuItem value={30}>c)</MenuItem>
                <MenuItem value={30}>d)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
