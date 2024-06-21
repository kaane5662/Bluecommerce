import ProductBlock from "./ProductBlock"

export default function BestSellingList(){
    return (

        <div className="px-8 py-4">
            <h1 className=" text-4xl text-theme-1 font-bold">Top Rated</h1>
            <div className="flex my-8 gap-12 overflow-x-scroll">
                {/* Featured Block */}
                
                <ProductBlock/>
                <ProductBlock/>
                <ProductBlock/>
                <ProductBlock/>
                <ProductBlock/>
                <ProductBlock/>  
                <ProductBlock/>

            </div>
        </div>
    )
}