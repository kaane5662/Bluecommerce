"use client"

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faShoppingCart, faBoxesStacked } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useRouter } from "next/navigation"
import SearchBlock from "./SearchBlock"
import { setSearchQuery as globalSearch, setProductQuery, setSortQuery } from "../redux/features/searchReducer"
import { useDispatch } from "react-redux"

import axios from "axios"

export default function Navbar({theme}){
    const dispatch = useDispatch()
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [isHovering, setIsHovering] = useState(false);

    const handleBlur = () => {
        if (!isHovering) {
        setSearchResults([])
        // Run onBlur logic only if not hovering over the specific div
        // Add your onBlur logic here
        console.log('onBlur');
        }
    };

    const getSearchBlocks = (e) => {
        setSearchQuery(e.target.value)
        if(e.target.value.length < 1) return setSearchResults([])
        axios.post("/api/search", {searchParam: searchQuery}).then((response)=>{
            console.log(response.data.products)

            setSearchResults(response.data.products)
            console.log(searchResults)
        }).catch((error)=>{
            console.log(error.message)
        })
    }

    const handleNavigation = ()=>{
        dispatch(globalSearch(searchQuery))
        dispatch(setSortQuery(null))
        dispatch(setProductQuery(null))
        router.push("/search")
    }

    const logout= () => {
        axios.delete("/api/accounts/logout").then((response)=>{
            router.push("/login")
        }).catch((error)=>{
            console.log(error)
        })
    }

    return ( 
        <nav className="flex sticky flex-col justify-between z-30 top-0 font-ubuntu  ">
            <div className={" bg-white-0 shadow-md text-md top-0 bg-white-2 h-[75px] min-w-[100%] flex justify-center items-center p-6 gap-14  font-semibold text-theme-1  "}>

                {/* left */}
                <div className="absolute flex flex-col left-12">
                        <Link className="border-b-4 border-b-theme-2 py-2 px-4 duration-300 hover:scale-110 cursor-pointer font-bold text-2xl" href="/dashboard">Bluecommerce</Link>
                </div>
                
                
                {/* center */}
                <div className="searchbar flex flex-col absolute self-center  ">

                    <div className="flex items-center">
                        <FontAwesomeIcon onClick={(e)=> handleNavigation()} className=" hover:cursor-pointer text-opacity-40   relative h-[20px] left-11 w-auto text-theme-2 mx-4 hover:-translate-x-1   duration-500" icon={faMagnifyingGlass}></FontAwesomeIcon>
                        <div className="flex flex-col justify-center">

                            <input type="text" onBlur={handleBlur} onChange={(e)=> getSearchBlocks(e)} onKeyDown={(e) => e.key == "Enter" ? handleNavigation() : null} className=" px-10 border-solid border-theme-1 border-2 shadow-md border-t-0 border-l-0 border-opacity-10 h-10 w-[350px] rounded-md" ></input>
                            <div onMouseEnter={()=>setIsHovering(true)} onMouseLeave={()=> setIsHovering(false)} className="absolute top-12 self-center z-30  ">
                            {searchResults.map((block, index)=>{
                                return (
                                    <SearchBlock productImage={block.productImage} key= {index} productId={block.productId} productName={block.productName}></SearchBlock>
                                )
                            })
                                                
                            }

                            </div>
                            
                        </div>
                        
                    </div>

                    
                </div>  
                {/* right side */}
                <div className="flex justify-center items-center absolute right-12 gap-12">
                    <Link href="/ownedItems" className="flex flex-row hover:cursor-pointer hover:border-b-4 hover:border-b-theme-2 py-2 px-4 duration-300 gap-2">
                        <FontAwesomeIcon  className="text-theme-2 h-[25px] hover:cursor-pointer hover:-translate-y-1 duration-300" icon={faBoxesStacked}></FontAwesomeIcon>
                        <h3 className=" ">Owned</h3>
                    </Link>
                    
                    <Link href = "/cart" className="flex flex-row gap-2 hover:cursor-pointer hover:border-b-4 hover:border-b-theme-2 py-2 px-4 duration-300">
                        <FontAwesomeIcon  className="     relative h-[25px] w-auto text-theme-2 font-bold  snap-center" icon={faShoppingCart}></FontAwesomeIcon> 
                        <h3 className=" ">Cart</h3>
                    </Link>
                    
                    <button onClick={()=> logout()} className="w-[125px] h-[50px] bg-theme-2 duration-500 rounded-md hover:cursor-pointer text-theme-0 font-bold hover:scale-110" >Logout</button>  
                </div>
                
            </div>
            
            


            
                
        </nav>
    )
}