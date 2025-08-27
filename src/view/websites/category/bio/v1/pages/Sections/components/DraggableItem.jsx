// 3. COMPOSANT POUR UN ITEM DRAGGABLE
// components/DraggableItem.jsx
import { useRef } from 'react';
import { Items } from './bento/Items';
import EditingBar from './EditingBar';

const DraggableItem = ({ 
    item, 
    index, 
    transform, 
    height, 
    width, 
    isDragging 
}) => {
    
    //const hoverRefs = useRef({});
    const id = `item_${index}`;

    /*const handleMouseEnter = (id) => {
        const hoverElement = hoverRefs.current[id];
        if (hoverElement) {
            hoverElement.style.display = "flex";
        }
    };

    const handleMouseLeave = (id) => {
        const hoverElement = hoverRefs.current[id];
        if (hoverElement) {
            hoverElement.style.display = "none";
        }
    };*/

    return (
        <div 
            id={id}
            data-draggable-id={index}
            className='edit-mode-grp-item-content'
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: transform,
                height: height,
                width: width,
                transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
            //onMouseEnter={() => handleMouseEnter(id)}
            //onMouseLeave={() => handleMouseLeave(id)}
        >
            <Items data={item}/>
            {/*<EditingBar 
                id={id}
                hoverRefs={hoverRefs}
                onMouseLeave={() => handleMouseLeave(id)}
            />*/}
        </div>
    );
};

export default DraggableItem;