import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import IconButton from '@/Components/IconButton';
import { IconPencilPlus, IconX } from '@tabler/icons-react';
import { useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function DeleteGenre({ open, close, id }) {

    function deleteHandler(){
        
        destroy(route('admin.genre.delete', id), {
            onError: () => alert('Error has happened!'),
            onSuccess: () => close()
        });
    }
    
    const {
        delete: destroy,
        processing,
    } = useForm();

    return (
        <Modal show={open} >
            <div className='p-4'>
                <div className=' flex justify-between text-gray-300'>
                    <span className='text-xl text-red-600'>Delete genre?</span>
                    <IconButton onClick={close}><IconX /></IconButton>
                </div>
                <div className='mt-4'>
                    <span className='text-red-400'>Do you really want to delete this genre and all of the events in it?</span>
                </div>
                <div className='mt-2 flex gap-1'>
                    <PrimaryButton disabled={processing} onClick={deleteHandler} className='dark:bg-red-600 focus:ring-red-700 focus:bg-red-700 hover:bg-red-700' > Delete </PrimaryButton>
                    <SecondaryButton onClick={close}>Cancel</SecondaryButton>
                </div>

                

            </div>
        </Modal>
    )
}
