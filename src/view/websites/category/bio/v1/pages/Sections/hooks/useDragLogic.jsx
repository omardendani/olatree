// hooks/useDragLogic.js
import { useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { Draggable } from "gsap/Draggable";
import { GRID_CONFIG, BENTO_ITEMS } from '../config/bentoConfig';

// Registrer le plugin Draggable
gsap.registerPlugin(Draggable);

export const useDragLogic = ( width, gridCalc, collisionSystem, updateContainerHeight ) => {
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
    
    // Animation batch optimisée
        const animateElements = useCallback((updates) => {
            const timeline = gsap.timeline();
            
            updates.forEach(({ element, props }) => {
                timeline.to(element, {
                    duration: GRID_CONFIG.ANIMATION_DURATION,
                    ease: "power2.out",
                    ...props
                }, 0);
            });
            
            return timeline;
        }, []);

    // Gestion des positions preview optimisée
        const applyPreviewPositions = useCallback((previewPositions) => {
            // Nettoyer les anciens previews
            const animations = [];
            
            dragState.current.previewElements.forEach(elementId => {
                const targetElement = document.querySelector(`#item_${elementId}`);
                if (targetElement) {
                    const originalPos = dragState.current.currentPositions[elementId];
                    const pixelPos = gridCalc.gridToPixel(originalPos.x, originalPos.y);
                    
                    animations.push({
                        element: targetElement,
                        props: {
                            x: pixelPos.x,
                            y: pixelPos.y,
                            opacity: 1,
                            scale: 1
                        }
                    });
                }
            });
            
            dragState.current.previewElements.clear();
            
            // Appliquer les nouvelles positions preview
            Object.keys(previewPositions).forEach(elementId => {
                const targetElement = document.querySelector(`#item_${elementId}`);
                if (targetElement) {
                    const pixelPos = gridCalc.gridToPixel(previewPositions[elementId].x, previewPositions[elementId].y);
                    
                    animations.push({
                        element: targetElement,
                        props: {
                            x: pixelPos.x,
                            y: pixelPos.y,
                            opacity: GRID_CONFIG.PREVIEW_OPACITY,
                            scale: GRID_CONFIG.PREVIEW_SCALE
                        }
                    });
                    
                    dragState.current.previewElements.add(parseInt(elementId));
                }
            });
            
            // Batch toutes les animations
            if (animations.length > 0) {
                animateElements(animations);
            }
            
            dragState.current.previewPositions = previewPositions;
        }, [gridCalc, animateElements]);

        const clearPreviewPositions = useCallback(() => {
            const animations = [];
            
            dragState.current.previewElements.forEach(elementId => {
                const targetElement = document.querySelector(`#item_${elementId}`);
                if (targetElement) {
                    const originalPos = dragState.current.currentPositions[elementId];
                    const pixelPos = gridCalc.gridToPixel(originalPos.x, originalPos.y);
                    
                    animations.push({
                        element: targetElement,
                        props: {
                            x: pixelPos.x,
                            y: pixelPos.y,
                            opacity: 1,
                            scale: 1
                        }
                    });
                }
            });
            
            if (animations.length > 0) {
                animateElements(animations);
            }
            
            dragState.current.previewElements.clear();
            dragState.current.previewPositions = {};
        }, [gridCalc, animateElements]);

        const calculateDragDirection = useCallback((originalPos, newPos) => {
            const deltaX = newPos.x - originalPos.x;
            const deltaY = newPos.y - originalPos.y;
            
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                return deltaX > 0 ? 'right' : 'left';
            } else {
                return deltaY > 0 ? 'down' : 'up';
            }
        }, []);

        const finalizePositions = useCallback((draggedIndex, finalGridPos) => {
            const movingElement = {
                id: draggedIndex,
                x: finalGridPos.x,
                y: finalGridPos.y,
                width: BENTO_ITEMS[draggedIndex].style.desktop.w,
                height: BENTO_ITEMS[draggedIndex].style.desktop.h
            };

            const dragDirection = calculateDragDirection(
                dragState.current.currentPositions[draggedIndex], 
                finalGridPos
            );

            const previewPositions = collisionSystem.calculatePreviewPositions(
                movingElement, 
                dragDirection, 
                dragState.current.currentPositions
            );
            
            const animations = [];
            
            // Appliquer définitivement toutes les positions
            Object.keys(previewPositions).forEach(elementId => {
                const id = parseInt(elementId);
                dragState.current.currentPositions[id] = {
                    ...dragState.current.currentPositions[id],
                    ...previewPositions[elementId]
                };
                
                const targetElement = document.querySelector(`#item_${elementId}`);
                if (targetElement) {
                    const pixelPos = gridCalc.gridToPixel(previewPositions[elementId].x, previewPositions[elementId].y);
                    
                    animations.push({
                        element: targetElement,
                        props: {
                            x: pixelPos.x,
                            y: pixelPos.y,
                            opacity: 1,
                            scale: 1
                        }
                    });
                }
            });
            
            // Mettre à jour la position de l'élément dragué
            dragState.current.currentPositions[draggedIndex] = {
                ...dragState.current.currentPositions[draggedIndex],
                ...finalGridPos
            };
            
            if (animations.length > 0) {
                animateElements(animations);
            }
        }, [gridCalc, collisionSystem, calculateDragDirection, animateElements]);

    // Initialiser GSAP Draggable avec cleanup amélioré
        useEffect(() => {
            if (width === 0) return;

            const timeoutId = setTimeout(() => {
                const draggableInstances = [];
                
                for (let i = 0; i < BENTO_ITEMS.length; i++) {
                    const id = '#item_' + i;
                    const element = document.querySelector(id);
                    
                    if (element) {
                        try {
                            const draggableInstance = Draggable.create(element, {
                                bounds: "#bento_container",
                                inertia: false,
                                type: "x,y",
                                edgeResistance: 0.65,
                                onDragStart: function() {
                                    dragState.current.isDragging = true;
                                    dragState.current.draggedItemId = i;
                                    gsap.set(this.target, { zIndex: 1000 });
                                },
                                onClick: function () {
                                    console.log("clicked item", i);
                                },
                                onDrag: function() {
                                    const gridPos = gridCalc.pixelToGrid(this.x, this.y);
                                    const originalPos = dragState.current.currentPositions[i];
                                    
                                    const boundedGridPos = {
                                        x: Math.min(gridPos.x, GRID_CONFIG.MAX_COLUMNS - BENTO_ITEMS[i].style.desktop.w),
                                        y: Math.max(0, gridPos.y)
                                    };
                                    
                                    const movingElement = {
                                        id: i,
                                        x: boundedGridPos.x,
                                        y: boundedGridPos.y,
                                        width: BENTO_ITEMS[i].style.desktop.w,
                                        height: BENTO_ITEMS[i].style.desktop.h
                                    };
                                    
                                    const dragDirection = calculateDragDirection(originalPos, boundedGridPos);
                                    const previewPositions = collisionSystem.calculatePreviewPositions(
                                        movingElement, 
                                        dragDirection, 
                                        dragState.current.currentPositions
                                    );
                                    
                                    applyPreviewPositions(previewPositions);
                                },
                                onDragEnd: function () {
                                    dragState.current.isDragging = false;
                                    dragState.current.draggedItemId = null;
                                    gsap.set(this.target, { zIndex: 'auto' });
                                    
                                    const gridPos = gridCalc.pixelToGrid(this.x, this.y);
                                    const finalGridX = Math.min(gridPos.x, GRID_CONFIG.MAX_COLUMNS - BENTO_ITEMS[i].style.desktop.w);
                                    const finalGridY = Math.max(0, gridPos.y);
                                    const finalGridPos = { x: finalGridX, y: finalGridY };
                                    
                                    finalizePositions(i, finalGridPos);
                                    
                                    const snapPos = gridCalc.gridToPixel(finalGridX, finalGridY);
                                    gsap.to(this.target, {
                                        duration: GRID_CONFIG.ANIMATION_DURATION,
                                        x: snapPos.x,
                                        y: snapPos.y,
                                        ease: "power2.out"
                                    });
                                    
                                    this.x = snapPos.x;
                                    this.y = snapPos.y;
                                    
                                    clearPreviewPositions();
                                    
                                    setTimeout(() => {
                                        updateContainerHeight();
                                    }, 350);
                                }
                            });
                            
                            if (draggableInstance && draggableInstance.length > 0) {
                                draggableInstances.push(draggableInstance[0]);
                            }
                        } catch (error) {
                            console.error('Erreur lors de la création du Draggable:', error);
                        }
                    }
                }

                return () => {
                    draggableInstances.forEach(instance => {
                        instance?.kill?.();
                    });
                    dragState.current.previewElements.clear();
                    gsap.killTweensOf("*");
                };
            }, 100);

            return () => {
                clearTimeout(timeoutId);
            };
        }, [width, gridCalc, collisionSystem, applyPreviewPositions, clearPreviewPositions, finalizePositions, calculateDragDirection, updateContainerHeight]);

        // Méthodes publiques exposées par le hook
        const getDragState = useCallback(() => dragState.current, []);
        
        const getCurrentPositions = useCallback(() => dragState.current.currentPositions, []);
        
        const isDragging = useCallback(() => dragState.current.isDragging, []);
        
        const getDraggedItemId = useCallback(() => dragState.current.draggedItemId, []);

    // Méthode pour mettre à jour manuellement les positions (utile pour d'autres interactions)
        const updateItemPosition = useCallback((itemIndex, newPosition) => {
            if (itemIndex >= 0 && itemIndex < dragState.current.currentPositions.length) {
                dragState.current.currentPositions[itemIndex] = {
                    ...dragState.current.currentPositions[itemIndex],
                    ...newPosition
                };
            }
        }, []);

    // Méthode pour réinitialiser toutes les positions aux positions par défaut
        const resetPositions = useCallback(() => {
            dragState.current.currentPositions = BENTO_ITEMS.map((item, index) => ({
                id: index,
                x: item.position.desktop.x,
                y: item.position.desktop.y,
                width: item.style.desktop.w,
                height: item.style.desktop.h
            }));
            
            // Animer tous les éléments vers leurs positions par défaut
            const animations = [];
            
            BENTO_ITEMS.forEach((item, index) => {
                const element = document.querySelector(`#item_${index}`);
                if (element) {
                    const { x, y } = item.position.desktop;
                    const pixelPos = gridCalc.gridToPixel(x, y);
                    
                    animations.push({
                        element: element,
                        props: {
                            x: pixelPos.x,
                            y: pixelPos.y,
                            opacity: 1,
                            scale: 1
                        }
                    });
                }
            });
            
            if (animations.length > 0) {
                animateElements(animations);
            }
            
            // Mettre à jour la hauteur du conteneur après la réinitialisation
            setTimeout(() => {
                updateContainerHeight();
            }, GRID_CONFIG.ANIMATION_DURATION * 1000 + 50);
        }, [gridCalc, animateElements, updateContainerHeight]);


    return {
        // État
        getDragState,
        getCurrentPositions,
        isDragging,
        getDraggedItemId,
        
        // Actions
        updateItemPosition,
        resetPositions,
        
        // Méthodes internes exposées si nécessaire pour les tests ou debugging
        applyPreviewPositions,
        clearPreviewPositions,
        finalizePositions,
        calculateDragDirection
    };    
}