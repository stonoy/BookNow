import React from 'react'
import {useLocation} from "react-router-dom"
import {useDispatch} from "react-redux"

const Pagination = ({page, numOfPages, func, basePath}) => {
    const dispatch = useDispatch()
    const {pathname, search} = useLocation
    const pageArray = Array.from({length: numOfPages}, (_,i) => i+1)

    const handlePageChange = (selectedPage) => {
        const searchParams = new URLSearchParams(search)
        searchParams.set("page", selectedPage)

        dispatch(func(`${basePath}?${searchParams}`))
    }

    if (numOfPages <= 5){
        return (
            <div className='flex items-center justify-end my-4'>
                {
                    pageArray.map(thePage => {
                        return <button className={`px-3 py-1 border rounded mx-1 ${page == thePage ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(thePage)}>
                            {thePage}
                        </button>
                    })
                }
            </div>
        )
    }

    if (page == 1 || page == 2 || page == 3){
        return (
            <div className='flex items-center justify-end my-4'>
                <button className={`px-3 py-1 border rounded mx-1 ${page == 1 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(1)}>
                    1
                </button>
                <button className={`px-3 py-1 border rounded mx-1 ${page == 2 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(2)}>
                    2
                </button>
                <button className={`px-3 py-1 border rounded mx-1 ${page == 3 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(3)}>
                    3
                </button>
                <button className={`px-3 py-1 border rounded mx-1 ${page == 4 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(4)}>
                    4
                </button>
                <span className='px-3 py-1'>...</span>
                <button className={`px-3 py-1 border rounded mx-1 ${page == numOfPages ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(numOfPages)}>
                    {numOfPages}
                </button>
            </div>
        )
    }

    if (page == numOfPages || page == (numOfPages-1) || page == (numOfPages-2)){
        return (
            <div className='flex items-center justify-end my-4'>
                <button className={`px-3 py-1 border rounded mx-1 ${page == 1 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(1)}>
                    1
                </button>
                <span className='px-3 py-1'>...</span>
                <button className={`px-3 py-1 border rounded mx-1 ${page == numOfPages - 3 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(numOfPages - 3)}>
                    {numOfPages - 3}
                </button>
                <button className={`px-3 py-1 border rounded mx-1 ${page == numOfPages - 2 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(numOfPages - 2)}>
                    {numOfPages - 2}
                </button>
                <button className={`px-3 py-1 border rounded mx-1 ${page == numOfPages - 1 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(numOfPages - 1)}>
                    {numOfPages - 1}
                </button>
                
                <button className={`px-3 py-1 border rounded mx-1 ${page == numOfPages ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => handlePageChange(numOfPages)}>
                    {numOfPages}
                </button>
            </div>
        )
    }

  return (
    
    <div className='flex items-center justify-end my-4'>
    <button className={`px-3 py-1 border rounded mx-1 `} onClick={() => handlePageChange(1)}>
        1
    </button>
    <span className='px-3 py-1'>...</span>
    <button className={`px-3 py-1 border rounded mx-1 `} onClick={() => handlePageChange(page-1)}>
        {page-1}
    </button>
    <button className={`px-3 py-1 border rounded mx-1 bg-blue-500 text-white" `} onClick={() => handlePageChange(page)}>
        {page}
    </button>
    <button className={`px-3 py-1 border rounded mx-1 `} onClick={() => handlePageChange(page+1)}>
        {page+1}
    </button>
    <span className='px-3 py-1'>...</span>
    <button className={`px-3 py-1 border rounded mx-1 `} onClick={() => handlePageChange(numOfPages)}>
        {numOfPages}
    </button>
</div>
  )
}

export default Pagination