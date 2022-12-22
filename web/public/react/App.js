const App = () => {
    const handleMenuClick = (state=null, unused=null, url=null) => {
        const currentUrl = window.location.pathname;
        if((state!==null || unused!==null || url!==null) && (currentUrl!==url)) {
            history.pushState(state, unused, url);
        }
        switch(url) { // TODO: add bold text to active menu item
            case '/':
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                document.querySelector('#menu-home > img').src = "../../public/svgs/solid/" + document.querySelector('#menu-home > img').alt + ".svg";
                document.querySelector('#menu-home > span').style.fontWeight = "bold";
                break;
            case '/search':
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                document.querySelector('#menu-search > img').src = "../../public/svgs/solid/" + document.querySelector('#menu-search > img').alt + ".svg";
                document.querySelector('#menu-search > span').style.fontWeight = "bold";
                break;
            case '/messages':
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                document.querySelector('#menu-messages > img').src = "../../public/svgs/solid/" + document.querySelector('#menu-messages > img').alt + ".svg";
                document.querySelector('#menu-messages > span').style.fontWeight = "bold";
                break;
            case '/notifications':
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                document.querySelector('#menu-notifications > img').src = "../../public/svgs/solid/" + document.querySelector('#menu-notifications > img').alt + ".svg";
                document.querySelector('#menu-notifications > span').style.fontWeight = "bold";
                break;
            case '/create':
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                document.querySelector('#menu-create > img').src = "../../public/svgs/solid/" + document.querySelector('#menu-create > img').alt + ".svg";
                document.querySelector('#menu-create > span').style.fontWeight = "bold";
                break;
            case '/profile':
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                document.querySelector('#menu-profile > img').src = "../../public/svgs/solid/" + document.querySelector('#menu-profile > img').alt + ".svg";
                document.querySelector('#menu-profile > span').style.fontWeight = "bold";
                break;
            case '/settings':
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                document.querySelector('#menu-settings > img').src = "../../public/svgs/solid/" + document.querySelector('#menu-settings > img').alt + ".svg";
                document.querySelector('#menu-settings > span').style.fontWeight = "bold";
                break;
            default:
                document.querySelectorAll('.menu-item').forEach((item) => {
                    item.querySelector('img').src = "../../public/svgs/line/" + item.querySelector('img').alt + ".svg";
                    item.querySelector('span').style.fontWeight = 'normal';
                });
                break;
        }
    }

    let 
    homeIcon = "../../public/svgs/line/home.svg",
    homeStyle = {fontWeight: "normal"},
    searchIcon = "../../public/svgs/line/search.svg",
    searchStyle = {fontWeight: "normal"},
    messagesIcon = "../../public/svgs/line/chat.svg",
    messagesStyle = {fontWeight: "normal"},
    notificationsIcon = "../../public/svgs/line/collection.svg",
    notificationsStyle = {fontWeight: "normal"},
    createIcon = "../../public/svgs/line/plus.svg",
    createStyle = {fontWeight: "normal"},
    profileIcon = "../../public/svgs/line/user.svg",
    profileStyle = {fontWeight: "normal"},
    settingsIcon = "../../public/svgs/line/adjustments.svg",
    settingsStyle = {fontWeight: "normal"};
    let content=null;
    switch(window.location.pathname.split('/')[1]) { //TODO: updating on pushState
        case '':
            homeIcon = "../../public/svgs/solid/home.svg";
            homeStyle.fontWeight = "bold";
            content = <Home />;
            break;
        case 'search':
            searchIcon = "../../public/svgs/solid/search.svg";
            searchStyle.fontWeight = "bold";
            content = <Search />;
            break;
        case 'messages':
            messagesIcon = "../../public/svgs/solid/chat.svg";
            messagesStyle.fontWeight = "bold";
            content = <Messages />;
            break;
        case 'notifications':
            notificationsIcon = "../../public/svgs/solid/collection.svg";
            notificationsStyle.fontWeight = "bold";
            content = <Notifications />;
            break;
        case 'create':
            createIcon = "../../public/svgs/solid/plus.svg";
            createStyle.fontWeight = "bold";
            content = <Create />;
            break;
        case 'profile':
            profileIcon = "../../public/svgs/solid/user.svg";
            profileStyle.fontWeight = "bold";
            content = <Profile />;
            break;
        case 'settings':
            settingsIcon = "../../public/svgs/solid/adjustments.svg";
            settingsStyle.fontWeight = "bold";
            content = <Settings />;
            break;
        default:
            content = <NotFound />;
            break;
    }
    
    return (
        <>
            <div className="left-panel">
                <div className="logo">
                    <a href="/"> 
                        <img src={"../../public/images/logo.png"} draggable={false} alt={"logo"}/>
                    </a>
                </div>
                <ul className="menu">
                    <li className="menu-item" id="menu-home" style={homeStyle} onClick={(e) => handleMenuClick(null,'','/')}>
                        <img src={homeIcon} draggable={false} alt={"home"} className="icon"/>
                        <span className="text">Home</span>
                    </li>
                    <li className="menu-item" id="menu-search" style={searchStyle} onClick={(e) => handleMenuClick(null,'','/search')}>
                        <img src={searchIcon} draggable={false} alt={"search"} className="icon"/>
                        <span className="text">Search</span>
                    </li>
                    <li className="menu-item" id="menu-messages" style={messagesStyle} onClick={(e) => handleMenuClick(null,'','/messages')}>
                        <img src={messagesIcon} draggable={false} alt={"chat"} className="icon"/>
                        <span className="text">Messages</span>
                    </li>
                    <li className="menu-item" id="menu-notifications" style={notificationsStyle} onClick={(e) => handleMenuClick(null,'','/notifications')}>
                        <img src={notificationsIcon} draggable={false} alt={"collection"} className="icon"/>
                        <span className="text">Notifications</span>
                    </li>
                    <li className="menu-item" id="menu-create" style={createStyle} onClick={(e) => handleMenuClick(null,'','/create')}>
                        <img src={createIcon} draggable={false} alt={"plus"} className="icon"/>
                        <span className="text">Create</span>
                    </li>
                    <li className="menu-item" id="menu-profile" style={profileStyle} onClick={(e) => handleMenuClick(null,'','/profile')}>
                        <img src={profileIcon} draggable={false} alt={"user"} className="icon"/>
                        <span className="text">Profile</span>
                    </li>
                    <li className="menu-item" id="menu-settings" style={settingsStyle} onClick={(e) => handleMenuClick(null,'','/settings')}>
                        <img src={settingsIcon} draggable={false} alt={"adjustments"} className="icon"/>
                        <span className="text">Settings</span>
                    </li>
                </ul>
            </div>
            <div className="right-panel">
                {content}
            </div>
        </>
    );
}