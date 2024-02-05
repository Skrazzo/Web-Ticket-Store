import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { IconError404 } from "@tabler/icons-react";

export default function NotFound() {
    return (
        <Guest>
            <Head title="Not found"/>
            
            <div className="text-gray-300 text-3xl flex gap-2 items-center">
                <IconError404 size={45} />
                <p > Not Found</p>
            </div>
        </Guest>
    )
}
