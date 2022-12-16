export default function LeftPanel() {
    return (
        <div className="left-panel">
            <div className="logo">
                <a href="/">
                    <img src={"../../public/images/logo.png"} draggable={false} alt={"logo"}/>
                </a>
            </div>
            <ul class="menu">
                <li className="menu-item" id="menu-home" /*onClick={window.location='/'}*/>
                    <img src={"../../public/images/line/home.svg"} draggable={false} alt={"Home"} className="icon"/>
                    <span className="text">Home</span>
                </li>
                <li className="menu-item" id="menu-search" /*onClick={window.location='/search'}*/>
                    <img src={"../../public/images/line/search.svg"} draggable={false} alt={"Search"} className="icon"/>
                    <span className="text">Search</span>
                </li>
                <li className="menu-item" id="menu-messages" /*onClick={window.location='/messages'}*/>
                    <img src={"../../public/images/line/chat.svg"} draggable={false} alt={"Messages"} className="icon"/>
                    <span className="text">Messages</span>
                </li>
                <li className="menu-item" id="menu-notifications" /*onClick={window.location='/notifications'}*/>
                    <img src={"../../public/images/line/collection.svg"} draggable={false} alt={"Notifications"} className="icon"/>
                    <span className="text">Notifications</span>
                </li>
                <li className="menu-item" id="menu-create" /*onClick={window.location='/create'}*/>
                    <img src={"../../public/images/line/plus.svg"} draggable={false} alt={"Create"} className="icon"/>
                    <span className="text">Create</span>
                </li>
                <li className="menu-item" id="menu-profile" /*onClick={window.location='/profile'}*/>
                    <img src={"../../public/images/line/user.svg"} draggable={false} alt={"Profile"} className="icon"/>
                    <span className="text">Profile</span>
                </li>
                <li className="menu-item" id="menu-settings" /*onClick={window.location='/settings'}*/>
                    <img src={"../../public/images/line/adjustments.svg"} draggable={false} alt={"Settings"} className="icon"/>
                    <span className="text">Settings</span>
                </li>
            </ul>
        </div>
    );
}