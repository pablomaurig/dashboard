import React, { useState, useContext, useEffect } from 'react';
import StatusCheckbox from './statusCheckbox';
import Button from './button';
import { AlarmsContext } from "../context/alarms";

const AlarmsFilter = () => {
  const alarmsContext = useContext(AlarmsContext)
  const [seachValue, setSearchValue] = useState('');
  const [checked, setChecked] = useState(true);
  const { alarms, searchAlarm, clearSearch, searching } = alarmsContext;

  const handleSearch = (e) => {
    e.preventDefault();
    if(seachValue === ''){
      clearSearch()
    } else {
      searchAlarm(seachValue, checked)
    }
  }

  const handleClearSearch = () => {
    setSearchValue('')
    clearSearch()
  }
  
  useEffect(() => {
    searchAlarm(seachValue, checked)
  }, [alarms])

  return (
    <div className='SearchContainer'>
      <form onSubmit={handleSearch}>
        <input type='text' placeholder='Search' value={seachValue} onChange={e => setSearchValue(e.target.value)} />
        <StatusCheckbox checked={checked} setChecked={setChecked} />
        <Button type="submit">Search</Button>
        {seachValue !== '' && <Button onClick={handleClearSearch}>Clear search</Button>}
      </form>
    </div>
  )
}

export default AlarmsFilter;