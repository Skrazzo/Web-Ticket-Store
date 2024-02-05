import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ placeholder = '', error,  type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

return (
        <input
            placeholder={placeholder}
            {...props}
            type={type}
            className={
                `border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ${error && 'border-red-500'} ` +
                className
            }
            ref={input}
        />
    );
});
