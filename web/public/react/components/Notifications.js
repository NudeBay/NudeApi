function Notifications(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Notifications');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Notifications';
    }, []);

    return (
        <div className="notifications-container">
            <h1>Notifications page component</h1>
        </div>
    );
}