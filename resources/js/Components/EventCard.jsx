import React, { useEffect, useRef, useState } from 'react';
import sty from '../../../public/scss/EventCard.module.scss';
import { FastAverageColor } from 'fast-average-color';
import { Link } from '@inertiajs/react';


export default function EventCard({ event, className, propRef, search = null}, props) {
    
    if(event.left_tickets === 0){
        return <></>;
    }
    
    const img_ref = useRef()
    const [buttonColor, setButtonColor] = useState('#000000');
    

    

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
    
    const search_style = {
        minWidth: '0px',
        aspectRatio: 'auto',
        
    }

    return (
        <div style={(search === null) ? {} : search_style} ref={propRef} className={`${sty.container} ${className}`}>
            <img ref={img_ref} className={`${sty.img}`} src={'api/' + event.img_path} />
            <div className={`${sty.main_container} grid grid-cols-3 p-6`}>
                <div className='col-span-3 sm:col-span-2 text-center sm:text-left'>
                    <p className='tracking-wide text-5xl sm:text-6xl bold italic text-white'>{event.name}</p>
                    <p className={`tracking-wide text-3xl bold italic mt-3 ${sty.country}`}>{event.country}</p>
                    <p className={`tracking-wide text-md bold italic ${sty.city}`}>{event.city} - {event.place}</p>
                </div>

                <div className='col-span-3 sm:col-span-1 text-center sm:text-right'>
                    <p className={`${sty.country} text-4xl`}>{
                        new Date(event.date).toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' }).replace(/,/g, '')
                    }</p>
                    <p className={`${sty.country} text-2xl`}>{event.time.split(":").slice(0, 2).join(":")}</p>
                </div>

                <div className='flex justify-end flex-col items-center sm:items-start col-span-3'>
                    <div>
                        <Link href={route('event', event.id)}>
                            <button 
                                className={`${sty.btn} `}
                                style={{
                                    background: `linear-gradient( 320deg, ${buttonColor}, transparent 60%)`,
                                    border: `1px solid ${buttonColor}`
                                }}
                            >€ {event.price}</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
