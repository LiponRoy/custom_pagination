"use client"
import { useEffect, useState } from 'react';

export default function Home() {
  const itemPerPage =4;
  const[data,setData] =useState([])
console.log(data)
  
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => setData(json))
  },[])

  const numberOfPages =Math.ceil(data.length/itemPerPage);
const pageIndex = Array.from({length: numberOfPages},(_,idx)=>idx+1);


  const[currentPage,setCurrentPage] =useState(0);
  const rows = data?.slice(
    currentPage *itemPerPage,
    (currentPage+1)* itemPerPage
  )

  const handlePageChange = (pageNumber:any)=>{
    setCurrentPage(pageNumber)

  }


  return (
    <div className=" h-screen w-full flex flex-col justify-center items-center">
      { rows.map((row,i)=>{
        return(
          <div key={i} className=" flex flex-col justify-center items-center gap-4 bg-slate-400 p-4 m-4">
            <div className="m-2">{row?.id}</div>
            <div className="m-2">{row?.title}</div>
          </div>
        )
      })}
      
      <div className=" mt-4">
        <button disabled={currentPage<1} onClick={()=>handlePageChange(currentPage-1)} className=' text-4xl mr-2'>
          &lt;
        </button>
        {pageIndex
        .slice(
          Math.max(0,currentPage-2),
          Math.min(numberOfPages,currentPage+3)
        ).map((page)=>(
          <button key={page} onClick={()=>handlePageChange(page-1)}
          className={page=== currentPage+1?" text-white bg-blue-600 p-2 text-2xl border border-slate-300 m-1":"text-white bg-slate-500 p-2 text-2xl"}>{page}</button>
        ))  }
        <button disabled={currentPage>=numberOfPages-1} onClick={()=>handlePageChange(currentPage+1)} className=' text-4xl ml-2'>
          &gt;
        </button>

      </div>

    </div>
  )
}
