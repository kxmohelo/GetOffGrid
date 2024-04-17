function Footer() {
    return (
        <div className="relative bg-blue-900 px-4 py-5">
            <p className="text-center text-gray-100 text-sm">
                <span className="font-medium text-sm hover:text-yellow-500 cursor-default">
                    <span className="font-semibold text-sm">©</span>&nbsp;
                    All Rights Reserved
                </span> |&nbsp;
                <a
                    href="https://www.getoffgrid.co.za/wp-content/uploads/2024/01/Privacy_Policy_Get_off_Grid_as_at-23_Oct_2023.pdf"
                    target="_blank"
                    rel="noopener"
                    className="text-sm hover:text-yellow-500 font-medium"
                >
                    Privacy Policy
                </a>
                &nbsp;|&nbsp;
                <a
                    href="https://www.getoffgrid.co.za/wp-content/uploads/2024/01/Terms-of-Use-as-at-23-Oct-2023.pdf"
                    target="_blank"
                    rel="noopener"
                    className="text-sm hover:text-yellow-500 font-medium"
                >
                    Terms Of Use
                </a>
                &nbsp;|&nbsp;
                <a
                    href="https://www.getoffgrid.co.za/wp-content/uploads/2024/01/PAIA_Manual_GOG_Appendices.pdf"
                    target="_blank"
                    rel="noopener"
                    className="text-sm hover:text-yellow-500 font-medium"
                >
                    PAIA Manual
                </a>

            </p>
        </div>
    );
};

export default Footer;