import React from 'react'

export default function Select({ error, className, data = [], onChange=(e) => console.log('Select changed:',e.target.value)}, ...props) {
    /*
    data = [
        [1, 'First genre'],
        [2, 'Second genre']
    ] 
    */

    

    return (
        <select
            {...props}
            className={`border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ${error && 'border-red-500'} ` + className}
            onChange={onChange}
        >
            {data.map((x, i) => {
                return <option key={i} value={x[0]}>{x[1]}</option>
            })}
        </select>
    )
}
