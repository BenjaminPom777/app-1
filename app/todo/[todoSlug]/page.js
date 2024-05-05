import { getTodoById } from '@/utils/db';
import { notFound } from 'next/navigation';

export default async function todoSlug({ params }) {
    const response = await getTodoById(params.todoSlug);
    const todo = response[0];

    console.log('todo: ',todo)
    if (!todo) {
        notFound()
    }

    return (
        <>
            <div>{todo.title}</div>
            <div>{todo.content}</div>           
        </>
    )
}

