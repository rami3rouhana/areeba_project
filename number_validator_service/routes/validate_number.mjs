import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config({ path: './.env'});

const router = express.Router();

router.get('/:number', async (req, res) => {
    const apikey = process.env.API_KEY;
    const BASE_URL = process.env.BASE_URL;
    const { number } = req.params;
  
    try {
      const { data } = await axios.get( BASE_URL, {params: {
        access_key: apikey,
        number
      }});
      
      if(!data.valid){
        return res.json({valid: false});
      }
      console.log({
        countryCode: data.country_code,
        countryName: data.country_name,
        operatorName: data.carrier
    });
      return res.json({
              valid: data.valid,
              countryCode: data.country_code,
              countryName: data.country_name,
              operatorName: data.carrier
          });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
});

export default router;