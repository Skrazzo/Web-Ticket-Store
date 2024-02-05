import EventCard from '@/Components/EventCard';
import FormInput from '@/Components/FormInput';
import Pagination from '@/Components/Pagination';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
import TextInput from '@/Components/TextInput';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { IconSearch } from '@tabler/icons-react';
import React, { useEffect } from 'react';

export default function Search({ auth, search, genres }) {

    console.log(genres);
    console.log(search);

    const {
        data,
        setData,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        title: '',
        genre: 0,
    });

    function submitHandler(e){
        e.preventDefault();

        post(route('search'), {
            onError: () => reset(),
        })
    }

    useEffect(() => console.log(data), [data]);

    return (
        <Authenticated
            user={auth.user}
            header={
                <form onSubmit={submitHandler} className='grid sm:flex grid-cols-2 items-center gap-2'>
                    <FormInput setData={setData} dataName={'title'} data={data} placeholder='Search events by title'/>
                    <Select onChange={(e) => setData('genre', e.target.value)} data={[[0, 'Select genre'] , ...genres.map(x => [x.id, x.name])]} placeholder="Filter by genre" />
                    <PrimaryButton className='flex flex-1 col-span-2 sm:flex-none gap-2 justify-center'><IconSearch size={20}/>search</PrimaryButton>
                </form>
            }
        >
            <Head title='Search'/>

            <div className='max-w-7xl mx-auto sm:px-9 mt-12'>
                <div className='p-4  bg-gray-800 rounded-lg text-white grid grid-cols-2 gap-4'>
                    {search.data.map(x => {
                        return (
                            <EventCard search event={x} className={'col-span-2 lg:col-span-1'}/>
                        );
                    })}
                    
                
                    <Pagination className='col-span-2 my-2' data={search}/>
                </div>

            </div>
        </Authenticated>
    )
}
