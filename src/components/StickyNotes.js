import React, { useRef, useState } from 'react'
import './StickyNotes.css'
export default function StickyNotes({ note, deleteNotes, updateNotes }) {
    const [editedValue, setEditedValue] = useState('')
    const [isedit, setIsEdit] = useState(false)
    const textareaRef = useRef(null);
    const stickyNotesRef = useRef(null);
    const [allowMove, setAllowMove] = useState(false)
    const [isPinned, setIsPinned] = useState(true);
    const [dx, setDx] = useState(0)
    const [dy, setDy] = useState(0)

    const handleEditClick = () => {
        setIsEdit(true);
        setEditedValue(note.text)
    }
    const EditText = () => {
        if (textareaRef.current) {
            textareaRef.current.focus()
        }
    }

    const handleSaveClick = () => {
        updateNotes(note.id, editedValue);
        setIsEdit(false)
    }
    const handleMouseDown = (e) => {
        setAllowMove(true)
        console.log(allowMove + "MouseDown");
        const dimensions = stickyNotesRef.current.getBoundingClientRect();
        setDx(e.clientX - dimensions.x)
        setDy(e.clientY - dimensions.y)
    }
    const handleMouseMove = (e) => {
        if (allowMove && isPinned) {
            const x = e.clientX - dx
            const y = e.clientY - dy
            stickyNotesRef.current.style.left = x + "px"
            stickyNotesRef.current.style.top = y + "px"
        }
    }
    const handleMouseUp = () => {
        setAllowMove(false)
        console.log(allowMove + "MouseUp")

    }
    const handleTogglePin = () => {
        setIsPinned((prevIsPinned) => !prevIsPinned);
      };
    return (
        <div ref={stickyNotesRef} className='note-item' onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}>
                <button onClick={handleTogglePin}>{isPinned ? 'Pin' : 'Unpin'}</button>
            <div className='sticky-note-header'>
                <div></div>
                <button className='delete-btn' onClick={() => deleteNotes(note.id)}>X</button>
            </div>
            {
                isedit ? <textarea rows={9} cols={10} value={editedValue} ref={textareaRef} onChange={(e) => setEditedValue(e.target.value)} onDoubleClick={handleSaveClick} ></textarea> :
                    <span className='note' onDoubleClick={handleEditClick}>{note.text}</span>
            }
            <div className='btn-container' >
                {/* <button className='save-btn' onClick={handleSaveClick}>Save</button> */}
                {isedit && <button className='edit-btn' onClick={EditText}>Edit</button>}
            </div>
        </div>


    )
}