import React, { useState } from 'react';
import SaveAlert from './AlertSave'; 
import DeleteAlert from './AlertDelete';  

const EditChapter = () => {
    const [mangaName, setMangaName] = useState('');
    const [chapter, setChapter] = useState('');
    const [dataField, setDataField] = useState('');
    const [dataToEdit, setDataToEdit] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const handleEdit = () => {
        console.log('Edit clicked', { mangaName, chapter, dataField, dataToEdit });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleDelete = () => {
        console.log('Delete clicked');
        setShowDelete(true);
        setTimeout(() => setShowDelete(false), 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Edit Chapter</h2>

                {showSuccess && <SaveAlert message="Chapter edited successfully!" />}
                {showDelete && <DeleteAlert message="Chapter deleted!" />}

                <input
                    type="text"
                    placeholder="name of the manga"
                    className="w-full mb-4 border-b border-gray-400 focus:outline-none p-1 text-sm placeholder-gray-500"
                    value={mangaName}
                    onChange={(e) => setMangaName(e.target.value)}
                />

                <select
                    className="w-full mb-4 border-b border-gray-400 focus:outline-none p-1 text-sm text-gray-500"
                    value={chapter}
                    onChange={(e) => setChapter(e.target.value)}
                >
                    <option value="">select chapter</option>
                    <option value="1">Chapter 1</option>
                    <option value="2">Chapter 2</option>
                </select>

                <select
                    className="w-full mb-4 border-b border-gray-400 focus:outline-none p-1 text-sm text-gray-500"
                    value={dataField}
                    onChange={(e) => setDataField(e.target.value)}
                >
                    <option value="">select data</option>
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                </select>

                <input
                    type="text"
                    placeholder="data to edit"
                    className="w-full mb-6 border-b border-gray-400 focus:outline-none p-1 text-sm placeholder-gray-500"
                    value={dataToEdit}
                    onChange={(e) => setDataToEdit(e.target.value)}
                />

                <button
                    onClick={handleEdit}
                    className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-semibold py-2 rounded-full mb-4"
                >
                    Edit
                </button>

                <button
                    onClick={handleDelete}
                    className="w-full bg-red-100 hover:bg-red-200 text-red-500 font-semibold py-2 rounded-full"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default EditChapter;