'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { submitForm } from '@/actions/actions';

const Form = ({ todo }) => {
    const [state, action] = useFormState(submitForm, {
        titleError: "",
        contentError: "",
        generalError: ""
    });

    const { pending } = useFormStatus()    

    return (
        <form action={action}>
            <label htmlFor="title">title</label>
            <input defaultValue={todo?.title ?? null} name="title" id="title" type="text" ></input>
            {state.titleError && <p>Title cannot be empty</p>}
            <label htmlFor="content">content</label>
            <textarea defaultValue={todo?.content ?? null} name="content" id="content" type="textarea" ></textarea >
            {state.contentError && <p>Content cannot be empty</p>}
            <input defaultValue={todo?.id} name='id' style={{ display: 'none' }} />
            <input disabled={pending} type='submit' placeholder='submit' />
            {state.generalError && <p>somethingWentWrong</p>}
        </form>
    )
}

export default Form