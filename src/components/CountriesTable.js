import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import './percentage.css'
function CountriesTable() {
    const [search, setSearch]=useState("");
    const [countries, setCountries]=useState([]);
    const [filteredCountries, setFilteredCountries]=useState([]);
  const getCountries=async ()=>{
       try {
         const response= await fetch('http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline').then(r=>r.json());
         setCountries(response);
         setFilteredCountries(response);
       } catch (error) {
         
       }
  }

 const column=[
   {
     name: "Product ID",
     selector: (row)=>row.id,
     sortable: true,
   },
   {
    name: "Product brand",
    selector: (row)=>row.brand,
  },
  {
    name: "Product Description",
    selector: (row)=>row.name,
    sortable: true,
  },
  {
    name: "Produc Type",
    selector: (row)=>row.product_type,
    sortable: true,
  },
  {
    name: "price",
    selector: (row)=>`$${row.price}`,
    sortable: true,
  },
  {
    name: "Product Image",
    selector: (row)=><img width={50} height={50} src={row.image_link} alt="Product Imgage"></img>,
  },
  {
    name: "Rating percenatge",
    selector: (row)=><sapn>{row.rating?row.rating:0}/5<br/><div className='bar'><div value={(row.rating*2*10)/100} style={{width:(row.rating*10)}} className="percentage"></div></div></sapn> ,
  }
  /*{
    name: "Action",
    cell: (row)=><button onClick={()=>alert(row.currencies[0].symbol)}> Show Currency</button>
  }*/  
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
    title="Product Information" 
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