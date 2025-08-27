import { Link } from 'react-router-dom';

import Paragraph from "../../../../../components/assests/paragraph";
import { ICONS, themes } from "../../config/bentoConfig";


export function Widget_Text({ data }) {
    
    const text = 'The default text';
    const caption = 'The default caption text';
    const button = null;

    return (
        <div 
            className={`bento-item-cnt ${css_class}`}
            style={css_var}
        >
            <p style={style.text}>
                <Paragraph content={content}/>
            </p>

            <p style={{
                position: 'absolute',
                bottom: 'var(--padding)',
                css_var,
                fontSize:'12px',
                color: '#666666',

            }}>Caption small text</p>

            <button type="button"
                style={{
                    position: 'absolute',
                    bottom: 'var(--padding)',
                    right: 'var(--padding)',
                    css_var,
                    height: '25px',
                    aspectRatio: 1,
                    backgroundColor: 'rgb(234 234 234)',
                    borderRadius: "25px"

            }}> </button>

        </div>
    );

}