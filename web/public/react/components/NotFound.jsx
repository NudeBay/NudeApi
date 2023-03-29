function NotFound(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | 404');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | 404';
    }, []);

    return (
        <div className="error-container">
            <h1>404</h1>
            <p>Page not found</p>
        </div>
    );
}