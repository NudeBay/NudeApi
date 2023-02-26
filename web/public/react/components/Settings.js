const Settings = () => {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Settings');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Settings';
    }, []);
    
    return (
        <h1>Settings page component</h1>
    );
}