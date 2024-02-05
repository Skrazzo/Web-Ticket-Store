import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { IconCross, IconTicketOff } from "@tabler/icons-react";


export default function Invalid() {
    return (
        <Guest>
            <Head title="Invalid"/>
            
            <div className="text-red-400 text-3xl flex gap-2 items-center">
                <IconTicketOff size={45} />
                <p >Ticket invalid</p>
            </div>
        </Guest>
    )
}
