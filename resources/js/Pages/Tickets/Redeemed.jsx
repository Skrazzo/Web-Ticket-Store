import Guest from '@/Layouts/GuestLayout'
import { Head } from '@inertiajs/react'
import { IconCheck } from '@tabler/icons-react'
import React from 'react'

export default function Redeemed() {
    return (
        <Guest>
            
            <Head title="Redeemed"/>
            
            <div className="text-green-400 text-3xl flex gap-2 items-center">
                <IconCheck size={45} />
                <p > Ticket redeemed</p>
            </div>
        </Guest>
    )
}
