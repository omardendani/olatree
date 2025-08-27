import { useEffect, useRef, useState } from "react";

import Paragraph from "../assests/paragraph";
import CurrentTime from "../assests/timing";

export function Header({ content, editMode }) {
    const {h1, h2} = content;
    const edit_Mode = editMode;

    /* ____ TEXTAREA ____ */
        const [textContentH1, setTextContentH1] = useState(h1 || "");
        const [textContentH2, setTextContentH2] = useState(h2 || "");
        const textareaRefH1 = useRef(null);
        const textareaRefH2 = useRef(null);

        // Fonction pour ajuster la hauteur d'un textarea
        const adjustHeight = (textareaRef) => {
            const textarea = textareaRef.current;
            if (textarea) {
                textarea.style.height = "auto"; // Réinitialiser la hauteur
                textarea.style.height = `${textarea.scrollHeight}px`; // Ajuster à la hauteur du contenu
            }
        };

        // Ajuster la hauteur lors du chargement initial
        useEffect(() => {
            adjustHeight(textareaRefH1);
            adjustHeight(textareaRefH2);
        }, [textContentH1, textContentH2]);

    /* ____ TEXTAREA ____ */

    if(edit_Mode){
        
        return (
            <div className="header-body" style={{ gridArea: 'layout-left' }}>
                <div className="header-txt">
                    {/*<p className="header-h1">*/}
                        <textarea
                            ref={textareaRefH1}
                            value={textContentH1}
                            onChange={(e) => setTextContentH1(e.target.value)}
                            onInput={() => adjustHeight(textareaRefH1)} // Ajuster la hauteur à chaque modification
                            className="textarea-editmode header-h1"
                            placeholder="Your H1 Bio ..."
                            spellCheck={false} // Désactiver la vérification orthographique
                        />
                            
                    {/*</p>*/}
                </div>
                <div className="header-small-txt">
                    {/*<p className="header-h2">*/}
                        <textarea
                            ref={textareaRefH2}
                            value={textContentH2}
                            onChange={(e) => setTextContentH2(e.target.value)}
                            onInput={() => adjustHeight(textareaRefH2)} // Ajuster la hauteur à chaque modification
                            className="textarea-editmode header-h2"
                            placeholder="Your Bio ..."
                            spellCheck={false} // Désactiver la vérification orthographique
                        />
                    {/*</p>*/}
                </div>
            </div>
        );
        
    }else{
        return (
            <div className="header-body" style={{ gridArea: 'layout-left' }}>
                <div className="header-txt">
                    <p className="header-h1">
                        {<Paragraph content={h1}/> || "Hello World"}
                    </p>
                </div>
                <div className="header-small-txt">
                    <p className="header-h2">
                        {<Paragraph content={h2}/> || null}
                    </p>
                </div>
            </div>
        );
    }
    
}

export function HeaderTiming({ state }) {

    const workinkState = state;
    const Hours = <CurrentTime H={true} M={false} />;
    const minutes = <CurrentTime H={false} M={true} />;
    
    return (
        <div className="timing-st1">
            <p className="time-st1">
                <span className="span-time-hours">{Hours}</span>
                <span className="span-time-space">:</span>
                <span className="span-time-minutes">{minutes}</span>
            </p>
            <span className="work-state-st1">{workinkState || 'No data'}</span>
        </div>
    );
}

