import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import s from '../../../public/scss/Order.module.scss';
import { v4 } from 'uuid';
import IconButton from '@/Components/IconButton';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

export default function Orders({ auth, orders, paid_count, unpaid_count }) {
    
    return (
        <Authenticated 
            user={auth.user}
        >
            <Head title='Orders'/>

            <div className='mt-12 max-w-6xl mx-auto bg-gray-800 rounded-lg flex flex-col md:grid md:grid-cols-2 gap-2 p-2 md:p-6'>
                <p className='text-gray-400 text-lg md:text-xl col-span-2 py-2'>You have <span className='font-bold text-white'>{unpaid_count}</span> unpaid orders and <span className='font-bold text-white'>{paid_count}</span> paid orders</p>

                {orders.data.map(x => {
                    return (
                        <div key={v4()} className={`${s.container} grid grid-cols-4 rounded border border-gray-700`}>
                            <img className={`${s.image}`} src={`api/${x.event.img_path}`}/>
                            
                            <div className={`${s.overlay_container} grid grid-cols-2 items-center pl-14 sm:pl-20 `}>
                                <a href={(x.status === 1) ? '/tickets/' + x.id : x.session_url} target="_blank" >
                                    <p className='text-xl font-bold text-white cursor-pointer'>{x.ticket_count}x {x.event.name}</p>
                                </a>
                                
                                {(x.status === 0) ? 
                                    <div className='text-right text-blue-700 underline pr-3 sm:pr-6'>
                                        <a target='_blank' href={x.session_url}>
                                            Buy {x.ticket_count} {(x.ticket_count === 1) ? 'ticket' : 'tickets'}
                                        </a>
                                    </div>
                                    :
                                    <p className='text-right pr-3 sm:pr-6 text-gray-400'>Bought for {parseFloat(x.ticket_count * x.event.price).toFixed(2)}</p>
                                }
                            </div>
                        </div>

                    );
                })}
                
                <div className='flex gap-4 col-span-2 text-white items-center justify-center mt-6'>
                    {orders.prev_page_url !== null && <Link href={orders.prev_page_url}><IconButton><IconChevronLeft /></IconButton></Link>}
                    <span>{orders.current_page}</span> 
                    {orders.next_page_url !== null && <Link href={orders.next_page_url}><IconButton><IconChevronRight /></IconButton></Link>}
                </div>

            </div>
        </Authenticated>
    )
}
