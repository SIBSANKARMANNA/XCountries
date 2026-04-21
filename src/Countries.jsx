import axios from 'axios';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://xcountries-backend.labs.crio.do/all')
            .then(response => {
                setCountries(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={2} sx={{ maxWidth: 1400, margin: '0 auto', padding: 2 }}>
            {countries.map((country) => (
                <Card key={country.abbr} sx={{ width: 165, height: 160 }}>
                    <CardContent>
                        <CardMedia
                            component="img"
                            sx={{ objectFit: 'cover', height: 80, width: '70%',margin: '0 auto' }}
                            image={country.flag}
                            alt={`${country.name} flag`}
                        />
                        <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: 'center', marginTop: 1 }}>
                            {country.name}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Grid>
    );
}