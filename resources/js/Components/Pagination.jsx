import { Link } from "@inertiajs/react"
import IconButton from "./IconButton"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"

export default function Pagination({ data, className = '' }, props) {

    return (
        <div {...props} className={`flex gap-4 items-center justify-center ${className}`}>
            {data.prev_page_url !== null && <Link href={data.prev_page_url}><IconButton><IconChevronLeft /></IconButton></Link>}
            <span>{data.current_page}</span> 
            {data.next_page_url !== null && <Link href={data.next_page_url}><IconButton><IconChevronRight /></IconButton></Link>}
        </div>
    )
}
