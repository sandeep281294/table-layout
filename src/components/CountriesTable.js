import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
function CountriesTable() {
    const [search, setSearch]=useState("");
    const [countries, setCountries]=useState([]);
    const [filteredCountries, setFilteredCountries]=useState([]);
  const getCountries=async ()=>{
       try {
         const response= await fetch('https://restcountries.com/v2/all').then(r=>r.json());
         setCountries(response);
         setFilteredCountries(response);
       } catch (error) {
         
       }
  }

 const column=[
   {
     name: "Country Name",
     selector: (row)=>row.name,
     sortable: true,
   },
   {
    name: "Country Native Name",
    selector: (row)=>row.nativeName,
  },
  {
    name: "Country Capital",
    selector: (row)=>row.capital,
    sortable: true,
  },
  {
    name: "Country Population",
    selector: (row)=>row.population,
    sortable: true,
  },
  {
    name: "Country Flag",
    selector: (row)=><img width={50} height={50} src={row.flag} alt="Countries data"></img>,
  }
 ]
  useEffect(()=>{
        getCountries();
  },[])

  useEffect(()=>{
      const result = countries.filter(country=>{ 
          return country.name.toLowerCase().match(search.toLocaleLowerCase());
      })
      setFilteredCountries(result);
  },[search])
  return (
    <DataTable 
    title="Country Information" 
    columns={column} 
    data={filteredCountries} 
    pagination 
    fixedHeader 
    fixedHeaderScrollHeight='450px'
    selectableRows
    selectableRowsHighlight
    highlightOnHover
    subHeader
    subHeaderComponent={
        <input type="text" placeholder='search here' value={search} 
        onChange={(e)=>setSearch(e.target.value)}></input>
    }


    />
  )
}

export default CountriesTable