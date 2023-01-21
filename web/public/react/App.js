'use strict';

function App () {
    // Content
    const [content, setContent] = React.useState(() => <Home />);
    
    // Menu
    const [menuHomeIcon, setMenuHomeIcon] = React.useState(() => "../../public/svgs/line/home.svg");
    const [menuHomeStyle, setMenuHomeStyle] = React.useState(() => ({fontWeight: "normal"}));
    
    const [menuSearchIcon, setMenuSearchIcon] = React.useState(() => "../../public/svgs/line/search.svg");
    const [menuSearchStyle, setMenuSearchStyle] = React.useState(() => ({fontWeight: "normal"}));
    
    const [menuMessagesIcon, setMenuMessagesIcon] = React.useState(() => "../../public/svgs/line/chat.svg");
    const [menuMessagesStyle, setMenuMessagesStyle] = React.useState(() => ({fontWeight: "normal"}));
    
    const [menuNotificationsIcon, setMenuNotificationsIcon] = React.useState(() => "../../public/svgs/line/collection.svg");
    const [menuNotificationsStyle, setMenuNotificationsStyle] = React.useState(() => ({fontWeight: "normal"}));
    
    const [menuCreateIcon, setMenuCreateIcon] = React.useState(() => "../../public/svgs/line/plus.svg");
    const [menuCreateStyle, setMenuCreateStyle] = React.useState(() => ({fontWeight: "normal"}));
    
    const [menuProfileIcon, setMenuProfileIcon] = React.useState(() => "../../public/svgs/line/user.svg");
    const [menuProfileStyle, setMenuProfileStyle] = React.useState(() => ({fontWeight: "normal"}));
    
    const [menuSettingsIcon, setMenuSettingsIcon] = React.useState(() => "../../public/svgs/line/adjustments.svg");
    const [menuSettingsStyle, setMenuSettingsStyle] = React.useState(() => ({fontWeight: "normal"}));

    const activeMenuStyle = {
        fontWeight: "bold",
        backgroundColor: "var(--hover-background-color)"
    };
    const activeLastChildMenuStyle = {
        fontWeight: "bold",
        backgroundColor: "var(--hover-second-color)",
    };

    // Reset Menu
    const resetMenu = () => {
        setMenuHomeIcon(() => "../../public/svgs/line/home.svg");
        setMenuHomeStyle(() => ({}));
        
        setMenuSearchIcon(() => "../../public/svgs/line/search.svg");
        setMenuSearchStyle(() => ({}));
        
        setMenuMessagesIcon(() => "../../public/svgs/line/chat.svg");
        setMenuMessagesStyle(() => ({}));
        
        setMenuNotificationsIcon(() => "../../public/svgs/line/collection.svg");
        setMenuNotificationsStyle(() => ({}));
        
        setMenuCreateIcon(() => "../../public/svgs/line/plus.svg");
        setMenuCreateStyle(() => ({}));
        
        setMenuProfileIcon(() => "../../public/svgs/line/user.svg");
        setMenuProfileStyle(() => ({}));
        
        setMenuSettingsIcon(() => "../../public/svgs/line/adjustments.svg");
        setMenuSettingsStyle(() => ({}));
    }

    // Handle Menu Click
    const handleMenuClick = (state=null, unused=null, url=null) => {
        const currentUrl = window.location.pathname;
        if((state!==null || unused!==null || url!==null) && (currentUrl!==url)) {
            history.pushState(state, unused, url);
        }
        switch(url) {
            case '/':
                resetMenu();
                setMenuHomeIcon(() => "../../public/svgs/solid/home.svg");
                setMenuHomeStyle(() => activeMenuStyle);
                setContent(() => <Home />);
                break;
            case '/search':
                resetMenu();
                setMenuSearchIcon(() => "../../public/svgs/solid/search.svg");
                setMenuSearchStyle(() => activeMenuStyle);
                setContent(() => <Search />);
                break;
            case '/messages':
                resetMenu();
                setMenuMessagesIcon(() => "../../public/svgs/solid/chat.svg");
                setMenuMessagesStyle(() => activeMenuStyle);
                setContent(() => <Messages />);
                break;
            case '/notifications':
                resetMenu();
                setMenuNotificationsIcon(() => "../../public/svgs/solid/collection.svg");
                setMenuNotificationsStyle(() => activeMenuStyle);
                setContent(() => <Notifications />);
                break;
            case '/create':
                resetMenu();
                setMenuCreateIcon(() => "../../public/svgs/solid/plus.svg");
                setMenuCreateStyle(() => activeMenuStyle);
                setContent(() => <Create />);
                break;
            case '/profile':
                resetMenu();
                setMenuProfileIcon(() => "../../public/svgs/solid/user.svg");
                setMenuProfileStyle(() => activeMenuStyle);
                setContent(() => <Profile />);
                break;
            case '/settings':
                resetMenu();
                setMenuSettingsIcon(() => "../../public/svgs/solid/adjustments.svg");
                setMenuSettingsStyle(() => activeLastChildMenuStyle);
                setContent(() => <Settings />);
                break;
            default:
                resetMenu();
                setContent(() => <NotFound />);
                break;
        }
    }
    
    // Handle History Change
    React.useEffect(() => {
        switch(window.location.pathname.split('/')[1]) {
            case '':
                setMenuHomeIcon(() => "../../public/svgs/solid/home.svg");
                setMenuHomeStyle(() => activeMenuStyle);
                setContent(() => <Home />);
                break;
            case 'search':
                setMenuSearchIcon(() => "../../public/svgs/solid/search.svg");
                setMenuSearchStyle(() => activeMenuStyle);
                setContent(() => <Search />);
                break;
            case 'messages':
                setMenuMessagesIcon(() => "../../public/svgs/solid/chat.svg");
                setMenuMessagesStyle(() => activeMenuStyle);
                setContent(() => <Messages />);
                break;
            case 'notifications':
                setMenuNotificationsIcon(() => "../../public/svgs/solid/collection.svg");
                setMenuNotificationsStyle(() => activeMenuStyle);
                setContent(() => <Notifications />);
                break;
            case 'create':
                setMenuCreateIcon(() => "../../public/svgs/solid/plus.svg");
                setMenuCreateStyle(() => activeMenuStyle);
                setContent(() => <Create />);
                break;
            case 'profile':
                setMenuProfileIcon(() => "../../public/svgs/solid/user.svg");
                setMenuProfileStyle(() => activeMenuStyle);
                setContent(() => <Profile />);
                break;
            case 'settings':
                setMenuSettingsIcon(() => "../../public/svgs/solid/adjustments.svg");
                setMenuSettingsStyle(() => activeLastChildMenuStyle);
                setContent(() => <Settings />);
                break;
            default:
                setContent(() => <NotFound />);
                break;
        }
    }, []);
    
    return (
        <>
            <div className="left-panel">
                <div className="logo">
                    <a onClick={() => handleMenuClick(null,'','/')}> 
                        <img src={"../../public/images/logo.png"} draggable={false} alt={"logo"}/>
                    </a>
                </div>
                <ul className="menu">
                    <hr/>
                    <li className="menu-item" style={menuHomeStyle} onClick={() => handleMenuClick(null,'','/')}>
                        <img src={menuHomeIcon} draggable={false} alt={"home"} className="icon"/>
                        <span className="text">Home</span>
                    </li>
                    <hr/>
                    <li className="menu-item" style={menuSearchStyle} onClick={() => handleMenuClick(null,'','/search')}>
                        <img src={menuSearchIcon} draggable={false} alt={"search"} className="icon"/>
                        <span className="text">Search</span>
                    </li>
                    <hr/>
                    <li className="menu-item" style={menuMessagesStyle} onClick={() => handleMenuClick(null,'','/messages')}>
                        <img src={menuMessagesIcon} draggable={false} alt={"messages"} className="icon"/>
                        <span className="text">Messages <sup style={{fontWeight: "normal"}}>0</sup></span>
                    </li>
                    <hr/>
                    <li className="menu-item" style={menuNotificationsStyle} onClick={() => handleMenuClick(null,'','/notifications')}>
                        <img src={menuNotificationsIcon} draggable={false} alt={"notification"} className="icon"/>
                        <span className="text">Notifications <sup style={{fontWeight: "normal"}}>0</sup></span>
                    </li>
                    <hr/>
                    <li className="menu-item" style={menuCreateStyle} onClick={() => handleMenuClick(null,'','/create')}>
                        <img src={menuCreateIcon} draggable={false} alt={"create"} className="icon"/>
                        <span className="text">Create</span>
                    </li>
                    <hr/>
                    <li className="menu-item" style={menuProfileStyle} onClick={() => handleMenuClick(null,'','/profile')}>
                        <img src={menuProfileIcon} draggable={false} alt={"profile"} className="icon"/>
                        <span className="text">Profile</span>
                    </li>
                    <li className="menu-item" style={menuSettingsStyle} onClick={() => handleMenuClick(null,'','/settings')}>
                        <img src={menuSettingsIcon} draggable={false} alt={"settings"} className="icon"/>
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