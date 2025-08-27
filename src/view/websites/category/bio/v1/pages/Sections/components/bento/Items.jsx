import { Link } from 'react-router-dom';

import Paragraph from "../../../../components/assests/paragraph";
import { ICONS, themes } from "../../config/bentoConfig";


function inTheme_finder(theme_name, parm_search) {
    for (let i = 0; i < themes.length; i++) {
        const name = themes[i].name;
        
        if(name === theme_name){

            if(parm_search === 'container'){
                return { css_class : themes[i].container.className, css_var : themes[i].container.var }
            }

        }
    }
}

export function Items({ data }) {

    const theme = 'Default';
    const item_data = data.content;
    const {h, w} = data.style.desktop;


    const type = item_data.type;
    const style = item_data.style;

    if( type === 'text' ){

        const content = item_data.content;

        const container_class = inTheme_finder(theme, 'container')
        const {css_class, css_var} = container_class;

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
    
    if( type === 'link' ){

        const content = item_data.content;
        const icon = content.icon.content;
        const url = content.url;
        const title = content.title;
        const text = content.text;
        
        const container_class = inTheme_finder(theme, 'container')
        const {css_class, css_var} = container_class;

        const icon_finder = () => {
            for (let i = 0; i < ICONS.length; i++) {
                const element = ICONS[i];
                if( element.name === icon ){
                    return element.variations.s1.url;
                }
            }
        }

        // Shape : 1:1      ( Just Icon )
        if( h == 1 && w == 1){
            return (
                <Link
                    to={url} 
                    target="_blank"
                >
                    <div 
                        className={`bento-item-cnt ${css_class}`}
                        style={css_var}
                    >
                        <span className="bento-item-span-icon">
                            <img src={icon_finder()}/> 
                        </span>
                    </div>
                </Link>
            );
        }
        
        // Shape : 2:2      ( Icon & Texts )
        if( h == 2 && w == 2){
            return (
                <Link
                    to={url} 
                    target="_blank"
                >
                    <div 
                        className={`bento-item-cnt ${css_class}`}
                        style={css_var}
                    >
                        
                        <span className="bento-item-span-icon-in-box">
                            <img src={icon_finder()}/> 
                        </span>
                        <p
                            className="bento-item-title-in-box"
                            style={style.text.title}
                        >
                            {title}
                        </p>
                        <p
                            className="bento-item-text-in-box"
                            style={style.text.text}
                        >
                            {text}
                        </p>
                    </div>
                </Link>
            );
        }
    }

}