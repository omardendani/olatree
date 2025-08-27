// TEST --:
import { User } from "../assets/icons/Icons";
import { ButtonIcon } from "../components/bento/bento";
import { Header, HeaderTiming } from "../components/header/Header";
import { Logo } from "../components/logo/logo";
import { Edit_Mode_Bento } from './Sections/Bento';
// -- TEST;

export default function Home({ authData }) {

  /* Is User Authenticated or Just Visitor : */
  let edit_Mode = false;
  /* Is User Authenticated or Just Visitor : */
  if (authData?.isAuthenticated) {
    edit_Mode = true;
  }
  /* Is User Authenticated or Just Visitor : */
  
  return (
    <div className="home-container">
      <header className="head">
        <div className="head-logo">
          <Logo />
        </div>
        <nav className="head-menu">
          <ButtonIcon icon={<User />} />
        </nav>
      </header>

      <div className="layout-container">

        <Header
          editMode={edit_Mode}
          content={{
            h1: "Bonjour et bienvenue!\nChez votre dentiste",
            h2: null
          }}
        />

        <div className="header-body-second" style={{ gridArea: 'layout-right' }}>
          <HeaderTiming state="Close" />
        </div>


        {/* -- Benot Section -- */}
        <Edit_Mode_Bento />

      </div>

      <footer className="footer">Powered By Baserage</footer>
    </div>
  );
}

/*
    appoinement Preferred Time Slot : by morning / afternoon / evening
    Preferred Date : -- / --
*/