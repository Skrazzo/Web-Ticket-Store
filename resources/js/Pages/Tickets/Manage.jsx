import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Manage({ auth }) {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">you have 2 tickets</h2>}
        >
            <Head title="Manage all tickets" />
            
        </Authenticated>
    )
}
