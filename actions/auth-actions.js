'use server'

import bcrypt from 'bcrypt'
import { saveUser } from '@/utils/db'
import { redirect } from 'next/navigation';
import { createAuthSession } from '@/utils/auth';

export const signup = async (prevState, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    // TODO add validation

    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds)
        console.log(hash)

        const data = await saveUser(email, hash)
        if (data && data.insertId) {
            createAuthSession(data.insertId)
        }
        // const isOk = await bcrypt.compare('asdasd', hash)


    } catch (error) {
        console.log(error)
    }

    redirect('/')
}