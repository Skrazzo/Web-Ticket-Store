import IconButton from "@/Components/IconButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "./TextInput";

export default function FormInput({ className = '',  title = null, dataName, setData, errors = null, data, placeholder = '', type = 'text'}, props) {
    
    function changeHandle(e){
        setData(e.target.name, e.target.value);
    }
    
    return (
        <>
            {title !== null && <InputLabel >{title}</InputLabel>}
            <TextInput
                {...props} 
                type={type}
                className={`${className}`}
                value={data[dataName]} 
                onChange={changeHandle} 
                placeholder={placeholder}
                name={dataName}
            />
            {errors !== null && <InputError message={errors[dataName]}/>}
            
        </>
    )
}
