'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { signup } from '@/actions/auth-actions'

const SignUp = () => {
    const [formState, formAcion] = useFormState(signup, {})

    return (
        <form action={formAcion}>
            <label htmlFor="email">email</label>
            <input name="email" id="email" type="email" required></input>

            <label htmlFor="password">password</label>
            <input name="password" id="password" type="password" required></input>
            <input type='submit' placeholder='submit' />
        </form>
    )
}

export default SignUp