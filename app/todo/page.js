'use client'

import { useFormState } from 'react-dom';
import {submitForm} from '@/utils/actions';


const page = () => {
    const [state, action] = useFormState(submitForm, {
        message: "",
    });
    return (
        <div>
            <form action={action}>
                <label htmlFor="title">title</label>
                <input name="title" id="title" type="text" required></input>
                <label htmlFor="content">content</label>
                <input name="content" id="content" type="text" required></input>
                <input type='submit' placeholder='submit' />
                {state.message && <div>you idiot</div>}
            </form>
        </div>
    )
}

export default page