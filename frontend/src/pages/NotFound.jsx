const NotFound = () => {
    return (
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title is-1">404</p>
                    <p className="subtitle">
                        {`Oops! The page you're looking for doesn't exist.`}
                    </p>
                    <a className="button is-primary" href="/">
                        <strong>Back to Home</strong>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
