function Sign(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Search');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Search';
    }, []);

    const [sign, setSign]=React.useState(() => <In />)

    const apiRequest = (url, method, body) => {};

    return (
        <div className="sign-container">
            {sign}
        </div>
    );

    function In() {
        return (
            <form className="form" acceptCharset="UTF-8" autoComplete="on" onSubmit={(e) => e.preventDefault()}>
                <h1>Sign in</h1>
                <label htmlFor="email"> Email<sup>*</sup> </label>
                <input type="email" id="email" placeholder="E-mail" min={5} max={256} autoComplete="email" required />

                <label htmlFor="password"> Password<sup>*</sup> </label>
                <input type="password" id="password" placeholder="Password" min={8} max={128} autoComplete="current-password" required />

                <button type="submit"> Sign in </button>
                <hr />

                <span><a onClick={() => alert('forgot password in progress')}>Forgot password?</a></span>
                <span>Don't have an account? <a onClick={() => setSign(() => <Up />)}>Sign up</a></span>
            </form>
        );
    }

    function Up() {
        return (
            <form className="form" acceptCharset="UTF-8" autoComplete="on" onSubmit={(e) => e.preventDefault()}>
                <h1>Sign up</h1>
                <label htmlFor="nickname"> Nickname<sup>*</sup> </label>
                <input type="text" id="nickname" placeholder="Nickname" min={3} max={32} autoComplete="username" required />

                <label htmlFor="phone"> Phone </label>
                <input type="tel" id="phone" placeholder="Phone" min={5} max={32} autoComplete="tel" />

                <label htmlFor="email"> Email<sup>*</sup> </label>
                <input type="email" id="email" placeholder="E-mail" min={5} max={256} autoComplete="email" required />

                <label htmlFor="password"> Password<sup>*</sup> </label>
                <input type="password" id="password" placeholder="Password" min={8} max={128} autoComplete="new-password" required />

                <button type="submit"> Sign in </button>
                <hr />

                <span>Check out settings and personalize your account.</span>
                <span>Already have an account? <a onClick={() => setSign(() => <In />)}>Sign in</a></span>
            </form>
        );
    }
}