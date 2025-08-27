import { useRef, useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import { Edit_Mode_Bento, Viewer_Mode_Bento } from './Sections/Bento';
//import { useDeviceType } from "./Sections/hooks/useDeviceType";
import { usePageData } from "../../../../../../contexts/PageDataContext";
import { useLayoutMargins } from "../utils/useLayoutMargins";
// -- TEST;

export default function Home({ authData}) {
  const edit_Mode = authData?.isAuthenticated ?? false;  // simple assign  

  const containerRef = useRef(null);
  //const [cellWidth, setCellWidth] = useState(null);

  /*let width_fragment = 2;
  if (useDeviceType() === 'MOBILE') { width_fragment = 1; }
  if (useDeviceType() === 'SMALL_TABLET') { width_fragment = 2.5; }
  if (useDeviceType() === 'DESKTOP') { width_fragment = 2; }*/

  /*
  useEffect(() => {
    function updateWidth() {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const style = getComputedStyle(container);
      const containerWidth = container.clientWidth;
      const gap = parseFloat(style.gap || style.columnGap || '0');
      const availableWidth = containerWidth - gap;
      const width = availableWidth / width_fragment;  // 2 colonnes
      setCellWidth(width);
      
    }

    updateWidth();  // calcule au montage
    window.addEventListener('resize', updateWidth);  // recalcul au redimensionnement
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  */
  
  // Page data :
    const data = usePageData();   // Data door ...

    // Page Layout :
      const { varLayoutTopMargin, varLayoutBordMargin } = useLayoutMargins();

    // Page Data :
      const profile_pic = data.pic;
      const style_pic = data.systemDesign.pic.style;
      const bio_b1 = data.bio.b1;
      const bio_b2 = data.bio.b2;

  return (
    <div 
      className="home-container"
      style={{
        '--layout-bord-margin': varLayoutBordMargin,
        '--layout-top-margin': varLayoutTopMargin,
        paddingLeft: 'var(--layout-bord-margin)',
        paddingRight: 'var(--layout-bord-margin)',
        paddingTop: 'var(--layout-top-margin)',
      }}
    >

      <div className="layout-container" ref={containerRef}>

        <Header
          editMode={edit_Mode}
          content={{
            pic: profile_pic,
            picStyle: style_pic,
            b1: bio_b1,
            b2: bio_b2
          }}
          style={{
            //cellWidth,
            '--layout-bord-margin': varLayoutBordMargin,
            '--layout-top-margin': varLayoutTopMargin,
          }}
        />

        {/* -- Benot Section   `${cellWidth}px`  -- */}
        {edit_Mode ? <Edit_Mode_Bento /> : <Viewer_Mode_Bento />}

      </div>

      <footer className="footer">Powered By Olatree</footer>

    </div>
  );
}

/*
    appoinement Preferred Time Slot : by morning / afternoon / evening
    Preferred Date : -- / --
*/