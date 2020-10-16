import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createJournalEntry } from './Routes'

const PopupForm = ({ currentLocation, onClose }) => {
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            data.latitude = currentLocation.latitude
            data.longitude = currentLocation.longitude
            const createdEntry = await createJournalEntry(data)
            console.log(createdEntry)
            onClose()
        } catch (err) {
            console.log(err)
            setError(err.message)
            setLoading(false)
        }
    } 

    return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">

        {
            error ? <h3 className="error">{ error }</h3> : null
        }

        <label htmlFor="title">Title</label>
        <input name="title" required ref={register} />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" rows={3} ref={register}></textarea>
        <label htmlFor="comments">Description</label>
        <textarea name="comments" rows={3} ref={register}></textarea>
        <label htmlFor="image">Image</label>
        <input name="image" ref={register} />
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" required ref={register} />
        <button disabled={loading}>{loading ? 'Loading...' : 'Create New Entry'}</button>
    </form>
    )
}

export default PopupForm