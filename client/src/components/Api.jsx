import axios from 'axios';
import { useState } from 'react';

export const handleSubmit = async (recipe, navigate) => {
  try {
        const resp = await axios
            .post('/api/add_recipe', recipe, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });
        const data = resp.data;
        navigate('/custom_recipes');
    } catch (err) {
        console.log(err);
    }
};
