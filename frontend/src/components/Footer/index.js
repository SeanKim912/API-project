import './Footer.css';

function Footer() {
    return (
        <>
            <div className='footerContainer'>
                <div className='footerBody'>
                    <div className='footerTitle'>Create your own Meetupz group.
                        <div className='fakeButton'>Get Started</div>
                    </div>
                    <div className='footerCategories'>
                        <div className='footerOption'>
                            <span>Your Account</span>
                            <ul>
                                <li>Sign up</li>
                                <li>Log in</li>
                                <li>Help</li>
                                <li>Become an Affiliate</li>
                            </ul>
                        </div>
                        <div className='footerOption'>
                            <span>Discover</span>
                            <ul>
                                <li>Groups</li>
                                <li>Calendar</li>
                                <li>Topics</li>
                                <li>Cities</li>
                                <li>Online Events</li>
                                <li>Local Guides</li>
                            </ul>
                        </div>
                        <div className='footerOption'>
                            <span>Meetupz</span>
                            <ul>
                                <li>About</li>
                                <li>Blog</li>
                                <li>Meetupz Pro</li>
                                <li>Careers</li>
                                <li>Apps</li>
                                <li>Podcast</li>
                            </ul>
                        </div>
                    </div>
                    <div className='footerLegal'>
                        <div className='copyright'>2022 Meetup Unofficial Clone</div>
                        <div className='legal'>Terms of Service</div>
                        <div className='legal'>Privacy Policy</div>
                        <div className='legal'>Cookie Policy</div>
                        <div className='legal'>Help</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
