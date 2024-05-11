'use server'

import bcrypt from 'bcrypt'
import { getUserByEmail, saveUser } from '@/utils/db'
import { redirect } from 'next/navigation';
import { saveSession } from '@/utils/auth';


export const signup = async (prevState, formData) => {
    const email = formData.get('email');
    const userName = formData.get('userName');
    const password = formData.get('password');

    // TODO add validation

    const saltRounds = 10;
    try {
        const hash = await bcrypt.hash(password, saltRounds)

        const data = await saveUser(email, userName, hash)
        const id = data?.insertId
        if (id) {
            await saveSession(id, email, userName)
        }

        // const isOk = await bcrypt.compare('asdasd', hash)
    } catch (error) {
        console.log('[signup ERROR]: ', error)
    }

    redirect('/')
}


export const login = async (prevState, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    // TODO add validation

    const saltRounds = 10;
    try {
        const userData = await getUserByEmail(email);
        if (userData?.length == 0) {
            //TODO Create error for no such user in database
            return;
        }
        const user = userData[0];        

        if (bcrypt.compareSync(password, user.password)){
            await saveSession(user.id, user.email, user.username)
        }else{
            //TODO wrong password error
        }

        // const data = await saveUser(email, userName, hash)
        // const id = data?.insertId
        // if(id){
        //     await saveSession(id, email, userName)
        // }

        // const isOk = await bcrypt.compare('asdasd', hash)
    } catch (error) {
        console.log('[signup ERROR]: ', error)
    }

    redirect('/')
}