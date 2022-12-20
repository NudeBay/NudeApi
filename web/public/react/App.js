const App = () => {
    const handleMenuClick = (state=null, unused=null, url=null) => {
        const currentUrl = window.location.pathname;
        if((state!==null || unused!==null || url!==null) && (currentUrl!==url)) {
            history.pushState(state, unused, url);
        }
        switch(url) { // TODO: add bold text to active menu item
            case '/':
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                document.querySelector('#menu-home > img').src = "../../public/svgs/solid/home.svg";
                break;
            case '/search':
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                document.querySelector('#menu-search > img').src = "../../public/svgs/solid/search.svg";
                break;
            case '/messages':
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                document.querySelector('#menu-messages > img').src = "../../public/svgs/solid/chat.svg";
                break;
            case '/notifications':
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                document.querySelector('#menu-notifications > img').src = "../../public/svgs/solid/collection.svg";
                break;
            case '/create':
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                document.querySelector('#menu-create > img').src = "../../public/svgs/solid/plus.svg";
                break;
            case '/profile':
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                document.querySelector('#menu-profile > img').src = "../../public/svgs/solid/user.svg";
                break;
            case '/settings':
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                document.querySelector('#menu-settings > img').src = "../../public/svgs/solid/adjustments.svg";
                break;
            default:
                document.querySelectorAll('.menu-item > img').forEach((img) => img.src = "../../public/svgs/line/" + img.alt + ".svg");
                break;
        }
    }

    let 
    homeIcon = "../../public/svgs/line/home.svg",
    searchIcon = "../../public/svgs/line/search.svg",
    messagesIcon = "../../public/svgs/line/chat.svg",
    notificationsIcon = "../../public/svgs/line/collection.svg",
    createIcon = "../../public/svgs/line/plus.svg",
    profileIcon = "../../public/svgs/line/user.svg",
    settingsIcon = "../../public/svgs/line/adjustments.svg";
    let content=null;
    switch(window.location.pathname.split('/')[1]) { //TODO: updating on pushState
        case '':
            homeIcon = "../../public/svgs/solid/home.svg";
            content = <Home />;
            break;
        case 'search':
            searchIcon = "../../public/svgs/solid/search.svg";
            content = <Search />;
            break;
        case 'messages':
            messagesIcon = "../../public/svgs/solid/chat.svg";
            content = <Messages />;
            break;
        case 'notifications':
            notificationsIcon = "../../public/svgs/solid/collection.svg";
            content = <Notifications />;
            break;
        case 'create':
            createIcon = "../../public/svgs/solid/plus.svg";
            content = <Create />;
            break;
        case 'profile':
            profileIcon = "../../public/svgs/solid/user.svg";
            content = <Profile />;
            break;
        case 'settings':
            settingsIcon = "../../public/svgs/solid/adjustments.svg";
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
                    <li className="menu-item" id="menu-home" onClick={(e) => handleMenuClick(null,'','/')}>
                        <img src={homeIcon} draggable={false} alt={"home"} className="icon"/>
                        <span className="text">Home</span>
                    </li>
                    <li className="menu-item" id="menu-search" onClick={(e) => handleMenuClick(null,'','/search')}>
                        <img src={searchIcon} draggable={false} alt={"search"} className="icon"/>
                        <span className="text">Search</span>
                    </li>
                    <li className="menu-item" id="menu-messages" onClick={(e) => handleMenuClick(null,'','/messages')}>
                        <img src={messagesIcon} draggable={false} alt={"chat"} className="icon"/>
                        <span className="text">Messages</span>
                    </li>
                    <li className="menu-item" id="menu-notifications" onClick={(e) => handleMenuClick(null,'','/notifications')}>
                        <img src={notificationsIcon} draggable={false} alt={"collection"} className="icon"/>
                        <span className="text">Notifications</span>
                    </li>
                    <li className="menu-item" id="menu-create" onClick={(e) => handleMenuClick(null,'','/create')}>
                        <img src={createIcon} draggable={false} alt={"plus"} className="icon"/>
                        <span className="text">Create</span>
                    </li>
                    <li className="menu-item" id="menu-profile" onClick={(e) => handleMenuClick(null,'','/profile')}>
                        <img src={profileIcon} draggable={false} alt={"user"} className="icon"/>
                        <span className="text">Profile</span>
                    </li>
                    <li className="menu-item" id="menu-settings" onClick={(e) => handleMenuClick(null,'','/settings')}>
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