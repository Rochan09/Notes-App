import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createNotes } from '../redux/notes/note_actions';
import NoteEditor from '../components/Notes/NoteEditor/NoteEditor';

export default function CreateNotePage() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.noteReducer);

    const handleSubmit = () => {
        if (!title.trim() || !body.trim()) {
            toast.error('Please fill in both title and body fields');
            return;
        }

        dispatch(createNotes({ title: title.trim(), body: body.trim(), tags }));
        navigate('/notes');
    };

    return (
        <NoteEditor
            title={title}
            body={body}
            onTitleChange={setTitle}
            onBodyChange={setBody}
            tags={tags}
            onTagsChange={setTags}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/notes')}
            isLoading={loading}
            mode="create"
        />
    );
}
