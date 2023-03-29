function Profile(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Profile');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Profile';
    }, []);

    return (
        <div className="profile-container">
            <h1>Profile page component</h1>
        </div>
    );
}