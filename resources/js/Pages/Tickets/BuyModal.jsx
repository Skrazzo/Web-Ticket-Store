import FormInput from "@/Components/FormInput";
import IconButton from "@/Components/IconButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { IconCurrencyEuro, IconPencilPlus, IconStar, IconStarFilled, IconX } from "@tabler/icons-react";
import { useEffect } from "react";
import { v4 } from "uuid";

export default function BuyModal({ event, className = '', open , close }) {
    

    function submitHandler(e){
        e.preventDefault();
        post(route('event.buy'), {
            onError: () => reset(),
            onSuccess: () => { reset(); close(); },
        });
        
    }
    
    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        amount: '',
        event_id: event.id
    });

    
    
    return (
        <Modal show={open} >
            <div className='p-4'>
                <div className=' flex justify-between text-gray-300'>
                    {(event.left_tickets !== 0) ? 
                        <span className='text-xl'>Buy ticket</span>
                        :
                        <span className='text-2xl text-red-500 font-bold'>SOLD OUT</span>
                    }
                    <IconButton onClick={close}><IconX /></IconButton>
                </div>
                
                
                {(event.left_tickets !== 0) ? 
                    <form onSubmit={submitHandler} className='mt-4 flex flex-col gap-2'>
                        <p className=" text-white">You want to buy ticket to the <b>"{event.name}"</b> event, please enter number of tickets you want to buy</p>
                        <FormInput
                            type="number"
                            className="w-full"
                            title = ''
                            dataName = 'amount'
                            setData = {setData}
                            errors = {errors}
                            data = {data}
                            placeholder = 'Please enter ticket count you wish to buy'
                        />
                        
                        

                        <div>
                            <PrimaryButton disabled={processing} className='flex items-center gap-2 mt-2'>
                                <IconCurrencyEuro size={20} />
                                <span>
                                    {(data.amount === null || data.amount === '') ? '0.00' : parseFloat(parseInt(data.amount) * event.price).toFixed(2)}
                                </span>
                            </PrimaryButton>
                        </div>
                    </form>
                    :
                    <>
                        <p className="text-red-400 text-lg my-2">I'm sorry but all the tickets are sold out!</p>
                    </>
                }

            </div>
        </Modal>
    )
}
