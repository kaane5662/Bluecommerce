"use client"
import ProductBlock from "../components/ProductBlock";
import Navbar from "@/src/app/components/Navbar";

import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { setSearchQuery, setSortQuery, setProductQuery } from "../redux/features/searchReducer";
import { useSelector, useDispatch } from "react-redux";


export default function Search({params}){


    const [results, setResults] = useState([])
    const [types, setTypes] = useState([])
    const [dropDownOptions, setDropDownOptions] = useState([])

    const queries = useSelector((state)=> state.search.value)
    const dispatch = useDispatch()

    const getMatchingResults = () =>{
        const params = {
            searchParam: queries.searchQuery,
            productParam: queries.productQuery,
            sortParam: queries.sortQuery,
        }
        axios.post(`/api/search`, params).then((response)=>{
            console.log(response.data.products)
            setResults(response.data.products)
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    const getSearchQueries = ()=>{
        axios.get("api/product").then((response)=>{
            setTypes(response.data.Types)
            setDropDownOptions(response.data.Sorts)
        }).catch((error)=>{
            console.log(error)
        })
    }
    

    useEffect(()=>{

        console.log(params.id)
        getMatchingResults()
        getSearchQueries()
        
 
    },[])


    useEffect(()=>{
        getMatchingResults()
    }, [queries])

    return(
        <main className="bg-white-0">
            <Navbar></Navbar>
            
            
            <div className="topbar">
                <div className="shadow-md w-[100vm] flex justify-center">
                    {
                        types.map((productType, index)=>{
                            return productType != queries.productQuery ? (
                                <button onClick={()=> dispatch(setProductQuery(productType))} className="h-auto w-[125px] p-3 font-semibold bg-theme-0 text-theme-1 hover:text-theme-0 hover:bg-theme-2 duration-500 rounded-sm text-md text-center" key = {index}>{productType}</button>
                            ):
                            (
                                <button onClick={()=> dispatch(setProductQuery(null))} className="h-auto w-[125px] font-semibold hover:bg-theme-0 hover:text-theme-1 text-theme-0 p-3 bg-theme-2 duration-500 text-md rounded-sm text-center" key = {index}>{productType}</button>
                            )
                        })
                    }
                    


                </div>
            </div>
            <div className="p-8">
                <div className="topbar relative flex flex-col hover:block disabled" >
                    <button className="h-auto w-[150px] relative text-right p-3 rounded-sm text-theme-1 font-semibold text-md bg-white-0 drop-shadow-lg">Filter 
                    <FontAwesomeIcon icon={faAngleDown} className="pl-2 text-theme-1 text-md "></FontAwesomeIcon>
                    </button>
                    
                    <div className=  "absolute top-0 flex flex-col opacity-0 hover:opacity-100">
                        <span className="h-16 w-[200px] text-left p-4 rounded-sm hover:text-opacity-0 "></span>
                        {
                            dropDownOptions.map((productSort, index)=>{
                                return productSort != queries.sortQuery ? (
                                    <>
                                    <button onClick={()=> dispatch(setSortQuery(productSort))} key={index} className="hover:drop-shadow-lg shadow-lg bg-white-0 h-auto w-[200px] text-left p-4 rounded-sm text-theme-1 font-semibold duration-500">{productSort} </button>
                                    <hr className="opacity-5"></hr> 
                                    </>
                                ):
                                (
                                    <>
                                    <button onClick={()=> dispatch(setSortQuery(null))} key={index} className="hover:drop-shadow-lg shadow-lg bg-theme-2 h-auto w-[200px] text-left p-4 rounded-sm text-theme-0 font-semibold duration-500">{productSort} </button>
                                    <hr className="opacity-5"></hr> 
                                    </>
                                )
                            })
                        }
                        
                    </div>
                       
                        
                    
                    

                    
                </div>
                <h1 className=" text-4xl text-theme-1 font-bold pt-4">Showing results for {queries.searchQuery}</h1>
                <div className="flex flex-wrap gap-12 py-10">
                    {
                        results.map((result, index)=>{
                            return (
                                <ProductBlock key = {index} productCost={result.productCost} productImage={result.productImage} productId={result.productId} productName={result.productName} productType={result.productType}  ></ProductBlock>
                            )
                        })
                        
                    }

                    
                </div>  

            </div>
            
                
            
        </main>
    )
}