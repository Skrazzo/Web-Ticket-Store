import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';
import s from '../../../public/scss/Event.module.scss';
import { FastAverageColor } from 'fast-average-color';
import { IconChevronLeft, IconChevronRight, IconPlus, IconX, IconStarFilled } from '@tabler/icons-react';
import IconButton from '@/Components/IconButton';
import EventReview from '@/Components/EventReview';
import AddReviewModal from './AddReviewModal';
import BuyModal from './Tickets/BuyModal';
import { v4 } from 'uuid';

export default function Event({ auth, event, reviews, avg_rating }) {
    const img_ref = useRef()
    const [buttonColor, setButtonColor] = useState('#000000');
    const [addReviewModal, setAddReviewModal] = useState(false);
    const [buyModal, setBuyModal] = useState(false);
    

    useEffect(() => {
        const fac = new FastAverageColor();
        

        fac.getColorAsync(img_ref.current, {
            ignoredColor: [
                [255, 255, 255, 255, 100], // white
                [0, 0, 0, 255, 25] // black
            ]
        })
            .then(color => {
                setButtonColor(color.hex);
                
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    return (
        <Authenticated 
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title='Event'/>

            <div className="py-12">
                <div className={`max-w-6xl mx-auto ${s.container}`}>
                    <img ref={img_ref} className={`${s.image}`} src={`../api/${event.img_path}`}/>
                    
                    <AddReviewModal event_id={event.id} open={addReviewModal} close={() => setAddReviewModal(false)}/>
                    <BuyModal event={event} open={buyModal} close={() => setBuyModal(false)}/>

                    <div className={`${s.container_overlay} grid grid-cols-3 p-6 pb-24`}>
                        <div className='col-span-3 sm:col-span-2 text-center sm:text-left'>
                            <p className='tracking-wide text-5xl sm:text-6xl bold italic text-white'>{event.name}</p>
                            <p className={`tracking-wide text-3xl bold italic mt-3 ${s.country}`}>{event.country}</p>
                            <p className={`tracking-wide text-md bold italic ${s.city}`}>{event.city} - {event.place}</p>
                        </div>

                        <div className='col-span-3 sm:col-span-1 text-center sm:text-right'>
                            <p className={`${s.country} text-4xl`}>{
                                new Date(event.date).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' }).replace(/,/g, '')
                            }</p>
                            <p className={`${s.country} text-2xl`}>{event.time.split(":").slice(0, 2).join(":")}</p>
                        </div>

                        <div className='flex justify-end flex-col items-center sm:items-start col-span-3'>
                            <div className='flex flex-col md:flex-row items-center gap-2'>
                                <button
                                    onClick={() => setBuyModal(true)}
                                    className={`${s.btn} `}
                                    style={{
                                        background: `linear-gradient( 320deg, ${buttonColor}, transparent 60%)`,
                                        border: `1px solid ${buttonColor}`
                                    }}
                                >€ {event.price}</button> <span className='text-gray-400 font-bold'>{event.left_tickets} {(event.left_tickets === 1) ? 'ticket' : 'tickets'} left</span>
                            </div>
                            
                        </div>
                    </div>

                    <div className={`${s.secondary_container} px-6`}>
                        {event.description}
                    </div>

                    <div className={`${s.secondary_container_no_transform} p-6 pb-1 flex justify-between`}>
                        <div className='flex items-center text-3xl font-bold tracking-wide gap-2'>
                            <span className=''>{(avg_rating === null) ? 'No reviews' : 'Reviews'}</span>
                            {(avg_rating === null) ?  
                                <>
                                
                                </>
                                :
                                <>
                                    <span className='text-yellow-600'>{parseFloat(avg_rating).toFixed(2)}</span>
                                    <IconStarFilled className='text-yellow-600'/>
                                </>
                            }
                        </div>

                        <IconButton onClick={() => setAddReviewModal(true)}><IconPlus /></IconButton>
                    </div>
                    
                    
                    <div className={`${s.secondary_container_no_transform} p-6 pb-0 flex flex-col gap-2`}>
                        {reviews.data.map(x => {
                            return (
                                <EventReview key={v4()} name={x.user.name} stars={x.rating} color={buttonColor}  review={x.review}/>
                            );
                        })}
                    </div>

                    {avg_rating === null &&
                    <div className={`${s.secondary_container_no_transform} px-6`}>
                        <p 
                            style={{
                                borderLeft: `4px solid ${buttonColor}`,
                                borderRadius: `0 4px 4px 0`
                            }}
                            className='italic text-gray-500 p-2 bg-gray-850'
                        >Be the first person to add a review</p>
                    </div>
                    }

                    <div className={`${s.secondary_container_no_transform} p-6 flex gap-4 justify-center items-center`} style={{ borderRadius: '0 0 1rem 1rem' }}>
                        {reviews.prev_page_url !== null && <Link href={reviews.prev_page_url}><IconButton><IconChevronLeft /></IconButton></Link>}
                        <span>{reviews.current_page}</span> 
                        {reviews.next_page_url !== null && <Link href={reviews.next_page_url}><IconButton><IconChevronRight /></IconButton></Link>}
                    </div>

                </div>
            </div>
        </Authenticated>
    )
}
