function Sign(props) {
    React.useEffect(() => {
        document.querySelector('meta[property="og:title"]').setAttribute("content", 'NudeBay | Search');
        document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
        document.title='NudeBay | Search';
    }, []);

    const [sign, setSign]=React.useState(() => <In />);

    const apiRequest = (event ,url, method, body) => {
        event.preventDefault();

        fetch(url, { //https://github.com/github/fetch/issues/310   https://www.odoo.com/forum/help-1/it-throws-typeerror-networkerror-when-attempting-to-fetch-resource-216909
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    };

    return (
        <div className="sign-container">
            {sign}
        </div>
    );

    function In() {
        // Form data
        const [disabled, setDisabled] = React.useState(() => false);
        const [buttonContent, setButtonContent] = React.useState(() => 'Sign In');

        // Inputs
        const [email, setEmail] = React.useState(() => undefined);
        const [password, setPassword] = React.useState(() => undefined);

        return (
            <form className="form" acceptCharset="UTF-8" autoComplete="on" onSubmit={(e) => apiRequest(e, 'localhost:8080/account/', 'GET', {
                email: email.toString(),
                password: password.toString(),
                device: navigator?.userAgentData?.platform || navigator?.platform || 'unknown',
            })}>
                <h1>Sign in</h1>
                <label htmlFor="email"> Email<sup>*</sup> </label>
                <input type="email" id="email" placeholder="E-mail" minLength={5} maxLength={256} autoComplete="email" disabled={disabled} onInput={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password"> Password<sup>*</sup> </label>
                <input type="password" id="password" placeholder="Password" minLength={8} maxLength={128} autoComplete="current-password" disabled={disabled} onInput={(e) => setPassword(e.target.value)} required />

                <button type="submit"> {buttonContent} </button>
                <hr />

                <span><a onClick={() => alert('forgot password in progress')}>Forgot password?</a></span>
                <span>Don't have an account? <a onClick={() => setSign(() => <Up />)}>Sign up</a></span>
            </form>
        );
    }

    function Up() {
        // Form data
        const [disabled, setDisabled] = React.useState(() => false);
        const [buttonContent, setButtonContent] = React.useState(() => 'Sign Up');

        // Inputs
        const [nickname, setNickname] = React.useState(() => undefined);
        const [phone, setPhone] = React.useState(() => undefined);
        const [email, setEmail] = React.useState(() => undefined);
        const [password, setPassword] = React.useState(() => undefined);

        return (
            <form className="form" acceptCharset="UTF-8" autoComplete="on" onSubmit={(e) => apiRequest(e, 'localhost:8080/account/', 'POST', {
                nickname: nickname.toString(),
                phone: phone.toString(),
                email: email.toString(),
                password: password.toString(),
                device: navigator?.userAgentData?.platform || navigator?.platform || 'unknown',
            })}>
                <h1>Sign up</h1>
                <label htmlFor="nickname"> Nickname<sup>*</sup> </label>
                <input type="text" id="nickname" placeholder="Nickname" minLength={3} maxLength={32} autoComplete="username" disabled={disabled} onInput={(e) => setNickname(e.target.value)} required />

                <label htmlFor="phone"> Phone </label>
                <input type="tel" id="phone" placeholder="Phone" minLength={5} maxLength={32} autoComplete="tel" disabled={disabled} onInput={(e) => setPhone(e.target.value)} />

                <label htmlFor="email"> Email<sup>*</sup> </label>
                <input type="email" id="email" placeholder="E-mail" minLength={5} maxLength={256} autoComplete="email" disabled={disabled} onInput={(e) => setEmail(e.target.value)} required />

                <label htmlFor="password"> Password<sup>*</sup> </label>
                <input type="password" id="password" placeholder="Password" minLength={8} maxLength={128} autoComplete="new-password" disabled={disabled} onInput={(e) => setPassword(e.target.value)} required />

                <button type="submit"> {buttonContent} </button>
                <hr />

                <span>Check out settings and personalize your account.</span>
                <span>Already have an account? <a onClick={() => setSign(() => <In />)}>Sign in</a></span>
            </form>
        );
    }
}