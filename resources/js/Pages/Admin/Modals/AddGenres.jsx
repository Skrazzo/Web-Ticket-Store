import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import IconButton from '@/Components/IconButton';
import { IconPencilPlus, IconX } from '@tabler/icons-react';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Genres({ open, close }) {
    function changeHandle(e){
        setData(e.target.name, e.target.value);
    }

    function submitHandler(e){
        e.preventDefault();
        post(route('admin.genre.create'), {
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
        name: '',
    });

    return (
        <Modal show={open} >
            <div className='p-4'>
                <div className=' flex justify-between text-gray-300'>
                    <span className='text-xl'>Create new genre</span>
                    <IconButton onClick={close}><IconX /></IconButton>
                </div>

                <form onSubmit={submitHandler} className='mt-4 flex flex-col gap-2'>
                    <InputLabel >Name</InputLabel>
                    <TextInput value={data.name} onChange={changeHandle} placeholder="Enter name for a new category" name='name'/>
                    <InputError message={errors.name}/>
                    
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
