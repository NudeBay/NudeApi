function Messages(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Messages');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Messages';
    }, []);

    return (
        <div className="error-container">
            <h1>Work in progress</h1>
            <p>Messages is not available yet</p>
        </div>
    );
}