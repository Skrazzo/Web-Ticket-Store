import IconButton from "@/Components/IconButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { IconPencilPlus, IconStar, IconStarFilled, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

export default function AddReviewModal({ event_id, className = '', open , close }) {
    
    const rating_arr = [1, 2, 3, 4, 5];
    
    function changeHandle(e){
        setData(e.target.name, e.target.value);
    }

    function submitHandler(e){
        e.preventDefault();
        post(route('event.create.review'), {
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
        review: '',
        rating: 0,
        event_id: event_id
    });

    
    return (
        <Modal show={open} >
            <div className='p-4'>
                <div className=' flex justify-between text-gray-300'>
                    <span className='text-xl'>Create new review</span>
                    <IconButton onClick={close}><IconX /></IconButton>
                </div>
                
                <InputLabel className="mt-4 mb-2">What's your rating?</InputLabel>
                <InputError message={errors.rating}/>
                <div className="flex gap-1 text-yellow-500">
                    {rating_arr.map(x => {
                        if(data.rating > x - 1){
                            return <IconStarFilled key={v4()} onClick={() => setData('rating', x)} className={`cursor-pointer`}/>;
                        }else{
                            return <IconStar key={v4()} onClick={() => setData('rating', x)} className={`cursor-pointer`}/>;
                        }
                    })}
                </div>

                <form onSubmit={submitHandler} className='mt-4 flex flex-col gap-2'>
                    <InputLabel >Comment</InputLabel>
                    <TextInput value={data.review} onChange={changeHandle} placeholder="What do you think about this event" name='review'/>
                    <InputError message={errors.review}/>
                    
                    <div>
                        <PrimaryButton disabled={processing} className='flex items-center gap-2 mt-2'>
                            <IconPencilPlus size={20} /><span>add</span>
                        </PrimaryButton>
                    </div>
                </form>

            </div>
        </Modal>
    )
}
