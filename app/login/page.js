'use client'
import { login } from "@/actions/auth-actions"
import { useFormState } from 'react-dom'

const Login = () => {
    const [formState, formAction] = useFormState(login, {})
    return (
        <form action={formAction}>
            <label htmlFor="email">email</label>
            <input name="email" id="email" type="email" required></input>

            <label htmlFor="password">password</label>
            <input name="password" id="password" type="password" required></input>
            <input type='submit' placeholder='submit' />
        </form>
    )
}

export default Login