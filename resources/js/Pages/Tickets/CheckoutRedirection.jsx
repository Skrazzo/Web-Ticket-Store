import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Manage({ auth, redirect_link }) {
    setTimeout(() => {
        window.location.replace(redirect_link);
    }, 5000);
    
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Order has been placed!</h2>}
        >
            <Head title="Redirect" />
            <div className="py-12">
                <div className={`max-w-6xl mx-auto bg-gray-800 text-2xl text-white p-6 rounded-lg`}>
                    <p>💸 You are going to be redirected to <b>Stripe</b> checkout in 5 seconds...</p>
                </div>
            </div>
        </Authenticated>
    )
}
