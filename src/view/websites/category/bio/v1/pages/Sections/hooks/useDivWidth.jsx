// 2. HOOKS UTILITAIRES
// hooks/useDivWidth.js
import { useRef, useState, useEffect, useMemo } from 'react';
import { debounce } from '../utils/helpers';
import { GRID_CONFIG } from '../config/bentoConfig';

export function useDivWidth() {
    const divRef = useRef(null);
    const [width, setWidth] = useState(0);

    const updateWidth = useMemo(
        () => debounce(() => {
            if (divRef.current) {
                const newWidth = divRef.current.getBoundingClientRect().width;
                setWidth(newWidth);
            }
        }, GRID_CONFIG.DEBOUNCE_DELAY),
        []
    );

    useEffect(() => {
        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [updateWidth]);

    return { divRef, width };
}