function Home() {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Home');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Home';
    }, []);

    return (
        <div className="home-container">
            <div className="player">
                <div className="top-bar" onclick="window.location='/profile'">
                    <img src="https://i.pinimg.com/736x/65/59/37/6559374e52a921ad76785d2175db21c2.jpg" alt="[profil_name]" title="[profil_name]" className="icon" draggable="false" />
                    <span className="text" title="see profile">Zuzaa Olechowska</span>
                    <div className="badges">
                        <img src="../../public/svgs/line/badge-check.svg" alt="[badge_name]" title="[badge_name]" className="badge" draggable="false" />
                        <img src="../../public/svgs/line/badge-check.svg" alt="[badge_name]" title="[badge_name]" className="badge" draggable="false" />
                    </div>
                    <ul className="info">
                        <li className="info-item"><img src="../../public/svgs/line/play.svg" alt="" title draggable="false" />13k</li>
                        <li className="info-item"><img src="../../public/svgs/line/calendar.svg" alt="" title draggable="false" />Dec 4, 2022 at 12:59 AM</li>
                    </ul>
                </div>
                <div className="content">
                    <img src="https://i.pinimg.com/564x/3c/20/5a/3c205a81d5ed0ddab624d6b58b40d91e.jpg" alt="" title />
                </div>
                <div className="bot-bar">
                    <ul className="menu">
                        <li className="menu-item">
                            <img src="../../public/svgs/line/heart.svg" alt="like" title="like" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/eye.svg" alt="see more" title="see more" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/chat.svg" alt="comments" title="comments" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/exclamation-circle.svg" alt="report" title="report" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/bookmark.svg" alt="save" title="save" draggable="false" />
                        </li>
                    </ul>
                    <ul className="tag-list">
                        <li className="tag" onclick="window.location='/'">dupa</li>
                        <li className="tag" onclick="window.location='/'">kupa</li>
                    </ul>
                </div>
            </div>
            <div className="player">
                <div className="top-bar" onclick="window.location='/profile'">
                    <img src="https://i.pinimg.com/564x/97/e9/4a/97e94aad4e9550ffde571016105b34ac.jpg" alt="[profil_name]" title="[profil_name]" className="icon" draggable="false" />
                    <span className="text" title="see profile">Użytkownik</span>
                    <div className="badges">
                        <img src="../../public/svgs/line/ban.svg" alt="ban" title="ban" className="badge" draggable="false" />
                    </div>
                    <ul className="info">
                        <li className="info-item"><img src="../../public/svgs/line/play.svg" alt="" title draggable="false" />1,3m</li>
                        <li className="info-item"><img src="../../public/svgs/line/calendar.svg" alt="" title draggable="false" />Dec 12, 2022 at 10:23 PM</li>
                    </ul>
                </div>
                <div className="content">
                    <video poster="https://thumbs4.redgifs.com/DeficientSleepyAmurminnow-mobile.jpg?expires=1670338800&signature=cd7538cc43e130caab6bae577edd90c77c85a297e5954a0eb8f3bc64107794fe&for=83.22.52.122" preload="metadata" playsInline autoPlay muted loop controls title>
                        <source src="https://thumbs44.redgifs.com/WavyCyanMolly-mobile.mp4?expires=1677530400&signature=v2:9055a750eaf8b60630366470f20d8298a04708986181042390e31d2a132523dc&for=83.22.50.85&hash=6163438793" type="video/mp4" />
                        <source src="https://thumbs44.redgifs.com/WavyCyanMolly-mobile.mp4?expires=1677530400&signature=v2:9055a750eaf8b60630366470f20d8298a04708986181042390e31d2a132523dc&for=83.22.50.85&hash=6163438793" type="video/ogg" />
                        Your browser does not support the videos.
                    </video>
                </div>
                <div className="bot-bar">
                    <ul className="menu">
                        <li className="menu-item">
                            <img src="../../public/svgs/solid/heart.svg" alt="like" title="like" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/eye.svg" alt="see more" title="see more" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public//svgs/line/chat.svg" alt="comments" title="comments" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/exclamation-circle.svg" alt="report" title="report" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/solid/bookmark.svg" alt="save" title="save" draggable="false" />
                        </li>
                    </ul>
                    <ul className="tag-list">
                        <li className="tag" onclick="window.location='/'">fajfus</li>
                        <li className="tag" onclick="window.location='/'">dsdadas</li>
                    </ul>
                </div>
            </div>
            <div className="player">
                <div className="top-bar" onclick="window.location='/profile'">
                    <img src="https://i.pinimg.com/564x/f3/73/b7/f373b74b6bf8cd6d1422d03c01990e28.jpg" alt="[profil_name]" title="[profil_name]" className="icon" draggable="false" />
                    <span className="text" title="see profile">Zuzaa Olechowska</span>
                    <div className="badges">
                        <img src="../../public/svgs/line/badge-check.svg" alt="[badge_name]" title="[badge_name]" className="badge" draggable="false" />
                        <img src="../../public/svgs/solid/badge-check.svg" alt="[badge_name]" title="[badge_name]" className="badge" draggable="false" />
                    </div>
                    <ul className="info">
                        <li className="info-item"><img src="../../public/svgs/line/play.svg" alt="" title draggable="false" />972</li>
                        <li className="info-item"><img src="../../public/svgs/line/calendar.svg" alt="" title draggable="false" />Nov 6, 2022 at 4:49 AM</li>
                    </ul>
                </div>
                <div className="content">
                    <span>
                        Slub za minute!<br /> Zapraszamy na discorda Mokrypapież.sex <br /> KOCHAM PIWO JA CHCE WYPIĆ PIWO PIWO TO PALIWO WYRUCHAĆ KURWEKE WSADZIĆ CHUJA GEMBE
                    </span>
                </div>
                <div className="bot-bar">
                    <ul className="menu">
                        <li className="menu-item">
                            <img src="../../public/svgs/line/heart.svg" alt="like" title="like" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/eye.svg" alt="see more" title="see more" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/chat.svg" alt="comments" title="comments" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/exclamation-circle.svg" alt="report" title="report" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/bookmark.svg" alt="save" title="save" draggable="false" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="player">
                <div className="top-bar" onclick="window.location='/profile'">
                    <img src="https://i.pinimg.com/564x/90/02/26/9002260fc9035fbd78fc4c567c6982c1.jpg" alt="[profil_name]" title="[profil_name]" className="icon" draggable="false" />
                    <span className="text" title="see profile">Agata Max Bednarek</span>
                    <div className="badges">
                        <img src="../../public/svgs/line/check-circle.svg" alt="[badge_name]" title="[badge_name]" className="badge" draggable="false" />
                        <img src="../../public/svgs/solid/check-circle.svg" alt="[badge_name]" title="[badge_name]" className="badge" draggable="false" />
                    </div>
                    <ul className="info">
                        <li className="info-item"><img src="../../public/svgs/line/play.svg" alt="" title draggable="false" />71</li>
                        <li className="info-item"><img src="../../public/svgs/line/calendar.svg" alt="" title draggable="false" />Nov 19, 2021 at 3:36 AM</li>
                    </ul>
                </div>
                <div className="content">
                    <img src="https://i.pinimg.com/564x/31/47/ab/3147ab80acf3b17edd56bba0a2052bf4.jpg" alt="" title />
                </div>
                <div className="bot-bar">
                    <ul className="menu">
                        <li className="menu-item">
                            <img src="../../public/svgs/line/heart.svg" alt="like" title="like" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/eye.svg" alt="see more" title="see more" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/chat.svg" alt="comments" title="comments" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/exclamation-circle.svg" alt="report" title="report" draggable="false" />
                        </li>
                        <li className="menu-item">
                            <img src="../../public/svgs/line/bookmark.svg" alt="save" title="save" draggable="false" />
                        </li>
                    </ul>
                    <ul className="tag-list">
                        <li className="tag" onclick="window.location='/'">dupa</li>
                        <li className="tag" onclick="window.location='/'">kupa</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}