function Home() {
    document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Home');
    document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
    document.title='NudeBay | Home';

    return (
        <h1>Home page component</h1>
    );
}