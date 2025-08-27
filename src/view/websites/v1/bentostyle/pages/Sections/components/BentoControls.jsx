// BentoControls.jsx
import './BentoControls.css';

const BentoControls = ({ 
    canUndo, 
    canRedo, 
    hasChanges, 
    onUndo, 
    onRedo, 
    onSave, 
    onReset 
}) => {
    return (
        <div className="bento-controls">
            <div className="bento-controls__group">
                <button 
                    className={`bento-controls__btn ${!canUndo ? 'disabled' : ''}`}
                    onClick={onUndo}
                    disabled={!canUndo}
                    title="Annuler (Ctrl+Z)"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 7v6h6"/>
                        <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
                    </svg>
                    Annuler
                </button>
                
                <button 
                    className={`bento-controls__btn ${!canRedo ? 'disabled' : ''}`}
                    onClick={onRedo}
                    disabled={!canRedo}
                    title="Refaire (Ctrl+Shift+Z)"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 7v6h-6"/>
                        <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13"/>
                    </svg>
                    Refaire
                </button>
            </div>

            <div className="bento-controls__group">
                <button 
                    className={`bento-controls__btn bento-controls__btn--save ${hasChanges ? 'has-changes' : ''}`}
                    onClick={onSave}
                    title="Sauvegarder (Ctrl+S)"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                        <polyline points="17,21 17,13 7,13 7,21"/>
                        <polyline points="7,3 7,8 15,8"/>
                    </svg>
                    Sauvegarder
                    {hasChanges && <span className="changes-dot">●</span>}
                </button>
                
                <button 
                    className="bento-controls__btn bento-controls__btn--reset"
                    onClick={onReset}
                    title="Réinitialiser (Ctrl+R)"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 4v6h6"/>
                        <path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
                    </svg>
                    Reset
                </button>
            </div>

            <div className="bento-controls__shortcuts">
                <span className="shortcut-hint">
                    <kbd>Ctrl</kbd>+<kbd>Z</kbd> Annuler • 
                    <kbd>Ctrl</kbd>+<kbd>S</kbd> Sauver • 
                    <kbd>Ctrl</kbd>+<kbd>R</kbd> Reset
                </span>
            </div>
        </div>
    );
};

export default BentoControls;