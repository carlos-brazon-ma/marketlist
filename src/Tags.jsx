import React, { useContext, useEffect, useState } from 'react'
import { AllItemsContext } from './components/Contex'
import { firstLetterUpperCase } from './utils/util';
import  Add  from "./assets/add-black.svg";

const Tags = () => {
    const { list, setControlTags, button, setButton } = useContext(AllItemsContext);

    const tags = list?.reduce((acc, obj) => {
        if (obj.tags) {
            if (!acc.includes(obj.tags)) {
                acc.push(obj.tags);
            }
        }
        return acc.sort((a , b) => a.localeCompare(b) )
    }, []);

    useEffect(() => {
        if (tags?.length === 1) {
            setButton(tags[0]);
        }
    }, [tags]);
    return (
        <div className='w-full flex gap-2 flex-wrap break-all'>
            <img onClick={() => setControlTags(prev => !prev)} className='w-8 h-8' src={Add} alt="Aquí va la imagen de un Add" />

            {tags?.map((string, i) => <button key={i} onClick={() => setButton(tags.length === 1 ? tags[0] : string)} className={`p-1 font-semibold text-base rounded-md ${button === string ? 'bg-blue-600 text-white hover:shadow-blue-800 shadow-md shadow-blue-950' : 'bg-blue-400 hover:shadow-blue-400 shadow-md shadow-gray-500'}`}>{firstLetterUpperCase(string)}</button>)}
        </div>
    )
}

export default Tags