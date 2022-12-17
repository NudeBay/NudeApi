const App = () => {
    return (
        <>
            <div className="left-panel">
                <div className="logo">
                    <a href="/"> 
                        <img src={"../../public/images/logo.png"} draggable={false} alt={"logo"}/>
                    </a>
                </div>
                <ul className="menu">
                    <li className="menu-item" id="menu-home" onClick={(e) => history.pushState(null,'','/')}>
                        <img src={"../../public/images/line/home.svg"} draggable={false} alt={"Home"} className="icon"/>
                        <span className="text">Home</span>
                    </li>
                    <li className="menu-item" id="menu-search" onClick={(e) => history.pushState(null,'','/search')}>
                        <img src={"../../public/images/line/search.svg"} draggable={false} alt={"Search"} className="icon"/>
                        <span className="text">Search</span>
                    </li>
                    <li className="menu-item" id="menu-messages" onClick={(e) => history.pushState(null,'','/messages')}>
                        <img src={"../../public/images/line/chat.svg"} draggable={false} alt={"Messages"} className="icon"/>
                        <span className="text">Messages</span>
                    </li>
                    <li className="menu-item" id="menu-notifications" onClick={(e) => history.pushState(null,'','/notifications')}>
                        <img src={"../../public/images/line/collection.svg"} draggable={false} alt={"Notifications"} className="icon"/>
                        <span className="text">Notifications</span>
                    </li>
                    <li className="menu-item" id="menu-create" onClick={(e) => history.pushState(null,'','/create')}>
                        <img src={"../../public/images/line/plus.svg"} draggable={false} alt={"Create"} className="icon"/>
                        <span className="text">Create</span>
                    </li>
                    <li className="menu-item" id="menu-profile" onClick={(e) => history.pushState(null,'','/profile')}>
                        <img src={"../../public/images/line/user.svg"} draggable={false} alt={"Profile"} className="icon"/>
                        <span className="text">Profile</span>
                    </li>
                    <li className="menu-item" id="menu-settings" onClick={(e) => history.pushState(null,'','/settings')}>
                        <img src={"../../public/images/line/adjustments.svg"} draggable={false} alt={"Settings"} className="icon"/>
                        <span className="text">Settings</span>
                    </li>
                </ul>
            </div>
            <div className="right-panel">
                <h1>Dupa</h1>
            </div>
        </>
    );
}