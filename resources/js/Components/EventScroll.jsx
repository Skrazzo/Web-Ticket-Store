import React, { useEffect, useRef, useState } from 'react';
import EventCard from './EventCard';
import { v4 } from 'uuid';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import IconButton from './IconButton';
import { useMediaQuery } from '@react-hook/media-query';



export default function EventScroll({ title, events, search = null }) {
    const initialDimensions = 16/7 * 300 + 16;
    const [pixels, setPixels] = useState(initialDimensions);
    const [scroll, setScroll] = useState(0);
    const phone = useMediaQuery('(max-width: 640px)');
    const card_ref = useRef();

    
    function resize_phone(){
        if(phone){
            if(card_ref.current !== null){
                // setting new dimantions for the cards
                setPixels(card_ref.current.clientWidth + 16);
            } 
        }else{
            setPixels(initialDimensions);
        }
    }
    
    useEffect(() => {
        window.addEventListener('resize', () => {
            resize_phone();    
        });

        resize_phone();
    }, []);

    function forwards(){
        setScroll(scroll + 1);
    }

    function back(){
        setScroll(scroll - 1);
    }

    return (
        <div className="bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
            <div className='flex justify-between'>
                <span className='text-white text-2xl'>{title}</span>
                <div className='flex gap-2 text-white'>
                    <IconButton disabled={(scroll === 0) ? true : false} onClick={() => back()}><IconChevronLeft /></IconButton>
                    <IconButton disabled={(scroll >= events.length - 1) ? true : false} onClick={() => forwards()}><IconChevronRight /></IconButton>
                    
                </div>
            </div>
            

            

                <div className='flex gap-4 transition duration-200' style={{
                    transform: `translateX(-${pixels * scroll}px)`
                }}>
                    
                    {events.map(x => {
                        return <EventCard propRef={card_ref} key={v4()} className='mt-2' event={x} />;
                    })}
                </div>
            
        </div>
    )
}
