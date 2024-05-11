import Form from '@/components/Form';
import { getSession } from '@/utils/auth';
import { getTodoById } from '@/utils/db';
import { notFound, redirect } from 'next/navigation';

export default async function todoSlug({ params }) {
    const response = await getTodoById(params.todoSlug);
    const todo = response[0];

    const userSession = await getSession();    
    const user = userSession?.user;
    
    if(!user){
        redirect('/login')
    }

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

