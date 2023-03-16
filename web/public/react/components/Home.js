function Home() {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Home');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Home';
    }, []);

    return (
        <div className="home-container">
            <Post content={['https://i.pinimg.com/564x/3c/20/5a/3c205a81d5ed0ddab624d6b58b40d91e.jpg']} tags={['alt','teen']} author={{nick:'Zuzaa Olechowska',picture:'https://i.pinimg.com/736x/65/59/37/6559374e52a921ad76785d2175db21c2.jpg',badges:['Verified']}} date={new Date().toString()} likes="6" views={2137} />

            <Post content={['https://thumbs44.redgifs.com/EmotionalFilthyArabianwildcat-mobile.mp4?expires=1679069400&signature=v2:b6f06a502d69b98379bbbf78a6c89742f0c6f20aa36f82b713551e3c7655f46f&for=83.22.63&hash=7011125643']} tags={['ass','bigass','cum','orgasm']} author={{nick:'Użytkownik',picture:'https://i.pinimg.com/564x/3c/20/5a/3c205a81d5ed0ddab624d6b58b40d91e.jpg',badges:['Ban']}} date={new Date().toString()} likes="1501" views={718342} />

            <Post content={['Slub za minute! Zapraszamy na discorda Mokrypapież.sex KOCHAM PIWO JA CHCE WYPIĆ PIWO PIWO TO PALIWO WYRUCHAĆ KURWEKE WSADZIĆ CHUJA GEMBE']} tags={[]} author={{nick:'Zuzaa Olechowska',picture:'https://i.pinimg.com/564x/97/e9/4a/97e94aad4e9550ffde571016105b34ac.jpg',badges:[]}} date={new Date().toString()} likes={1} views={9} />

            <Post content={['https://thumbs44.redgifs.com/AncientMediumvioletredWaterdragons-medium.jpg?expires=1679069400&signature=v2:3763e12bddfd06ace6fbdd4858bc023d56d51669ae555fee7d0a6e330526b767&for=83.22.63.222&hash=6163438793']} tags={['cosplay','bigass','bigtits','hairpussy','emo']} author={{nick:'Agata Max Bednarek',picture:'https://i.pinimg.com/564x/90/02/26/9002260fc9035fbd78fc4c567c6982c1.jpg',badges:['PussyPass']}} date={new Date().toString()} likes="69" views={11491} />
        </div>
    );
}

function Post({ content, tags, author, date, likes, views }) { // ! include ban to badges
    // Content format: check is content a video or a picture or a text

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

    // const [menuLikeIcon, setMenuLikeIcon] = React.useState(()=>"../../public/svgs/line/heart.svg");
    // const [liked, setLiked] = React.useState(()=>false);

    // const [menuViewIcon, setMenuViewIcon] = React.useState(()=>"../../public/svgs/line/eye.svg");
    // const [viewed, setViewed] = React.useState(()=>false);

    // const [menuSaveIcon, setMenuSaveIcon] = React.useState(()=>"../../public/svgs/line/bookmark.svg");
    // const [saved, setSaved] = React.useState(()=>false);

    // const handleMenuClick = (menuItem) => {};

    return (
        <div className="player">
            <div className="top-bar" onClick={(e) => window.location=`search/@${author.nick}`}>
                <img src={author.picture} alt="" title={author.nick} className="icon" draggable="false" />
                <span className="text" title="see profile">{author.nick}</span>
                <div className="badges">
                    {
                        author.badges.map((badge, index) => <img src={badgesList[badge]} alt={badge} title={badge} className="badge" draggable="false" />)
                    }
                </div>
                <ul className="info">
                    <li className="info-item">
                        <img src="../../public/svgs/line/play.svg" alt="" title="" draggable="false" />
                        {newViews}
                    </li>
                    <li className="info-item">
                        <img src="../../public/svgs/line/calendar.svg" alt="" title="" draggable="false" />
                        {newDate}
                    </li>
                </ul>
            </div>
            <div className="content">
                {
                    content.map((cont, index) => <img src={cont} alt="" title={author.nick} />)
                }
            </div>
            <div className="bot-bar">
                <ul className="menu">
                    <li className="menu-item">
                        <img src="../../public/svgs/line/heart.svg" alt="like" title={"likes "+likes} draggable="false" />
                    </li>
                    <li className="menu-item">
                        <img src="../../public/svgs/line/eye.svg" alt="see more" title="see more" draggable="false" />
                    </li>
                    <li className="menu-item">
                        <img src="../../public/svgs/line/exclamation-circle.svg" alt="report" title="report" draggable="false" />
                    </li>
                    <li className="menu-item">
                        <img src="../../public/svgs/line/bookmark.svg" alt="save" title="save" draggable="false" />
                    </li>
                </ul>
                <ul className="tag-list">
                    {
                        tags.map((tag, index) => <li className="tag" onClick={(e) => window.location=`search/#${tag}`}>{tag}</li>) // TODO: change to push
                    }
                </ul>
            </div>
        </div>
    );
}