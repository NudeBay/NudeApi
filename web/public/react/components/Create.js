function Create() {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Create');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Create';
    }, []);

    return (
        <div className={"create-container"}>
            <h1>Create page component</h1>
        </div>
    );
}