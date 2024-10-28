import Link from "next/link";

export default function Header () {
    return(
        <div className="flex justify-around p-6 m-2 rounded-xl items-center bg-gray-500 bg-opacity-55 z-10 backdrop-blur-xl">
            {/* <div className="bg-red-400 w-96 h-20 absolute top-0 left-0 z-0 blur-lg"></div> */}
            
            <div>
                img
            </div>
            
            <div className="flex">
                <div>
                    <Link href={`/favorites/`}>Favotits</Link>
                </div>
                <div>

                Fake Store
                </div>
            </div>
        </div>
    )
}