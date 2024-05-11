'use server'

import { revalidatePath } from 'next/cache'
import { saveTodo, updateTodo } from '@/utils/db'
import { redirect, notFound } from 'next/navigation'

function isInvalidText(text) {
    return !text || text.trim() === ''
}

export async function submitForm(user, prevState, formData) {

    const errorMsg = {}

    const todoData = {
        id: formData.get('id'),
        title: formData.get('title'),
        content: formData.get('content'),

    }


    if (isInvalidText(todoData.title)) {
        errorMsg.titleError = "Title cannot be empty"
    }
    if (isInvalidText(todoData.title)) {
        errorMsg.contentError = "Title cannot be empty"
    }

    if (Object.keys(errorMsg).length > 0) {
        return errorMsg;
    }


    try {
        if (todoData.id) {
            await updateTodo(todoData)
        } else {
            await saveTodo(todoData, user.id)
        }
    } catch (error) {
        errorMsg.generalError = 'Something went wrong';
        return errorMsg;
    }

    revalidatePath('/')
    redirect('/')
}
