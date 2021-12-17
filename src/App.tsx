import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './components/Pagination';

interface Airline{
  id: number;
  name: string;
  country: string;
  logo: string;
  slogan: string;
  head_quaters: string;
  website: string;
  establised: string;
}

interface passenger {
  _id: string;
  name: string;
  trips: number;
  airline: Airline,
  __v: number;
}

interface Response {
  totalPassengers: number;
  totalPages: number;
  data: Array<passenger>;
}

function App() {
  const [page, setPage]=useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [items, setItems] = useState<Array<passenger>>([]);

  const handlePageChange = (currensPage: number):void=>{
    setPage(currensPage);
  }

  useEffect(() => {
    const fetch = async ()=>{
      const params = {page, size: 10};
      const { data: { totalPages, data}} = await axios.get<Response>('https://api.instantwebtools.net/v1/passenger', {params});

      setTotalPages(totalPages);
      setItems(data);
    }
    fetch();
    
  },)
  return (
    <div className="App">
      <ul>
        {
          items.map((item =>(<li key={item._id}>{item.name}</li>)))
        }
      </ul>
      <Pagination count={totalPages} page={page} onPageChange={handlePageChange}/>
    </div>
  );
}

export default App;
