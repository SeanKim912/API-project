import { useSelector } from "react-redux";
import UserHome from "../UserHome";
import './SplashPage.css';

function SplashPage() {
    const user = useSelector(state => state.session.user);

    return (
        <div>
            {user
                ? <UserHome />
                : <div className="splashBody">
                    <div className="splashTop">
                        <div className="splashText">
                                <h1>Celebrating 20 years of real connections on Meetupz</h1>
                                <p className="splashCaption">Whatever you’re looking to do this year, Meetupz can help.
                                    For 20 years, people have turned to Meetupz to meet
                                    people, make friends, find support, grow a business, and
                                    explore their interests. Thousands of events are
                                    happening every day—join the fun.</p>
                        </div>
                        <div className="mainImage">
                            <img src="https://secure.meetupstatic.com/next/images/shared/online_events.svg?w=640"/>
                        </div>
                    </div>
                    <div className="splashFeatures">
                        <div className="feature">
                            <img className="featureImage" src="https://secure.meetupstatic.com/next/images/indexPage/category1.webp?w=1920"/>
                            <div className="featureText" title="Feature in development">Make new friends
                                <img className="arrow" src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"/>
                            </div>
                        </div>
                        <div className="feature">
                            <img className="featureImage" src="https://secure.meetupstatic.com/next/images/indexPage/category2.webp?w=1920"/>
                            <div className="featureText" title="Feature in development">Explore the outdoors
                                <img className="arrow" src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"/>
                            </div>
                        </div>
                        <div className="feature">
                            <img className="featureImage" src="https://secure.meetupstatic.com/next/images/indexPage/category3.webp?w=1920"/>
                            <div className="featureText" title="Feature in development">Connect over tech
                                <img className="arrow" src="https://secure.meetupstatic.com/next/images/shared/right-arrow.svg?w=32"/>
                            </div>
                        </div>
                    </div>
                    <div className="splashSuggestions" title="Feature in development">
                        <div className="suggestion">Boost your career</div>
                        <div className="suggestion">Find your zen</div>
                        <div className="suggestion">Get moving</div>
                        <div className="suggestion">Share language + culture</div>
                        <div className="suggestion">Read with friends</div>
                        <div className="suggestion">Defeat Kim Jong Un</div>
                        <div className="suggestion">Hone your craft</div>
                    </div>
                    <div className="quickGuide">
                        <h2>How Meetupz Works</h2>
                        <p className="titleCaption">Meet new people who share your interests through online and in-person events. It’s free to create an account.</p>
                        <div className="steps">
                            <div className="stepCard">
                                <img className="stepIcon" src="https://secure.meetupstatic.com/next/images/shared/handsUp.svg?w=256"/>
                                <div className="stepText">
                                    <div className="stepTitle" title="Feature in development">Join a group</div>
                                    <div className="stepCaption">Do what you love, meet others who love it, find your community. The rest is history!</div>
                                </div>
                            </div>
                            <div className="stepCard">
                                <img className="stepIcon" src="https://secure.meetupstatic.com/next/images/shared/ticket.svg?w=256"/>
                                <div className="stepText">
                                    <div className="stepTitle" title="Feature in development">Find an event</div>
                                    <div className="stepCaption">Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</div>
                                </div>
                            </div>
                            <div className="stepCard">
                                <img className="stepIcon" src="https://secure.meetupstatic.com/next/images/shared/joinGroup.svg?w=256"/>
                                <div className="stepText">
                                    <div className="stepTitle" title="Feature in development">Start a group</div>
                                    <div className="stepCaption">You don’t have to be an expert to gather people together and explore shared interests.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default SplashPage;
