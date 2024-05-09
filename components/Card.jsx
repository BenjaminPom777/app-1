import Link from "next/link"

const Card = ({ todo }) => {    
    return (
        <div>
            <Link href={`todo/${todo.id}`}>{todo.title}</Link>
        </div>
    )
}

export default Card;