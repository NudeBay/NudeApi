function Home(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Home');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Home';
    }, []);

    return (
        <div className="home-container">
            <Post id={"507f1f77bcf86cd799439011"} content={['https://i.pinimg.com/564x/3c/20/5a/3c205a81d5ed0ddab624d6b58b40d91e.jpg']} contentType={"image"} tags={['alt','teen']} author={{nick:'Zuzaa Olechowska',picture:'https://i.pinimg.com/736x/65/59/37/6559374e52a921ad76785d2175db21c2.jpg',badges:['Verified']}} date={new Date().toString()} likes="6" views={2137} />

            <Post content={['https://thumbs44.redgifs.com/DeepStrongElk-mobile.mp4?expires=1679682600&signature=v2:84c7a8fcf45201c30e857ed5072089fbf4446291d9b3ccb48d43d19f956451db&for=83.22.71.9&hash=6163438793']} contentType={"video"} tags={['ass','bigass','cum','orgasm']} author={{nick:'Użytkownik',picture:'https://i.pinimg.com/564x/3c/20/5a/3c205a81d5ed0ddab624d6b58b40d91e.jpg',badges:['Ban']}} date={new Date().toString()} likes="1501" views={718342} />

            <Post id={"507f191e810c19729de860ea"} content={['Slub za minute! Zapraszamy na discorda Mokrypapież.sex KOCHAM PIWO JA CHCE WYPIĆ PIWO PIWO TO PALIWO WYRUCHAĆ KURWEKE WSADZIĆ CHUJA GEMBE']} contentType={"text"} tags={[]} author={{nick:'Zuzaa Olechowska',picture:'https://i.pinimg.com/564x/97/e9/4a/97e94aad4e9550ffde571016105b34ac.jpg',badges:[]}} date={new Date().toString()} likes={1} views={9} />

            <Post id={"00000020f51bb4362eee2a4d"} content={['https://scontent-fra5-2.xx.fbcdn.net/v/t39.30808-6/336862675_2415986385244541_2886332241124420645_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5cd70e&_nc_ohc=BPT21Qv7Wa4AX_dEGY3&_nc_ht=scontent-fra5-2.xx&oh=00_AfARP5ElyEkWfRo9nbqwXFEDWVAypIVvKJ5t3SEvlg2OTQ&oe=6420E6E5']} contentType={"image"} tags={['cosplay','bigass','bigtits','hairpussy','emo']} author={{nick:'Agata Max Bednarek',picture:'https://i.pinimg.com/564x/90/02/26/9002260fc9035fbd78fc4c567c6982c1.jpg',badges:['PussyPass']}} date={new Date().toString()} likes="69" views={11491} />
        </div>
    );


    // *Child post component
    function Post({ id, content, contentType, tags, author, date, likes, views }) { // ! include ban to badges
        // Content format: check is content a video or a picture or a text
        let newContent;
        switch (contentType) {
            case "text":
                newContent=<span>{content}</span>;
                break;
            case "image":
                newContent=<img src={content} alt={""} title={author.nick} loading="lazy" />;
                break;
            case "video":
                newContent=<video src={content} alt={""} title={author.nick} autoplay controls muted loop/>;
                break;
            default:
                newContent=<span>{content}</span>;
                break;
        }
    
        // Tags format
        const badgesList={
            "Owner": "../../public/svgs/solid/shield-check.svg",
            "Admin": "../../public/svgs/line/shield-check.svg",
            "Mod": "../../public/svgs/line/support.svg",
            "Developer": "../../public/svgs/line/code.svg",
            "Verified": "../../public/svgs/line/badge-check.svg",
            "PussyPass": "../../public/svgs/line/check-circle.svg",
            "Ban": "../../public/svgs/line/ban.svg",
        };
    
        // Date format: mm dd, yyyy at hh:mm
        date=new Date(date);
        const month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        let newDate=month[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear();//+' at '+date.getHours()+':'+date.getMinutes();
    
        // Views format: 1.2k, 1.2m, 1.2b
        let newViews=views;
        if (views>=1000) {
            newViews=views/1000;
            if (views>=1000000) {
                newViews=views/1000000;
                if (views>=1000000000) {
                    newViews=views/1000000000;
                    newViews=newViews.toFixed(1)+'b';
                } else {
                    newViews=newViews.toFixed(1)+'m';
                }
            } else {
                newViews=newViews.toFixed(1)+'k';
            }
        }
    
        // Likes format: 1.2k, 1.2m, 1.2b
        let newLikes=likes;
        if (likes>=1000) {
            newLikes=likes/1000;
            if (likes>=1000000) {
                newLikes=likes/1000000;
                if (likes>=1000000000) {
                    newLikes=likes/1000000000;
                    newLikes=newLikes.toFixed(1)+'b';
                } else {
                    newLikes=newLikes.toFixed(1)+'m';
                }
            } else {
                newLikes=newLikes.toFixed(1)+'k';
            }
        }
    
        const [menuLikeIcon, setMenuLikeIcon] = React.useState(()=>"../../public/svgs/line/heart.svg");
        const [liked, setLiked] = React.useState(()=>false);
    
        const [menuViewIcon, setMenuViewIcon] = React.useState(()=>"../../public/svgs/line/eye.svg");
        const [viewed, setViewed] = React.useState(()=>false);

        const [menuReportIcon, setMenuReportIcon] = React.useState(()=>"../../public/svgs/line/exclamation-circle.svg");
        const [reported, setReported] = React.useState(()=>false);
    
        const [menuSaveIcon, setMenuSaveIcon] = React.useState(()=>"../../public/svgs/line/bookmark.svg");
        const [saved, setSaved] = React.useState(()=>false);
    
        const handleMenuClick = (menuItem) => {
            switch (menuItem) {
                case "like":
                    if (liked) {
                        setMenuLikeIcon(()=>"../../public/svgs/line/heart.svg");
                        setLiked(()=>false);
                        // TODO: remove from likes post (by api)
                    } else {
                        setMenuLikeIcon(()=>"../../public/svgs/solid/heart.svg");
                        setLiked(()=>true);
                        // TODO: add to likes post (by api)
                    }
                    break;
                case "view":
                    if (viewed) {
                        setMenuViewIcon(()=>"../../public/svgs/line/eye.svg");
                        setViewed(()=>false);
                        // TODO: remove from views post (by api)
                    } else {
                        setMenuViewIcon(()=>"../../public/svgs/solid/eye.svg");
                        setViewed(()=>true);
                        // TODO: add to views post (by api)
                    }
                    break;
                case "report":
                    if (reported) {
                        setMenuReportIcon(()=>"../../public/svgs/line/exclamation-circle.svg");
                        setReported(()=>false);
                        // TODO: remove from reported posts (by api)
                    } else {
                        setMenuReportIcon(()=>"../../public/svgs/solid/exclamation-circle.svg");
                        setReported(()=>true);
                        // TODO: add to reported posts (by api)
                    }
                    break;
                case "save":
                    if (saved) {
                        setMenuSaveIcon(()=>"../../public/svgs/line/bookmark.svg");
                        setSaved(()=>false);
                        // TODO: remove from saved posts (by api)
                    } else {
                        setMenuSaveIcon(()=>"../../public/svgs/solid/bookmark.svg");
                        setSaved(()=>true);
                        // TODO: add to saved posts (by api)
                    }
                    break;
                default:
                    break;
            }
        };
    
        return (
            <div className="player">
                <div className="top-bar" onClick={(e) => props.onChange(`/search/@${author.nick}`)}>
                    <img src={author.picture} alt="" title={author.nick} className="icon" draggable="false" />
                    <span className="text" title="see profile">{author.nick}</span>
                    <div className="badges">
                        {
                            author.badges.map((badge, index) => <img src={badgesList[badge]} alt={badge} title={badge} className="badge" draggable="false" />)
                        }
                    </div>
                    <ul className="info">
                        <li className="info-item" title={views}>
                            <img src="../../public/svgs/line/play.svg" alt="" draggable="false" />
                            {newViews}
                        </li>
                        <li className="info-item" title={date}>
                            <img src="../../public/svgs/line/calendar.svg" alt="" draggable="false" />
                            {newDate}
                        </li>
                    </ul>
                </div>
                <div className="content">
                    {newContent}
                </div>
                <div className="bot-bar">
                    <ul className="menu">
                        <li className="menu-item">
                            <img src={menuLikeIcon} alt="like" title="likes" draggable="false" onClick={()=>handleMenuClick('like')} />
                        </li>
                        <li className="menu-item">
                            <img src={menuViewIcon} alt="see more" title="see more" draggable="false" onClick={()=>handleMenuClick('view')} />
                        </li>
                        <li className="menu-item">
                            <img src={menuReportIcon} alt="report" title="report" draggable="false" onClick={()=>handleMenuClick('report')} />
                        </li>
                        <li className="menu-item">
                            <img src={menuSaveIcon} alt="save" title="save" draggable="false" onClick={()=>handleMenuClick('save')} />
                        </li>
                    </ul>
                    <ul className="tag-list">
                        {
                            tags.map((tag, index) => <li className="tag" onClick={(e) => props.onChange(`/search/#${tag}`)}>{tag}</li>)
                        }
                    </ul>
                </div>
            </div>
        );
    }
}