import React from 'react'
import {TiLocationArrow} from "react-icons/ti";

const CommingSoonBtn = () => {
    return (
        <button className="flex-center gap-2 absolute z-50 bottom-0 left-0 overflow-hidden rounded-full
        px-6 py-2 text-gray-600 pointer-events-none bg-black border border-gray-600 mx-4 my-4">
            {<TiLocationArrow />}
            <span className="inline-flex overflow-hidden font-general text-[10px] uppercase">
                Coming Soon
            </span>
        </button>
    )
}
export default CommingSoonBtn
