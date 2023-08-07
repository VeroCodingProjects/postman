import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DataFetcher from '../components/input/DataFetcher';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

/*
 * The page consists of a request type selector, 
 * an API link input field, and a button to fetch data.
 * Upon clicking the button, a request is sent 
 * to the provided API link, and the fetched data is displayed.
 * The component also provides visual feedback by 
 * showing a loading message while the request is being processed.
 * users can make HTTP requests
 */

export default function Home() {
  const [requestType, setRequest] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [apiLink, setApiLink] = useState('');

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiLink);
      const json = await response.json();
      /* TODO
        * We need to show the error to the user
      */
      if (Array.isArray(json)) {
        setData(json);
      } else {
        throw new Error('Invalid API response');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleApiLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApiLink(event.target.value);
  };

  return (
    <div>
      <p className="title">Postman Clone</p>
      <div className="search-box">
        <Box className="select-request">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">TYPE</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={requestType}
              label="type-request"
              onChange={(event: SelectChangeEvent) =>
                setRequest(String(event.target.value))
              }
            >
              <MenuItem value={'get'}>GET</MenuItem>
              <MenuItem value={'post'}>POST</MenuItem>
              <MenuItem value={'delete'}>DELETE</MenuItem>
              <MenuItem value={'put'}>PUT</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <DataFetcher
          isLoading={isLoading}
          data={data}
          apiLink={apiLink}
          onApiLinkChange={handleApiLinkChange}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
}
