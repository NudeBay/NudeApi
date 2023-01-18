function Search() {
    document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Search');
    document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
    document.title='NudeBay | Search';

    return (
        <h1>Search page component</h1>
    );
}