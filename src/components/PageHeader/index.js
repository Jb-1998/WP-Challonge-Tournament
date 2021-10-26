import React from "react";

import { PageHeader } from "antd";

const Header = () => {
    return (
        <PageHeader
            className="site-page-header"
            title={"Battle of the Fans"}
            subTitle={"Create Your Tournament"}
            style={{
                backgroundColor: "#fff",
                position: "fixed",
                width: "100vw",
                zIndex: 1,
                paddingLeft: "20vw",
                paddingRight: "20vw"
            }}
            avatar={{ src: "https://cdn.dribbble.com/users/1716401/screenshots/13898168/battleofthefans.png", size: { xs: 24, sm: 32, md: 40, lg: 50, xl: 60, xxl: 60 } }}
        />
    );
};

export default Header;
