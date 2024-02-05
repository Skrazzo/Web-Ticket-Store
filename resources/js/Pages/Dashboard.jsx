import EventScroll from '@/Components/EventScroll';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { v4 } from 'uuid';

export default function Dashboard({ auth, genres }) {
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">All newest events</h2>}
        >
            <Head title="Dashboard" />

            {genres.map(x => {
                return (
                    <div key={v4()} className="pt-6">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <EventScroll title={x.name} events={x.event}/>
                        </div>
                    </div>
                );
            })}
        </AuthenticatedLayout>
    );
}
