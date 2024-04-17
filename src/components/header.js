import { Link, useLocation } from "react-router-dom";

function Header () {
    const headerButtonStyle = "uppercase text-[12px] font-semibold cursor-pointer text-gray-100 " +
        "font-noto tracking-tighter hover:text-white bg-blue-900 hover:bg-yellow-500 px-3 py-[2px]";

    const isHome = useLocation().pathname === "/";

    const scrollFormIntoView = () => {
        if (isHome) {
            let calculationForm = document.getElementById("calculationForm");

            calculationForm && calculationForm.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <header className="fixed top-0 z-50 w-full py-4 shadow-gray-400 shadow bg-gray-200">
            <div className="container flex flex-row justify-between">
                {/* Go to company site */}
                <Link
                    aria-label="Company site"
                    className="hover:border-b-2 border-yellow-500 hover:brightness-100 brightness-125"
                    to="https://www.getoffgrid.co.za/"
                    target="_blank"
                    rel="noopener"
                >
                    <img src="/images/logo.png" alt="Company site" aspect-ratio="16/9" width={57} height={32}/>
                </Link>

                {/* Scroll to calculator */}
                <Link className={headerButtonStyle} to="/" onClick={scrollFormIntoView}>
                    Installation Calculator
                </Link>
            </div>
        </header>
    );
};

export default Header;