import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from "gsap/Draggable";

// Config :
    import { BENTO_ITEMS, GENERAL_CONFIG } from './config/bentoConfig';

// Hooks :
    import { useDivWidth } from './hooks/useDivWidth';
    import { useCollisionSystem } from './hooks/useCollisionSystem';
    import { useGridCalculations } from './hooks/useGridCalculations';
    import { useDragLogic } from './hooks/useDragLogic';
    
// Components :
    import DraggableItem from './components/DraggableItem';

// Registrer le plugin Draggable
    gsap.registerPlugin(Draggable);

export function Edit_Mode_Bento() {

    const { divRef, width } = useDivWidth();
    const [containerHeight, setContainerHeight] = useState(0);
    
    const prevWidthRef = useRef(width);
                
    const bento_gap = GENERAL_CONFIG.BENTO_GRID_GAP;
    const gridCalc = useGridCalculations(width, bento_gap);
    const collisionSystem = useCollisionSystem(gridCalc);

    // État consolidé dans une seule ref
        const dragState = useRef({
            isDragging: false,
            draggedItemId: null,
            previewElements: new Set(),
            previewPositions: {},
            currentPositions: BENTO_ITEMS.map((item, index) => ({
                id: index,
                x: item.position.desktop.x,
                y: item.position.desktop.y,
                width: item.style.desktop.w,
                height: item.style.desktop.h
            }))
        });
        //console.log(dragState);

    // Fonction optimisée pour calculer la hauteur du conteneur
        const calculateContainerHeight = useCallback((positions) => {
            let maxBottomPosition = 0;
            
            positions.forEach(pos => {
                const bottomPosition = pos.y + pos.height;
                if (bottomPosition > maxBottomPosition) {
                    maxBottomPosition = bottomPosition;
                }
            });
            
            const { bento_fr, bento_gap, btm_margin } = gridCalc;
            let height = bento_fr * maxBottomPosition;
            if (maxBottomPosition > 1) {
                height = bento_fr * maxBottomPosition + (bento_gap * (maxBottomPosition - 1));
            }
            
            return height + btm_margin;
        }, [gridCalc]);

        const updateContainerHeight = useCallback(() => {
            if (dragLogic.getCurrentPositions) {
                const currentPositions = dragLogic.getCurrentPositions();
                const newHeight = calculateContainerHeight(currentPositions);
                setContainerHeight(newHeight);
            }
        }, [calculateContainerHeight]);

        const dragLogic = useDragLogic(width, gridCalc, collisionSystem, updateContainerHeight);

    // Items mémorisés avec les bonnes dépendances
        const items = useMemo(() => {
            if (width === 0) return [];

            return BENTO_ITEMS.map((item, index) => {
                const { h, w } = item.style.desktop;
                const { x, y } = item.position.desktop;
    
                const { height, width: itemWidth } = gridCalc.calculateItemDimensions(h, w);
                const { x: x_position, y: y_position } = gridCalc.calculateItemPosition(x, y);
                const transform = `translate(${x_position}px, ${y_position}px)`;
                
                return (
                    <DraggableItem
                        key={index}
                        item={item}
                        index={index}
                        transform={transform}
                        height={height}
                        width={itemWidth}
                        isDragging={dragLogic.isDragging ? dragLogic.isDragging() : false}
                        data-draggable-id={index}
                    />
                );
            });
        }, [width, gridCalc, dragState.isDragging]);

    // Mettre à jour la hauteur du conteneur quand les dimensions changent
        useEffect(() => {
            if (width > 0) {
                updateContainerHeight();
            }
        }, [width, updateContainerHeight]);

    // useEffect qui se déclenche à chaque changement de width (après le debounce)
        useEffect(() => {
            // Vérifier si la largeur a vraiment changé
            if (width > 0 && prevWidthRef.current !== width && prevWidthRef.current > 0) {
                
                const currentPositions = dragLogic.getCurrentPositions ? dragLogic.getCurrentPositions() : [];

                 // Réappliquer les transformations à tous les éléments
                currentPositions.forEach((pos, index) => {
                    const element = document.querySelector(`#item_${index}`);
                    if (element) {
                        // Recalculer la position avec les nouvelles dimensions
                        const { x: x_position, y: y_position } = gridCalc.calculateItemPosition(pos.x, pos.y);
                        const { height, width: itemWidth } = gridCalc.calculateItemDimensions(pos.height, pos.width);
                        
                        // Appliquer la nouvelle transformation
                        gsap.set(element, {
                            x: x_position,
                            y: y_position,
                            width: itemWidth,
                            height: height
                        });
                    }
                });
                
                // Mettre à jour la hauteur du conteneur
                updateContainerHeight();
            }
            
            // Mettre à jour la référence de la largeur précédente
            prevWidthRef.current = width;
        }, [width, gridCalc, updateContainerHeight, dragLogic]);

    return (
        <main 
            ref={divRef} 
            className="bento-body" 
            id="bento_container" 
            style={{
                height: containerHeight > 0 ? `${containerHeight}px` : null,
                position: 'relative',
                transition: 'height 0.3s ease-out'
            }} 
        >
            {items}
        </main>
    );
}

export function No_Edit_Mode_Bento() {
    
    // Meme Structure de Edit_Mode_Bento() mais sans functionaliter de modification
    
}