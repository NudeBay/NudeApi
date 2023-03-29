function Sign(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Search');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Search';
    }, []);

    return (
        <div className="sign-container">
            <h1>Sign page component</h1>
        </div>
    );
}