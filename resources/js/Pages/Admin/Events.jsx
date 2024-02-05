import FileInput from '@/Components/FileInput';
import IconButton from '@/Components/IconButton';
import InputError from '@/Components/InputError';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { IconPencilPlus, IconPlus, IconX } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import Genres from './Modals/AddGenres';
import DeleteGenre from './Modals/DeleteGenre';
import { v4 } from 'uuid';
import Pagination from '@/Components/Pagination';

export default function Events({ auth, genres, events}) {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [addGenreModal, setAddGenreModal] = useState(false);
    const [deleteGenreModal, setDeleteGenreModal] = useState({open: false, genre_id: 0});

    

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        name: '',
        genre_id: 0,
        // location_id
        description: '',
        date: null,
        time: null,
        country: '',
        city: '',
        place:'',
        price: 0.01,
        left_tickets: 1,
        image: null
    });

    function createSubmitHandler(e){
        e.preventDefault();

        post(route('admin.events.create'), {
            onSuccess: () => { reset(); setAddModalOpen(false); },
        });
    }

    function is_even(num){
        if(num % 2 === 0) return true;
        return false;
    }

    return (
        <Authenticated 
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Admin control panel</h2>}
        >
            <Head title="Events manager" />

            {/* add event modal */}
            <Modal show={addModalOpen} >
                <div className='p-4 '>
                    <div className='text-gray-100 flex justify-between '>
                        <span className='text-xl'>Add new event</span>
                        <IconButton onClick={() => setAddModalOpen(false)}><IconX /></IconButton>
                    </div>

                    <div className='mt-6'>
                        <form onSubmit={createSubmitHandler}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-2'>
                                <TextInput error={errors.name} value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder='Event name' maxLength='50'/>
                                <TextInput error={errors.description} value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder='Description' maxLength='255'/>

                                <Select error={errors.genre_id} value={data.genre_id} onChange={(e) => setData('genre_id', e.target.value)} data={
                                    [[0, 'Select genre'], ...genres.map((x) => [x.id, x.name])]
                                } className={'w-full'}/>

                                <TextInput error={errors.date} value={data.date} onChange={(e) => setData('date', e.target.value)} type='date' placeholder='Select date'/>
                                <TextInput error={errors.time} value={data.time} onChange={(e) => setData('time', e.target.value)} type='time' placeholder='Select time'/>
                                <TextInput error={errors.country} value={data.country} onChange={(e) => setData('country', e.target.value)} placeholder='Country'/>
                                <TextInput error={errors.city} value={data.city} onChange={(e) => setData('city', e.target.value)} placeholder='City'/>
                                <TextInput error={errors.place} value={data.place} onChange={(e) => setData('place', e.target.value)} placeholder='Place'/>

                                <TextInput error={errors.price} value={data.price} onChange={(e) => setData('price', e.target.value)} type='text' placeholder='Enter ticket price'/>
                                <TextInput error={errors.left_tickets} value={data.left_tickets} onChange={(e) => setData('left_tickets', e.target.value)} type='number' step='1' min='1' placeholder='Available ticket count'/>
                                
                                <FileInput error={errors.image} value={data.image} onChange={(e) => setData('image', e.target.files[0])} placeholder={'Select picture for background'} accept={'image/*'} />
                                

                            </div>

                            <PrimaryButton disabled={processing} className='flex items-center gap-2 mt-2'>
                                <IconPencilPlus size={20} /><span>add</span>
                            </PrimaryButton>

                        </form>

                    </div>
                </div>
            </Modal>

            <Genres open={addGenreModal} close={() => setAddGenreModal(false)}/>
            <DeleteGenre id={deleteGenreModal.genre_id} open={deleteGenreModal.open} close={() => setDeleteGenreModal({...deleteGenreModal, open: false})}/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* events */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-100">
                        <div className='flex justify-between'>
                            <span className='text-xl items-center'>All newest events</span>
                            <IconButton onClick={() => setAddModalOpen(true)} ><IconPlus /></IconButton>
                        </div>

                        <div className='grid grid-cols-12 text-lg md:text-xl text-gray-500 mt-6 gap-2'>
                            <span className='col-span-4 md:col-span-2'>Image</span>
                            <span className='col-span-4 md:col-span-7'>Name</span>
                            <span className='col-span-2 md:col-span-2'>Genre</span>
                            <span className='col-span-2 md:col-span-1'>Price</span>
                        </div>
                        <div className='border border-gray-700 my-4'></div>
                        
                        {events.data.map(x => {
                            return (
                                <div key={v4()} className='hover:bg-gray-900 transition duration-150 rounded mt-2 p-2 cursor-pointer grid grid-cols-12 text-lg md:text-xl text-gray-500 gap-2'>
                                    <img className='aspect-video object-cover col-span-4 md:col-span-2 rounded shadow' src={`/api/${x.img_path}`} />
                                    <span className='col-span-4 md:col-span-7'>{x.name}</span>
                                    <span className='col-span-2 md:col-span-2'>{x.genre.name}</span>
                                    <span className='col-span-2 md:col-span-1'>{x.price}</span>
                                </div>
                            );
                        })}

                        <Pagination data={events} className='mt-2'/>
                    </div>

                    {/* genres */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6 mt-6 text-gray-100">
                        <div className='flex justify-between'>
                            <span className='text-xl items-center'>All available genres</span>
                            <IconButton onClick={() => setAddGenreModal(true)} ><IconPlus /></IconButton>
                            
                        </div>

                        <div className='mt-6 grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2'>
                            <span className='text-xl text-gray-500 col-span-2'>Genre name</span>
                            <span className='text-xl text-gray-500 hidden md:block'>Genre name</span>
                                
                            <div className='my-4 border border-gray-700 col-span-2 md:col-span-4'></div>

                            {genres.map(x => {
                                return <>
                                    <span key={v4()} onClick={() => setDeleteGenreModal({open: true, genre_id: x.id})} className={`hover:text-red-600 cursor-pointer rounded transition duration-150 ease-in-out`}>{x.name}</span>
                                    <span key={v4()} className='text-right text-gray-500 px-4'>{x.event.length}</span>
                                </>;
                            })}
                        </div>
                    </div>
                </div>
            </div>
            
        </Authenticated>
    )
}
