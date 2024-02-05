import React, { useEffect, useState } from 'react';
import '/public/scss/FileInput.scss'
import { IconPhoto } from '@tabler/icons-react';

export default function FileInput({ error, defaultValue = null, placeholder='Select file', accept, className = '', onChange=(e) => console.log('File Input:', e.target.files[0])}, ...props) {
    const [file, setFile] = useState(defaultValue);
    const customLook = 'border border-gray-700 bg-gray-900 focus:border-indigo-600 focus:ring-indigo-600 rounded-md shadow-sm';

    useEffect(() => {
        setFile(defaultValue);
    }, [defaultValue]);

    // made for single file inputs
    
    return (
        <div
            {...props}
            className={`relative text-gray-100 flex items-center p-2 ${customLook} ${error && 'border-red-500'} ` + className}
        >
            <input
                className='w-full h-full absolute opacity-0'
                type="file" 
                onChange={(e) => {
                    if(e.target.files.length > 0){
                        setFile(e.target.files[0]);
                        onChange(e);
                    }
                }}
                accept={accept} 
            />

            {(file === null) ? 
                <div className='flex justify-between items-center w-full text-gray-500'>
                    <span className={error && 'text-red-500'}>{(error) ? error : placeholder}</span>
                    <IconPhoto />
                </div>
                :
                <div className='overflow-hidden'>
                    <span className='text-nowrap w-full'>{file.name}</span>
                </div>
                
            }

            
        </div>
    )
}
