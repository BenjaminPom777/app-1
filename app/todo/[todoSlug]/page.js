import Form from '@/components/Form';
import { getTodoById } from '@/utils/db';
import { notFound } from 'next/navigation';

export default async function todoSlug({ params }) {
    const response = await getTodoById(params.todoSlug);
    const todo = response[0];

    if (!todo) {
        notFound()
    }

    // TODO rethink how to protect item from url change?

    return (
        <>
        <Form todo={todo}/>
            {/* <div>{todo.title}</div>
            <div>{todo.content}</div>*/}
        </>
    )
}

