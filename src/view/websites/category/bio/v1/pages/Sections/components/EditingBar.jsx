// 4. COMPOSANT POUR LA BARRE D'ÉDITION
// components/EditingBar.jsx

const EditingBar = ({ id, hoverRefs, onMouseLeave }) => {
    return (
        <div
            ref={(el) => (hoverRefs.current[id] = el)}
            className='edit-mode-editing-bar-item'
            style={{ display: "none" }}
            onMouseLeave={onMouseLeave}
        >
            <div className='edit-mode-editing-bar-item_size-edit'>
                <button className='edit-mode-btn_size-edit'>2x2</button>
                <button className='edit-mode-btn_size-edit'>2x4</button>
                <button className='edit-mode-btn_size-edit'>4x2</button>
            </div>
        </div>
    );
};

export default EditingBar;