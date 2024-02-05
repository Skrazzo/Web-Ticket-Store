import { IconStarFilled } from "@tabler/icons-react";

export default function EventReview({ className = '', name, review, stars, color }, props) {
    return (
        <div
            {...props}
            className={`bg-gray-850 p-4 ${className}`}
            style={{
                borderLeft: `4px solid ${color}`,
                borderRadius: '0 4px 4px 0'
            }}
        >
            <div className="flex items-center gap-2">
                <span>{name}</span>
                <span className="text-yellow-700 flex gap-2 font-bold">{stars} <IconStarFilled /></span>
            </div>

            <div>{review}</div>
        </div>
    )
}
